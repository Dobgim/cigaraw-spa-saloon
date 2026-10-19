// CiGa Raw backend — plain Node.js (node:http), no framework, no database server.
// Serves the website (dist/), the admin dashboard (/admin), uploaded photos (/uploads)
// and a small JSON API (/api).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { HttpError, SECURITY_HEADERS, clientIp, readJson, sendJson, serveStatic } from './http.js'
import { UPLOAD_DIR, readData, writeData, newId, saveImage, deleteUpload } from './store.js'
import {
  getAdmin, saveAdmin, hashPassword, verifyPassword, createSession, readSession,
  sessionCookie, clearCookie, rateLimit, clearRateLimit,
} from './auth.js'
import { seed } from './seed.js'

const PORT = Number(process.env.PORT) || 8787
const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const ADMIN_DIR = path.join(import.meta.dirname, 'admin')

seed()

// ---------- validation helpers ----------
const text = (v, max = 200) => String(v ?? '').trim().slice(0, max)
const BOOKING_STATUSES = ['new', 'confirmed', 'done', 'cancelled']

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

// ---------- content ----------
const getContent = () => readData('content.json', null)
function saveContent(content) {
  content.updatedAt = new Date().toISOString()
  writeData('content.json', content)
  return content
}

// Shared create / update / delete / reorder for the tattoo and gallery photo lists
function photoList(key, folder, fields) {
  return {
    async create(req) {
      const body = await readJson(req, 12_000_000)
      const saved = saveImage(body.image, folder)
      if (saved.error) throw new HttpError(400, saved.error)
      const content = getContent()
      const item = { id: newId(), src: saved.src, ...fields(body) }
      content[key].unshift(item)
      saveContent(content)
      return item
    },
    async update(req, id) {
      const body = await readJson(req, 12_000_000)
      const content = getContent()
      const item = content[key].find(x => x.id === id)
      if (!item) throw new HttpError(404, 'Not found')
      if (body.image) {
        const saved = saveImage(body.image, folder)
        if (saved.error) throw new HttpError(400, saved.error)
        deleteUpload(item.src)
        item.src = saved.src
      }
      Object.assign(item, fields({ ...item, ...body }))
      saveContent(content)
      return item
    },
    remove(id) {
      const content = getContent()
      const item = content[key].find(x => x.id === id)
      if (!item) throw new HttpError(404, 'Not found')
      content[key] = content[key].filter(x => x.id !== id)
      deleteUpload(item.src)
      saveContent(content)
    },
    async reorder(req) {
      const { ids } = await readJson(req)
      const content = getContent()
      if (!Array.isArray(ids)) throw new HttpError(400, 'ids must be a list')
      const byId = new Map(content[key].map(x => [x.id, x]))
      const ordered = ids.map(i => byId.get(i)).filter(Boolean)
      content[key] = [...ordered, ...content[key].filter(x => !ids.includes(x.id))]
      saveContent(content)
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

// ---------- request handling ----------
function requireAdmin(req) {
  const admin = readSession(req)
  if (!admin) throw new HttpError(401, 'Please sign in')
  // Same-site check for anything that changes data
  if (req.method !== 'GET') {
    if (req.headers['x-requested-with'] !== 'cigaraw-admin') throw new HttpError(403, 'Forbidden')
    const origin = req.headers.origin
    if (origin) {
      let host = null
      try { host = new URL(origin).host } catch { /* "null" or malformed */ }
      if (host !== req.headers.host) throw new HttpError(403, 'Forbidden')
    }
  }
  return admin
}

async function api(req, res, url) {
  const p = url.pathname
  const m = req.method
  const ip = clientIp(req)

  // --- public ---
  if (p === '/api/health') return sendJson(res, 200, { ok: true })

  if (p === '/api/content' && m === 'GET') {
    const c = getContent()
    return sendJson(res, 200, { menu: c.menu, tattoos: c.tattoos, salon: c.salon, settings: c.settings, updatedAt: c.updatedAt })
  }

  if (p === '/api/bookings' && m === 'POST') {
    if (!rateLimit(`book:${ip}`, 10, 3600_000).ok) throw new HttpError(429, 'Too many bookings from this connection — please message us on WhatsApp.')
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
    const all = readData('bookings.json', [])
    all.unshift(booking)
    writeData('bookings.json', all.slice(0, 5000))
    return sendJson(res, 201, { ok: true, ref: booking.ref })
  }

  // --- auth ---
  if (p === '/api/auth/login' && m === 'POST') {
    const limit = rateLimit(`login:${ip}`, 8, 15 * 60_000)
    if (!limit.ok) throw new HttpError(429, `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} min.`)
    const { username, password } = await readJson(req)
    const admin = getAdmin()
    const ok = admin && text(username, 80).toLowerCase() === admin.username.toLowerCase() && verifyPassword(password, admin.hash)
    if (!ok) throw new HttpError(401, 'Wrong username or password')
    clearRateLimit(`login:${ip}`)
    return sendJson(res, 200, { username: admin.username }, { 'Set-Cookie': sessionCookie(createSession(admin), req) })
  }
  if (p === '/api/auth/logout' && m === 'POST') {
    return sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearCookie() })
  }
  if (p === '/api/auth/me' && m === 'GET') {
    const admin = readSession(req)
    return admin ? sendJson(res, 200, { username: admin.username }) : sendJson(res, 401, { error: 'Not signed in' })
  }

  // --- admin only below ---
  if (!p.startsWith('/api/admin/') && p !== '/api/auth/account') throw new HttpError(404, 'Not found')
  const admin = requireAdmin(req)

  if (p === '/api/auth/account' && m === 'POST') {
    const { currentPassword, newPassword, newUsername } = await readJson(req)
    if (!verifyPassword(currentPassword, admin.hash)) throw new HttpError(400, 'Your current password is not right')
    const username = text(newUsername, 40) || admin.username
    if (!/^[A-Za-z0-9._@-]{3,40}$/.test(username)) throw new HttpError(400, 'Username: 3–40 letters, numbers, . _ - or @')
    const next = { ...admin, username }
    if (newPassword) {
      if (String(newPassword).length < 10) throw new HttpError(400, 'New password must be at least 10 characters')
      next.hash = hashPassword(String(newPassword))
    }
    next.version = admin.version + 1
    saveAdmin(next)
    return sendJson(res, 200, { username }, { 'Set-Cookie': sessionCookie(createSession(next), req) })
  }

  if (p === '/api/admin/content' && m === 'GET') return sendJson(res, 200, getContent())

  if (p === '/api/admin/bookings' && m === 'GET') return sendJson(res, 200, readData('bookings.json', []))
  let match = /^\/api\/admin\/bookings\/([a-f0-9]+)$/.exec(p)
  if (match) {
    const all = readData('bookings.json', [])
    const b = all.find(x => x.id === match[1])
    if (!b) throw new HttpError(404, 'Not found')
    if (m === 'PATCH') {
      const body = await readJson(req)
      if (body.status && BOOKING_STATUSES.includes(body.status)) b.status = body.status
      if (body.adminNote !== undefined) b.adminNote = text(body.adminNote, 500)
      writeData('bookings.json', all)
      return sendJson(res, 200, b)
    }
    if (m === 'DELETE') {
      writeData('bookings.json', all.filter(x => x.id !== b.id))
      return sendJson(res, 200, { ok: true })
    }
  }

  if (p === '/api/admin/menu' && m === 'PUT') {
    const { menu } = await readJson(req, 200_000)
    const content = getContent()
    content.menu = {
      classic: cleanPriceList(menu?.classic),
      faceBody: cleanPriceList(menu?.faceBody),
      vip: cleanPriceList(menu?.vip),
      onRequest: cleanPriceList(menu?.onRequest),
      teethWhitening: cleanPriceList(menu?.teethWhitening, { session: true }),
    }
    return sendJson(res, 200, saveContent(content).menu)
  }

  if (p === '/api/admin/settings' && m === 'PUT') {
    const { settings } = await readJson(req)
    const content = getContent()
    const phone = text(settings?.phone, 30), whatsapp = text(settings?.whatsapp, 30)
    if ((phone.match(/\d/g) || []).length < 8 || (whatsapp.match(/\d/g) || []).length < 8) throw new HttpError(400, 'Enter full phone numbers with the country code, e.g. +237 6…')
    content.settings = {
      phone, whatsapp,
      email: text(settings?.email, 120),
      hours: cleanHours(settings?.hours),
    }
    return sendJson(res, 200, saveContent(content).settings)
  }

  for (const [name, list] of [['tattoos', tattoos], ['salon', salon]]) {
    if (p === `/api/admin/${name}` && m === 'POST') return sendJson(res, 201, await list.create(req))
    if (p === `/api/admin/${name}/order` && m === 'PUT') return sendJson(res, 200, await list.reorder(req))
    match = new RegExp(`^/api/admin/${name}/([a-f0-9]+)$`).exec(p)
    if (match && m === 'PATCH') return sendJson(res, 200, await list.update(req, match[1]))
    if (match && m === 'DELETE') { list.remove(match[1]); return sendJson(res, 200, { ok: true }) }
  }

  throw new HttpError(404, 'Not found')
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url)

    if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, 'Method not allowed')

    if (url.pathname.startsWith('/uploads/')) {
      if (serveStatic(req, res, UPLOAD_DIR, url.pathname.slice('/uploads'.length), { cache: 'public, max-age=31536000, immutable' })) return
      throw new HttpError(404, 'Not found')
    }

    if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
      const rest = url.pathname.slice('/admin'.length) || '/'
      const noStore = { cache: 'no-store', extraHeaders: { 'X-Frame-Options': 'DENY', 'X-Robots-Tag': 'noindex' } }
      if (rest !== '/' && serveStatic(req, res, ADMIN_DIR, rest, noStore)) return
      if (serveStatic(req, res, ADMIN_DIR, '/index.html', noStore)) return
    }

    // Website: hashed assets cached long, everything else falls back to index.html (client routing)
    const longCache = url.pathname.startsWith('/assets/') ? { cache: 'public, max-age=31536000, immutable' } : undefined
    if (url.pathname !== '/' && serveStatic(req, res, DIST, url.pathname, longCache)) return
    if (serveStatic(req, res, DIST, '/index.html', { cache: 'no-cache' })) return

    res.writeHead(503, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Website not built yet. Run "npm run build", then restart the server.')
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500
    if (status === 500) console.error(err)
    if (!res.headersSent) sendJson(res, status, { error: status === 500 ? 'Something went wrong' : err.message })
    else res.end()
  }
})

server.listen(PORT, () => {
  console.log(`CiGa Raw server on http://localhost:${PORT}`)
  console.log(`  Website  http://localhost:${PORT}/`)
  console.log(`  Admin    http://localhost:${PORT}/admin`)
  if (!fs.existsSync(DIST)) console.log('  (run "npm run build" to serve the website)')
})
