// The CiGa Raw API — shared by the Node server (server/index.js) and the Vercel function (api/index.js).
// Plain node:http request/response objects, no framework.
import { HttpError, clientIp, readJson, sendJson } from './http.js'
import { storage, NOT_CONNECTED } from './storage/index.js'
import { hashPassword, verifyPassword, createSession, readSession, sessionCookie, clearCookie } from './auth.js'
import { ensureSeeded, newId } from './seed.js'

/* ---------- validation helpers ---------- */
const text = (v, max = 200) => String(v ?? '').trim().slice(0, max)
const BOOKING_STATUSES = ['new', 'confirmed', 'done', 'cancelled']
const UPLOAD_LIMIT = 6_000_000 // data URL of a ≤4 MB photo, plus the other fields

function cleanPriceList(list, { session = false } = {}) {
  if (!Array.isArray(list)) throw new HttpError(400, 'Price list must be a list')
  return list.slice(0, 80).map(item => {
    const out = session
      ? { session: text(item.session, 80), price: text(item.price, 40) }
      : { name: text(item.name, 80), price: text(item.price, 40) }
    if (!session && text(item.note, 160)) out.note = text(item.note, 160)
    return out
  }).filter(i => (i.name || i.session) && i.price)
}

function cleanHours(hours) {
  const out = {}
  for (let d = 0; d < 7; d++) {
    const h = hours?.[d]
    if (h === null) { out[d] = null; continue }
    const open = Number(h?.[0]), close = Number(h?.[1])
    if (!(open >= 0 && close <= 24 && open < close)) throw new HttpError(400, `Check the opening hours for day ${d}`)
    out[d] = [open, close]
  }
  return out
}

const price = (v) => {
  const n = Math.round(Number(String(v).replace(/[^\d.]/g, '')))
  if (!(n > 0 && n < 1e9)) throw new HttpError(400, 'Enter a price in FCFA, e.g. 150000')
  return n
}

/* ---------- photo lists (tattoos & salon gallery) ---------- */
function photoList(key, folder, fields) {
  const load = async (store) => store.getJSON('content')
  const save = async (store, content) => {
    content.updatedAt = new Date().toISOString()
    await store.setJSON('content', content)
  }
  return {
    async create(req, store) {
      const body = await readJson(req, UPLOAD_LIMIT)
      const meta = fields(body) // validate before uploading
      const saved = await store.saveImage(body.image, folder)
      if (saved.error) throw new HttpError(400, saved.error)
      const content = await load(store)
      const item = { id: newId(), src: saved.src, ...meta }
      content[key].unshift(item)
      await save(store, content)
      return item
    },
    async update(req, store, id) {
      const body = await readJson(req, UPLOAD_LIMIT)
      const content = await load(store)
      const item = content[key].find(x => x.id === id)
      if (!item) throw new HttpError(404, 'Not found')
      const meta = fields({ ...item, ...body })
      if (body.image) {
        const saved = await store.saveImage(body.image, folder)
        if (saved.error) throw new HttpError(400, saved.error)
        await store.deleteImage(item.src)
        item.src = saved.src
      }
      Object.assign(item, meta)
      await save(store, content)
      return item
    },
    async remove(store, id) {
      const content = await load(store)
      const item = content[key].find(x => x.id === id)
      if (!item) throw new HttpError(404, 'Not found')
      content[key] = content[key].filter(x => x.id !== id)
      await store.deleteImage(item.src)
      await save(store, content)
    },
    async reorder(req, store) {
      const { ids } = await readJson(req)
      if (!Array.isArray(ids)) throw new HttpError(400, 'ids must be a list')
      const content = await load(store)
      const byId = new Map(content[key].map(x => [x.id, x]))
      content[key] = [...ids.map(i => byId.get(i)).filter(Boolean), ...content[key].filter(x => !ids.includes(x.id))]
      await save(store, content)
      return content[key]
    },
  }
}

const tattoos = photoList('tattoos', 'tattoos', (b) => {
  const title = text(b.title, 80)
  if (!title) throw new HttpError(400, 'Give the tattoo a name')
  return { title, style: text(b.style, 80), price: price(b.price) }
})
const salon = photoList('salon', 'salon', (b) => {
  const title = text(b.title, 80)
  if (!title) throw new HttpError(400, 'Give the photo a title')
  return { title, desc: text(b.desc, 160) }
})

/* ---------- auth helpers ---------- */
async function currentAdmin(req, store) {
  const [admin, secret] = await Promise.all([store.getJSON('admin'), store.secret()])
  return readSession(req, admin, secret)
}

async function requireAdmin(req, store) {
  const admin = await currentAdmin(req, store)
  if (!admin) throw new HttpError(401, 'Please sign in')
  // Same-site checks for anything that changes data
  if (req.method !== 'GET') {
    if (req.headers['x-requested-with'] !== 'cigaraw-admin') throw new HttpError(403, 'Forbidden')
    const origin = req.headers.origin
    if (origin) {
      let host = null
      try { host = new URL(origin).host } catch { /* "null" or malformed */ }
      if (host !== (req.headers['x-forwarded-host'] || req.headers.host)) throw new HttpError(403, 'Forbidden')
    }
  }
  return admin
}

/* ---------- the API ---------- */
export async function handleApi(req, res, pathname) {
  try {
    await route(req, res, pathname)
  } catch (err) {
    const status = err instanceof HttpError ? err.status : err.status || 500
    if (status === 500) console.error(err)
    if (!res.headersSent) sendJson(res, status, { error: status === 500 ? 'Something went wrong — please try again.' : err.message })
    else res.end()
  }
}

async function route(req, res, p) {
  const m = req.method
  const ip = clientIp(req)

  if (p === '/api/health') {
    let ready = true
    try { await storage() } catch { ready = false }
    const { hasBlob } = await import('./storage/vercel.js')
    return sendJson(res, 200, {
      ok: true,
      storage: ready ? 'connected' : 'not connected',
      photos: process.env.VERCEL ? (hasBlob ? 'connected' : 'not connected') : 'files',
      version: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
      // names only (never values) of storage-related settings, to help connect storage
      settings: Object.keys(process.env).filter(k => /BLOB|KV_|UPSTASH|REDIS|STORAGE/.test(k)).sort(),
    })
  }

  const store = await storage() // throws a 503 with instructions on Vercel until storage is connected
  await ensureSeeded(store)

  /* --- public --- */
  if (p === '/api/content' && m === 'GET') {
    const c = await store.getJSON('content')
    return sendJson(res, 200, { menu: c.menu, tattoos: c.tattoos, salon: c.salon, settings: c.settings, updatedAt: c.updatedAt })
  }

  if (p === '/api/bookings' && m === 'POST') {
    if (!(await store.hit(`book:${ip}`, 10, 3600)).ok) throw new HttpError(429, 'Too many bookings from this connection — please message us on WhatsApp.')
    const b = await readJson(req, 20_000)
    const booking = {
      id: newId(),
      ref: text(b.ref, 20) || `CIG-${Math.floor(10000 + Math.random() * 90000)}`,
      name: text(b.name, 80),
      phone: text(b.phone, 40),
      email: text(b.email, 120),
      service: text(b.service, 120),
      specialist: text(b.specialist, 80),
      date: text(b.date, 10),
      time: text(b.time, 5),
      location: b.location === 'home' ? 'home' : 'salon',
      address: text(b.address, 200),
      notes: text(b.notes, 1000),
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    if (!booking.name || !booking.phone || !booking.service || !/^\d{4}-\d{2}-\d{2}$/.test(booking.date) || !/^\d{2}:\d{2}$/.test(booking.time)) {
      throw new HttpError(400, 'Missing booking details')
    }
    await store.bookings.add(booking)
    return sendJson(res, 201, { ok: true, ref: booking.ref })
  }

  /* --- auth --- */
  if (p === '/api/auth/login' && m === 'POST') {
    const limit = await store.hit(`login:${ip}`, 8, 15 * 60)
    if (!limit.ok) throw new HttpError(429, `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} min.`)
    const { username, password } = await readJson(req)
    const admin = await store.getJSON('admin')
    const ok = admin && text(username, 80).toLowerCase() === admin.username.toLowerCase() && verifyPassword(password, admin.hash)
    if (!ok) throw new HttpError(401, 'Wrong username or password')
    await store.clearHit(`login:${ip}`)
    return sendJson(res, 200, { username: admin.username }, { 'Set-Cookie': sessionCookie(createSession(admin, await store.secret()), req) })
  }
  if (p === '/api/auth/logout' && m === 'POST') return sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearCookie() })
  if (p === '/api/auth/me' && m === 'GET') {
    const admin = await currentAdmin(req, store)
    return admin ? sendJson(res, 200, { username: admin.username }) : sendJson(res, 401, { error: 'Not signed in' })
  }

  /* --- admin only below --- */
  if (!p.startsWith('/api/admin/') && p !== '/api/auth/account') throw new HttpError(404, 'Not found')
  const admin = await requireAdmin(req, store)

  if (p === '/api/auth/account' && m === 'POST') {
    const { currentPassword, newPassword, newUsername } = await readJson(req)
    if (!verifyPassword(currentPassword, admin.hash)) throw new HttpError(400, 'Your current password is not right')
    const username = text(newUsername, 40) || admin.username
    if (!/^[A-Za-z0-9._@-]{3,40}$/.test(username)) throw new HttpError(400, 'Username: 3–40 letters, numbers, . _ - or @')
    const next = { ...admin, username, version: admin.version + 1 }
    if (newPassword) {
      if (String(newPassword).length < 10) throw new HttpError(400, 'New password must be at least 10 characters')
      next.hash = hashPassword(String(newPassword))
    }
    await store.setJSON('admin', next)
    return sendJson(res, 200, { username }, { 'Set-Cookie': sessionCookie(createSession(next, await store.secret()), req) })
  }

  if (p === '/api/admin/content' && m === 'GET') return sendJson(res, 200, await store.getJSON('content'))

  if (p === '/api/admin/bookings' && m === 'GET') return sendJson(res, 200, await store.bookings.list())
  let match = /^\/api\/admin\/bookings\/([a-f0-9]+)$/.exec(p)
  if (match) {
    const b = (await store.bookings.list()).find(x => x.id === match[1])
    if (!b) throw new HttpError(404, 'Not found')
    if (m === 'PATCH') {
      const body = await readJson(req)
      if (body.status && BOOKING_STATUSES.includes(body.status)) b.status = body.status
      if (body.adminNote !== undefined) b.adminNote = text(body.adminNote, 500)
      await store.bookings.put(b)
      return sendJson(res, 200, b)
    }
    if (m === 'DELETE') {
      await store.bookings.remove(b.id)
      return sendJson(res, 200, { ok: true })
    }
  }

  if (p === '/api/admin/menu' && m === 'PUT') {
    const { menu } = await readJson(req, 200_000)
    const content = await store.getJSON('content')
    content.menu = {
      classic: cleanPriceList(menu?.classic),
      faceBody: cleanPriceList(menu?.faceBody),
      vip: cleanPriceList(menu?.vip),
      onRequest: cleanPriceList(menu?.onRequest),
      teethWhitening: cleanPriceList(menu?.teethWhitening, { session: true }),
    }
    content.updatedAt = new Date().toISOString()
    await store.setJSON('content', content)
    return sendJson(res, 200, content.menu)
  }

  if (p === '/api/admin/settings' && m === 'PUT') {
    const { settings } = await readJson(req)
    const phone = text(settings?.phone, 30), whatsapp = text(settings?.whatsapp, 30)
    if ((phone.match(/\d/g) || []).length < 8 || (whatsapp.match(/\d/g) || []).length < 8) {
      throw new HttpError(400, 'Enter full phone numbers with the country code, e.g. +237 6…')
    }
    const content = await store.getJSON('content')
    content.settings = { phone, whatsapp, email: text(settings?.email, 120), hours: cleanHours(settings?.hours) }
    content.updatedAt = new Date().toISOString()
    await store.setJSON('content', content)
    return sendJson(res, 200, content.settings)
  }

  for (const [name, list] of [['tattoos', tattoos], ['salon', salon]]) {
    if (p === `/api/admin/${name}` && m === 'POST') return sendJson(res, 201, await list.create(req, store))
    if (p === `/api/admin/${name}/order` && m === 'PUT') return sendJson(res, 200, await list.reorder(req, store))
    match = new RegExp(`^/api/admin/${name}/([a-f0-9]+)$`).exec(p)
    if (match && m === 'PATCH') return sendJson(res, 200, await list.update(req, store, match[1]))
    if (match && m === 'DELETE') { await list.remove(store, match[1]); return sendJson(res, 200, { ok: true }) }
  }

  throw new HttpError(404, 'Not found')
}

export { NOT_CONNECTED }
