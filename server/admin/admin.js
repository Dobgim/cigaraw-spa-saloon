// CiGa Raw admin dashboard — plain JavaScript, no framework.
// User-supplied text is always inserted with textContent (never innerHTML).

const app = document.getElementById('app')
const state = { user: null, content: null, bookings: [], loaded: false }

/* ======================= small DOM helpers ======================= */

function h(tag, props = {}, ...children) {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(props || {})) {
    if (v === undefined || v === null || v === false) continue
    if (k === 'class') el.className = v
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'value') el.value = v
    else if (v === true) el.setAttribute(k, '')
    else el.setAttribute(k, v)
  }
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue
    el.append(c instanceof Node ? c : document.createTextNode(String(c)))
  }
  return el
}

// Static, trusted icon paths (24×24, stroke)
const ICONS = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  ink: 'M14 4l6 6-9.5 9.5a3 3 0 0 1-4.2 0l-1.8-1.8a3 3 0 0 1 0-4.2zM4 20l3-3',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9.5a1.5 1.5 0 1 0 0-.01',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5a1 1 0 1 0 0-.01',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  plus: 'M12 5v14M5 12h14',
  up: 'M12 19V5M5 12l7-7 7 7',
  down: 'M12 5v14M19 12l-7 7-7-7',
  left: 'M19 12H5M12 19l-7-7 7-7',
  right: 'M5 12h14M12 5l7 7-7 7',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  pin: 'M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12zM12 11a2 2 0 1 0 0-.01',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12',
  logout: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  check: 'M5 12l5 5L20 7',
  alert: 'M12 8v5M12 16v.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  upload: 'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',
  note: 'M5 4h14v16H5zM9 8h6M9 12h6M9 16h3',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
}
function icon(name, size = 20) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', size)
  svg.setAttribute('height', size)
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.8')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', ICONS[name])
  svg.append(path)
  return svg
}

function toast(message, type = 'ok') {
  const t = h('div', { class: `toast ${type === 'error' ? 'toast--error' : ''}` }, icon(type === 'error' ? 'alert' : 'check', 18), message)
  document.getElementById('toasts').append(t)
  setTimeout(() => t.remove(), type === 'error' ? 5000 : 2800)
}

function busy(btn, on, label) {
  if (on) {
    btn.dataset.label = btn.textContent
    btn.disabled = true
    btn.replaceChildren(h('span', { class: 'spinner' }), label || 'Saving…')
  } else {
    btn.disabled = false
    btn.textContent = btn.dataset.label || 'Save'
  }
}

/* ======================= API ======================= */

async function api(method, path, body) {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: { 'X-Requested-With': 'cigaraw-admin', ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  let data = null
  try { data = await res.json() } catch { /* empty */ }
  if (res.status === 401 && !path.startsWith('/api/auth/login')) {
    state.user = null
    showLogin('Your session ended — please sign in again.')
    throw new Error('Please sign in')
  }
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`)
  return data
}

async function loadAll() {
  const [content, bookings] = await Promise.all([api('GET', '/api/admin/content'), api('GET', '/api/admin/bookings')])
  state.content = content
  state.bookings = bookings
  state.loaded = true
}

/* ======================= formatting ======================= */

const money = (n) => Number(n || 0).toLocaleString('en-US')
const shortMoney = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1000 ? `${+(n / 1000).toFixed(1)}K` : String(n))
const todayISO = () => new Date(Date.now() + 3600_000).toISOString().slice(0, 10) // Douala, UTC+1
function niceDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
}
function ago(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  return `${Math.floor(s / 86400)} d ago`
}
// WhatsApp link for a client number; local Cameroon numbers (6xxxxxxxx) get +237
function waLink(phone, text) {
  let d = String(phone || '').replace(/\D/g, '')
  if (d.length === 9 && d.startsWith('6')) d = '237' + d
  return `https://wa.me/${d}?text=${encodeURIComponent(text)}`
}
const newCount = () => state.bookings.filter(b => b.status === 'new').length

/* ======================= image upload ======================= */

// Shrink a photo in the browser before upload (fast on mobile data); keeps phone orientation
async function compressImage(file, max = 1600, quality = 0.85) {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
    throw new Error('Please choose a photo (JPG, PNG or WebP).')
  }
  let bitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error('This photo format is not supported here — try a JPG or PNG.')
  }
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close?.()
  return canvas.toDataURL('image/jpeg', quality)
}

// Tap-to-choose / drag-and-drop photo field. picker.value is a data URL once a new photo is chosen.
function imagePicker(current) {
  const input = h('input', { type: 'file', accept: 'image/*', 'aria-label': 'Choose a photo' })
  const preview = h('div', {})
  const box = h('label', { class: 'picker' }, preview, input)
  const api = { value: null, el: box }

  const show = (src) => {
    preview.replaceChildren(
      src
        ? h('div', {}, h('img', { src, alt: 'Selected photo' }), h('span', { class: 'picker__change' }, 'Change photo'))
        : h('div', { class: 'picker__hint' }, icon('upload', 28), h('b', {}, 'Tap to choose a photo'), h('small', {}, 'From your camera or gallery · or drag a file here'))
    )
  }
  const take = async (file) => {
    if (!file) return
    preview.replaceChildren(h('div', { class: 'picker__hint' }, h('span', { class: 'spinner' }), 'Preparing photo…'))
    try {
      api.value = await compressImage(file)
      show(api.value)
    } catch (e) {
      toast(e.message, 'error')
      show(current)
    }
  }
  input.addEventListener('change', () => take(input.files[0]))
  box.addEventListener('dragover', (e) => { e.preventDefault(); box.classList.add('drag') })
  box.addEventListener('dragleave', () => box.classList.remove('drag'))
  box.addEventListener('drop', (e) => { e.preventDefault(); box.classList.remove('drag'); take(e.dataTransfer.files[0]) })
  show(current)
  return api
}

/* ======================= modal sheet & confirm ======================= */

function openSheet(title, buildBody) {
  const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey) }
  const onKey = (e) => e.key === 'Escape' && close()
  const sheet = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, h('h2', {}, title))
  const overlay = h('div', { class: 'overlay', onclick: (e) => e.target === overlay && close() }, sheet)
  sheet.append(buildBody(close))
  document.body.append(overlay)
  document.addEventListener('keydown', onKey)
  sheet.querySelector('input:not([type=file]), textarea, select')?.focus({ preventScroll: true })
  return close
}

function confirmDialog(message, okLabel = 'Delete') {
  return new Promise((resolve) => {
    openSheet('Are you sure?', (close) => h('div', {},
      h('p', { class: 'muted' }, message),
      h('div', { class: 'sheet__foot' },
        h('div', { class: 'right' },
          h('button', { class: 'btn btn--ghost', onclick: () => { close(); resolve(false) } }, 'Cancel'),
          h('button', { class: 'btn btn--danger', onclick: () => { close(); resolve(true) } }, okLabel),
        ),
      ),
    ))
  })
}

const field = (label, control, hint) => h('label', { class: 'field' }, h('span', {}, label), control, hint && h('small', {}, hint))

/* ======================= login ======================= */

function showLogin(message) {
  history.replaceState(null, '', '/admin/login')
  const user = h('input', { class: 'input', name: 'username', autocomplete: 'username', required: true, autocapitalize: 'none', spellcheck: 'false' })
  const pass = h('input', { class: 'input', type: 'password', name: 'password', autocomplete: 'current-password', required: true })
  const peek = h('button', { type: 'button', class: 'peek', onclick: () => { pass.type = pass.type === 'password' ? 'text' : 'password'; peek.textContent = pass.type === 'password' ? 'Show' : 'Hide' } }, 'Show')
  const err = h('p', { class: 'error-text' }, message || '')
  const btn = h('button', { class: 'btn btn--primary btn--block', type: 'submit' }, 'Sign in')

  const form = h('form', {
    onsubmit: async (e) => {
      e.preventDefault()
      err.textContent = ''
      busy(btn, true, 'Signing in…')
      try {
        const r = await api('POST', '/api/auth/login', { username: user.value.trim(), password: pass.value })
        state.user = r.username
        await loadAll()
        location.hash = '#/overview'
        history.replaceState(null, '', '/admin#/overview')
        render()
      } catch (ex) {
        err.textContent = ex.message
        pass.select()
      } finally {
        busy(btn, false)
      }
    },
  },
    field('Username', user),
    field('Password', h('div', { class: 'input-wrap' }, pass, peek)),
    err,
    btn,
  )

  app.replaceChildren(h('div', { class: 'login' },
    h('div', { class: 'login__art', style: 'background-image:url(/images/shop/vip-chairs.jpg)' },
      h('div', { class: 'login__art-text' }, h('h2', {}, 'Beauty, Confidence, Excellence.'), h('p', {}, 'CiGa Raw Salon and Spa · Logpom, Douala'))),
    h('div', { class: 'login__panel' },
      h('div', { class: 'login__brand' }, h('img', { src: '/logo.png', alt: '' }), h('div', {}, h('b', {}, 'CiGa Raw'), h('span', {}, 'Admin dashboard'))),
      h('h1', {}, 'Welcome back'),
      h('p', { class: 'sub' }, 'Sign in to manage bookings, prices and photos.'),
      form,
      h('a', { class: 'back', href: '/' }, '← Back to the website'),
    ),
  ))
  user.focus()
}

/* ======================= shell & routing ======================= */

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'bookings', label: 'Bookings', icon: 'calendar' },
  { id: 'tattoos', label: 'Tattoos', icon: 'ink' },
  { id: 'gallery', label: 'Photos', icon: 'image' },
  { id: 'prices', label: 'Prices', icon: 'tag' },
  { id: 'settings', label: 'Hours & contact', icon: 'settings' },
  { id: 'account', label: 'Account', icon: 'user' },
]
const VIEWS = {}
const current = () => (location.hash.replace(/^#\//, '') || 'overview').split('?')[0]

async function logout() {
  try { await api('POST', '/api/auth/logout') } catch { /* ignore */ }
  state.user = null
  showLogin('You have signed out.')
}

function render() {
  if (!state.user) return showLogin()
  const view = VIEWS[current()] ? current() : 'overview'
  const badge = () => newCount() ? h('span', { class: 'badge' }, newCount()) : null
  const link = (n, cls) => h('a', { href: `#/${n.id}`, class: view === n.id ? 'active' : '' , 'aria-current': view === n.id ? 'page' : null }, icon(n.icon, cls === 'tab' ? 22 : 20), cls === 'tab' ? h('span', {}, n.label.split(' ')[0]) : n.label, n.id === 'bookings' && badge())

  const main = h('main', { class: 'main', id: 'main' })
  app.replaceChildren(h('div', { class: 'shell' },
    h('aside', { class: 'sidebar' },
      h('a', { class: 'sidebar__brand', href: '#/overview' }, h('img', { src: '/logo.png', alt: '' }), h('div', {}, h('b', {}, 'CiGa Raw'), h('span', {}, 'Admin'))),
      h('nav', { 'aria-label': 'Dashboard' }, NAV.map(n => link(n))),
      h('div', { class: 'sidebar__foot' },
        h('a', { href: '/', target: '_blank', rel: 'noopener' }, icon('globe', 18), 'View website'),
        h('button', { onclick: logout }, icon('logout', 18), 'Sign out'),
      ),
    ),
    h('div', {},
      h('header', { class: 'topbar' },
        h('a', { class: 'topbar__brand', href: '#/overview' }, h('img', { src: '/logo.png', alt: '' }), h('b', {}, 'CiGa Raw')),
        h('div', { class: 'topbar__actions' },
          h('a', { class: 'btn btn--ghost btn--sm hide-sm', href: '/', target: '_blank', rel: 'noopener' }, icon('globe', 16), 'Website'),
          h('a', { class: 'icon-btn', href: '#/settings', title: 'Hours & contact', 'aria-label': 'Hours & contact' }, icon('settings', 18)),
          h('a', { class: 'icon-btn', href: '#/account', title: 'Account', 'aria-label': 'Account' }, icon('user', 18)),
        ),
      ),
      main,
    ),
    h('nav', { class: 'tabbar', 'aria-label': 'Dashboard' }, NAV.slice(0, 5).map(n => link(n, 'tab'))),
  ))
  VIEWS[view](main)
  window.scrollTo(0, 0)
}
window.addEventListener('hashchange', () => state.user && render())

const pageHead = (title, sub, ...actions) => h('div', { class: 'page-head' }, h('div', {}, h('h1', {}, title), sub && h('p', {}, sub)), actions.length ? h('div', { class: 'toolbar', style: 'margin:0' }, actions) : null)

/* ======================= overview ======================= */

VIEWS.overview = (main) => {
  const today = todayISO()
  const upcoming = state.bookings
    .filter(b => b.date >= today && (b.status === 'new' || b.status === 'confirmed'))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const week = new Date(Date.now() + 8 * 86400_000).toISOString().slice(0, 10)
  const hour = Number(new Date(Date.now() + 3600_000).toISOString().slice(11, 13))
  const hello = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  main.append(
    pageHead(`${hello}.`, 'Here is what is happening at CiGa Raw.'),
    h('div', { class: 'stats' },
      h('a', { class: 'card stat stat--hot', href: '#/bookings?status=new' }, h('b', {}, newCount()), h('span', {}, 'New booking requests')),
      h('a', { class: 'card stat', href: '#/bookings' }, h('b', {}, upcoming.filter(b => b.date < week).length), h('span', {}, 'Coming up this week')),
      h('a', { class: 'card stat', href: '#/tattoos' }, h('b', {}, state.content.tattoos.length), h('span', {}, 'Tattoo designs')),
      h('a', { class: 'card stat', href: '#/gallery' }, h('b', {}, state.content.salon.length), h('span', {}, 'Salon photos')),
    ),
    h('h2', { class: 'section-title' }, 'Quick actions'),
    h('div', { class: 'quick' },
      h('a', { class: 'card', href: '#/tattoos?new=1' }, icon('plus'), 'Add a tattoo'),
      h('a', { class: 'card', href: '#/gallery?new=1' }, icon('image'), 'Add a salon photo'),
      h('a', { class: 'card', href: '#/prices' }, icon('tag'), 'Update prices'),
      h('a', { class: 'card', href: '#/settings' }, icon('clock'), 'Opening hours'),
    ),
    h('h2', { class: 'section-title' }, 'Next appointments'),
    upcoming.length
      ? h('div', { class: 'list' }, upcoming.slice(0, 5).map(bookingCard))
      : h('div', { class: 'card empty' }, icon('calendar', 30), h('div', {}, 'No upcoming bookings yet. New requests from the website appear here.')),
  )
}

/* ======================= bookings ======================= */

const STATUSES = ['new', 'confirmed', 'done', 'cancelled']

function bookingCard(b) {
  const status = h('select', {
    class: 'select', 'aria-label': 'Booking status',
    onchange: async () => {
      try {
        const updated = await api('PATCH', `/api/admin/bookings/${b.id}`, { status: status.value })
        Object.assign(b, updated)
        toast(`Marked as ${updated.status}`)
        render()
      } catch (e) { toast(e.message, 'error') }
    },
  }, STATUSES.map(s => h('option', { value: s, selected: s === b.status }, s[0].toUpperCase() + s.slice(1))))

  const confirmMsg = `Hello ${b.name}, this is CiGa Raw Salon and Spa. Your booking ${b.ref} for ${b.service} on ${niceDate(b.date)} at ${b.time} is confirmed. See you soon!`

  return h('article', { class: 'card booking' },
    h('div', { class: 'booking__top' },
      h('div', {}, h('div', { class: 'booking__name' }, b.name), h('div', { class: 'booking__ref' }, `${b.ref} · received ${ago(b.createdAt)}`)),
      h('span', { class: `status status--${b.status}` }, b.status),
    ),
    h('div', { class: 'booking__meta' },
      h('div', {}, icon('scissors', 16), b.service),
      h('div', {}, icon('clock', 16), `${niceDate(b.date)} · ${b.time}`),
      h('div', {}, icon('phone', 16), h('a', { href: `tel:${b.phone}` }, b.phone)),
      h('div', {}, icon('pin', 16), b.location === 'home'
        ? h('span', {}, h('span', { class: 'status tag-home', style: 'margin-right:6px' }, 'Home'), b.address)
        : 'At the salon'),
      b.specialist && h('div', {}, icon('user', 16), b.specialist),
      b.email && h('div', {}, icon('note', 16), b.email),
    ),
    b.notes && h('div', { class: 'booking__notes' }, b.notes),
    h('div', { class: 'booking__actions' },
      h('a', { class: 'btn btn--wa btn--sm', href: waLink(b.phone, confirmMsg), target: '_blank', rel: 'noopener' }, 'WhatsApp client'),
      h('a', { class: 'btn btn--ghost btn--sm', href: `tel:${b.phone}` }, icon('phone', 16), 'Call'),
      status,
      h('button', {
        class: 'icon-btn', title: 'Delete booking', 'aria-label': 'Delete booking', style: 'margin-left:auto',
        onclick: async () => {
          if (!(await confirmDialog(`Delete the booking from ${b.name}? This cannot be undone.`))) return
          try {
            await api('DELETE', `/api/admin/bookings/${b.id}`)
            state.bookings = state.bookings.filter(x => x.id !== b.id)
            toast('Booking deleted')
            render()
          } catch (e) { toast(e.message, 'error') }
        },
      }, icon('trash', 18)),
    ),
  )
}

VIEWS.bookings = (main) => {
  const params = new URLSearchParams(location.hash.split('?')[1])
  let filter = params.get('status') || 'all'
  let q = ''
  const list = h('div', { class: 'list' })
  const draw = () => {
    const items = state.bookings
      .filter(b => filter === 'all' || b.status === filter)
      .filter(b => !q || `${b.name} ${b.phone} ${b.service} ${b.ref}`.toLowerCase().includes(q))
    list.replaceChildren(...(items.length
      ? items.map(bookingCard)
      : [h('div', { class: 'card empty' }, icon('calendar', 30), h('div', {}, filter === 'all' && !q ? 'No bookings yet. When clients book on the website, they appear here.' : 'No bookings match.'))]))
  }
  const chips = h('div', { class: 'chips' }, ['all', ...STATUSES].map(s => {
    const count = s === 'all' ? state.bookings.length : state.bookings.filter(b => b.status === s).length
    return h('button', {
      class: `chip ${filter === s ? 'active' : ''}`,
      onclick: (e) => { filter = s; chips.querySelectorAll('.chip').forEach(c => c.classList.remove('active')); e.currentTarget.classList.add('active'); draw() },
    }, `${s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)} (${count})`)
  }))
  main.append(
    pageHead('Bookings', 'Requests from the website booking form. Confirm with the client on WhatsApp.',
      h('button', { class: 'btn btn--ghost btn--sm', onclick: async (e) => { busy(e.currentTarget, true, 'Refreshing…'); try { await loadAll(); render(); toast('Up to date') } catch (ex) { toast(ex.message, 'error'); busy(e.currentTarget, false) } } }, 'Refresh')),
    h('div', { class: 'toolbar' },
      h('input', { class: 'input', type: 'search', placeholder: 'Search name, phone, service…', oninput: (e) => { q = e.target.value.trim().toLowerCase(); draw() } }),
    ),
    chips,
    h('div', { style: 'height:14px' }),
    list,
  )
  draw()
}

/* ======================= photo lists (tattoos & gallery) ======================= */

function photoManager({ key, endpoint, title, sub, addLabel, fields, describe }) {
  return (main) => {
    const items = state.content[key]
    const grid = h('div', { class: 'grid' })

    const move = async (i, dir) => {
      const arr = [...items]
      const j = i + dir
      if (j < 0 || j >= arr.length) return
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      try {
        state.content[key] = await api('PUT', `${endpoint}/order`, { ids: arr.map(x => x.id) })
        render()
      } catch (e) { toast(e.message, 'error') }
    }

    const edit = (item) => openSheet(item ? `Edit ${item.title}` : addLabel, (close) => {
      const picker = imagePicker(item?.src)
      const inputs = fields.map(f => ({ ...f, el: h(f.textarea ? 'textarea' : 'input', { class: f.textarea ? 'textarea' : 'input', value: item?.[f.name] ?? '', placeholder: f.placeholder || '', inputmode: f.inputmode, maxlength: f.max || 120 }) }))
      const save = h('button', { class: 'btn btn--primary', type: 'submit' }, item ? 'Save changes' : 'Upload')
      return h('form', {
        onsubmit: async (e) => {
          e.preventDefault()
          if (!item && !picker.value) return toast('Choose a photo first', 'error')
          const body = Object.fromEntries(inputs.map(f => [f.name, f.el.value]))
          if (picker.value) body.image = picker.value
          busy(save, true, picker.value ? 'Uploading…' : 'Saving…')
          try {
            const saved = await api(item ? 'PATCH' : 'POST', item ? `${endpoint}/${item.id}` : endpoint, body)
            if (item) Object.assign(item, saved)
            else state.content[key].unshift(saved)
            close()
            toast(item ? 'Saved — the website is updated' : 'Uploaded — it is live on the website')
            render()
          } catch (ex) {
            toast(ex.message, 'error')
            busy(save, false)
          }
        },
      },
        h('div', { class: 'sheet__body' }, picker.el, inputs.map(f => field(f.label, f.el, f.hint))),
        h('div', { class: 'sheet__foot' },
          item && h('button', {
            type: 'button', class: 'btn btn--danger',
            onclick: async () => {
              if (!(await confirmDialog(`Remove "${item.title}" from the website?`, 'Remove'))) return
              try {
                await api('DELETE', `${endpoint}/${item.id}`)
                state.content[key] = state.content[key].filter(x => x.id !== item.id)
                close()
                toast('Removed from the website')
                render()
              } catch (ex) { toast(ex.message, 'error') }
            },
          }, icon('trash', 16), 'Delete'),
          h('div', { class: 'right' }, h('button', { type: 'button', class: 'btn btn--ghost', onclick: close }, 'Cancel'), save),
        ),
      )
    })

    grid.append(
      h('button', { class: 'add-tile', onclick: () => edit(null) }, icon('plus', 30), addLabel),
      ...items.map((item, i) => h('article', { class: 'card tile' },
        h('div', { class: 'tile__img', onclick: () => edit(item), role: 'button', tabindex: '0', 'aria-label': `Edit ${item.title}`, onkeydown: (e) => e.key === 'Enter' && edit(item) },
          h('img', { src: item.src, alt: '', loading: 'lazy' }),
          item.price ? h('span', { class: 'tile__price' }, `${shortMoney(item.price)} FCFA`) : null),
        h('div', { class: 'tile__body' }, h('div', { class: 'tile__title' }, item.title), h('div', { class: 'tile__sub' }, describe(item))),
        h('div', { class: 'tile__tools' },
          h('button', { class: 'icon-btn', title: 'Move earlier', 'aria-label': 'Move earlier', disabled: i === 0, onclick: () => move(i, -1) }, icon('left', 16)),
          h('button', { class: 'icon-btn', title: 'Move later', 'aria-label': 'Move later', disabled: i === items.length - 1, onclick: () => move(i, 1) }, icon('right', 16)),
          h('button', { class: 'btn btn--ghost btn--sm', onclick: () => edit(item) }, icon('edit', 15), 'Edit'),
        ),
      )),
    )

    main.append(pageHead(title, sub, h('button', { class: 'btn btn--primary', onclick: () => edit(null) }, icon('plus', 18), addLabel)), grid)
    if (new URLSearchParams(location.hash.split('?')[1]).get('new')) {
      history.replaceState(null, '', `/admin#/${current()}`)
      edit(null)
    }
  }
}

VIEWS.tattoos = photoManager({
  key: 'tattoos', endpoint: '/api/admin/tattoos', addLabel: 'Add tattoo',
  title: 'Tattoo portfolio', sub: 'Every design shows its price on the website. The first ones also appear on the home page.',
  describe: (t) => `${t.style || 'Tattoo'} · ${money(t.price)} FCFA`,
  fields: [
    { name: 'title', label: 'Name of the design', placeholder: 'e.g. Golden crown of thorns', max: 80 },
    { name: 'style', label: 'Style / placement', placeholder: 'e.g. Colour realism, back piece', max: 80 },
    { name: 'price', label: 'Price (FCFA)', placeholder: 'e.g. 500000', inputmode: 'numeric', max: 12, hint: 'Numbers only — the website shows it as 500K / 1.5M.' },
  ],
})

VIEWS.gallery = photoManager({
  key: 'salon', endpoint: '/api/admin/salon', addLabel: 'Add photo',
  title: 'Salon photos', sub: 'These appear in the Gallery under “Salon”. Tattoo photos are managed in Tattoos.',
  describe: (p) => p.desc || '—',
  fields: [
    { name: 'title', label: 'Title', placeholder: 'e.g. The VIP room', max: 80 },
    { name: 'desc', label: 'Short description', placeholder: 'e.g. Two chairs and a lounge corner', textarea: true, max: 160 },
  ],
})

/* ======================= prices ======================= */

const PRICE_GROUPS = [
  { key: 'classic', label: 'Classic services', hint: 'Shaving, black, waves' },
  { key: 'faceBody', label: 'Face & body', hint: 'Facials, scrubs, massage, mani-pedi, epilation, dreadlocks' },
  { key: 'onRequest', label: 'Hair & nails', hint: 'Use “On request” if there is no fixed price' },
  { key: 'vip', label: 'VIP services', hint: 'Shown on the VIP page' },
  { key: 'teethWhitening', label: 'VIP teeth whitening', hint: 'One row per session', session: true },
]

VIEWS.prices = (main) => {
  const draft = structuredClone(state.content.menu)
  let dirty = false
  const savebarHost = h('div')

  const markDirty = () => {
    if (dirty) return
    dirty = true
    const save = h('button', { class: 'btn btn--primary btn--sm' }, 'Save prices')
    save.addEventListener('click', async () => {
      busy(save, true)
      try {
        state.content.menu = await api('PUT', '/api/admin/menu', { menu: draft })
        dirty = false
        savebarHost.replaceChildren()
        toast('Prices saved — the website is updated')
      } catch (e) { toast(e.message, 'error'); busy(save, false) }
    })
    savebarHost.replaceChildren(h('div', { class: 'savebar' }, h('span', {}, 'You have unsaved changes'), h('div', { style: 'display:flex;gap:8px' },
      h('button', { class: 'btn btn--sm', style: 'color:var(--paper)', onclick: () => { dirty = false; render() } }, 'Discard'), save)))
  }

  const groupCard = (g) => {
    const rows = h('div')
    const draw = () => {
      rows.replaceChildren(...draft[g.key].map((item, i) => {
        const nameKey = g.session ? 'session' : 'name'
        const inp = (k, ph, w) => h('input', { class: 'input', value: item[k] || '', placeholder: ph, 'aria-label': ph, style: w, oninput: (e) => { item[k] = e.target.value; markDirty() } })
        return h('div', { class: 'price-row' },
          h('div', { class: 'price-row__fields' },
            inp(nameKey, g.session ? 'Session' : 'Service name'),
            inp('price', 'Price, e.g. 3,000 – 5,000'),
            g.session ? h('span') : inp('note', 'Note (optional)'),
          ),
          h('div', { class: 'price-row__tools' },
            h('button', { class: 'icon-btn', title: 'Move up', 'aria-label': 'Move up', disabled: i === 0, onclick: () => { const a = draft[g.key];[a[i - 1], a[i]] = [a[i], a[i - 1]]; markDirty(); draw() } }, icon('up', 16)),
            h('button', { class: 'icon-btn', title: 'Remove', 'aria-label': 'Remove', onclick: () => { draft[g.key].splice(i, 1); markDirty(); draw() } }, icon('trash', 16)),
          ),
        )
      }))
    }
    draw()
    return h('section', { class: 'card price-group' },
      h('div', { class: 'price-group__head' }, h('div', {}, h('h3', {}, g.label), h('small', { class: 'muted' }, g.hint)),
        h('button', { class: 'btn btn--ghost btn--sm', onclick: () => { draft[g.key].push(g.session ? { session: '', price: '' } : { name: '', price: '' }); markDirty(); draw(); rows.lastChild?.querySelector('input')?.focus() } }, icon('plus', 16), 'Add')),
      rows,
    )
  }

  main.append(
    pageHead('Prices', 'Edit any service name or price, then tap “Save prices”. Prices are in FCFA.'),
    h('div', { style: 'display:grid;gap:14px' }, PRICE_GROUPS.map(groupCard)),
    savebarHost,
  )
}

/* ======================= hours & contact ======================= */

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_INDEX = [1, 2, 3, 4, 5, 6, 0]
const toTime = (n) => `${String(Math.floor(n)).padStart(2, '0')}:${String(Math.round((n % 1) * 60)).padStart(2, '0')}`
const fromTime = (s) => { const [hh, mm] = s.split(':').map(Number); return hh + (mm || 0) / 60 }

VIEWS.settings = (main) => {
  const st = state.content.settings
  const phone = h('input', { class: 'input', value: st.phone, inputmode: 'tel' })
  const whatsapp = h('input', { class: 'input', value: st.whatsapp, inputmode: 'tel' })
  const email = h('input', { class: 'input', value: st.email, type: 'email' })

  const hourRows = DAY_INDEX.map((d, i) => {
    const h0 = st.hours[d]
    const open = h('input', { type: 'checkbox', checked: !!h0 })
    const from = h('input', { class: 'input', type: 'time', value: toTime(h0?.[0] ?? 8), 'aria-label': `${DAYS[i]} opening time` })
    const to = h('input', { class: 'input', type: 'time', value: toTime(h0?.[1] ?? 19), 'aria-label': `${DAYS[i]} closing time` })
    const times = h('div', { class: 'hour-row__times' }, from, h('span', { class: 'muted' }, 'to'), to)
    const sync = () => { times.style.opacity = open.checked ? 1 : 0.35; from.disabled = to.disabled = !open.checked }
    open.addEventListener('change', sync)
    sync()
    return { d, open, from, to, el: h('div', { class: 'hour-row' }, h('label', { class: 'toggle' }, open, h('b', {}, DAYS[i].slice(0, 3))), times) }
  })

  const save = h('button', { class: 'btn btn--primary' }, 'Save hours & contact')
  save.addEventListener('click', async () => {
    const hours = {}
    for (const r of hourRows) {
      if (!r.open.checked) { hours[r.d] = null; continue }
      const a = fromTime(r.from.value), b = fromTime(r.to.value)
      if (!(a < b)) return toast(`${DAYS[DAY_INDEX.indexOf(r.d)]}: closing time must be after opening time`, 'error')
      hours[r.d] = [a, b]
    }
    busy(save, true)
    try {
      state.content.settings = await api('PUT', '/api/admin/settings', { settings: { phone: phone.value, whatsapp: whatsapp.value, email: email.value, hours } })
      toast('Saved — the website and “Open now” badge are updated')
    } catch (e) { toast(e.message, 'error') }
    busy(save, false)
  })

  main.append(
    pageHead('Hours & contact', 'Used across the website: footer, map, booking page, FAQ and the live “Open now” badge.'),
    h('div', { class: 'settings-grid' },
      h('section', { class: 'card card__pad' }, h('h2', { class: 'section-title', style: 'margin-top:0' }, 'Opening hours'), h('div', { class: 'hours' }, hourRows.map(r => r.el))),
      h('section', { class: 'card card__pad', style: 'display:grid;gap:14px' },
        h('h2', { class: 'section-title', style: 'margin:0' }, 'Contact'),
        field('Salon phone', phone, 'Shown on the website with a “call” link.'),
        field('WhatsApp number', whatsapp, 'Every WhatsApp button on the website opens a chat with this number.'),
        field('Email', email),
      ),
    ),
    h('div', { style: 'margin-top:16px' }, save),
  )
}

/* ======================= account ======================= */

VIEWS.account = (main) => {
  const username = h('input', { class: 'input', value: state.user, autocomplete: 'username', autocapitalize: 'none' })
  const currentPw = h('input', { class: 'input', type: 'password', autocomplete: 'current-password', required: true })
  const newPw = h('input', { class: 'input', type: 'password', autocomplete: 'new-password', minlength: 10 })
  const btn = h('button', { class: 'btn btn--primary', type: 'submit' }, 'Update account')

  main.append(
    pageHead('Account', `Signed in as ${state.user}.`),
    h('div', { class: 'settings-grid' },
      h('form', {
        class: 'card card__pad', style: 'display:grid;gap:14px',
        onsubmit: async (e) => {
          e.preventDefault()
          busy(btn, true)
          try {
            const r = await api('POST', '/api/auth/account', { currentPassword: currentPw.value, newPassword: newPw.value, newUsername: username.value.trim() })
            state.user = r.username
            toast(newPw.value ? 'Password changed — other devices are signed out' : 'Account updated')
            render()
          } catch (ex) { toast(ex.message, 'error'); busy(btn, false) }
        },
      },
        h('h2', { class: 'section-title', style: 'margin:0' }, 'Login details'),
        field('Username', username),
        field('New password', newPw, 'At least 10 characters. Leave empty to keep your current password.'),
        field('Current password', currentPw, 'Needed to confirm any change.'),
        h('div', {}, btn),
      ),
      h('section', { class: 'card card__pad', style: 'display:grid;gap:12px' },
        h('h2', { class: 'section-title', style: 'margin:0' }, 'Session'),
        h('p', { class: 'muted', style: 'margin:0' }, 'For safety you are signed out automatically after 12 hours. Changing the password signs out every other phone or computer.'),
        h('div', {}, h('button', { class: 'btn btn--dark', onclick: logout }, icon('logout', 16), 'Sign out')),
      ),
    ),
  )
}

/* ======================= start ======================= */

;(async () => {
  try {
    const me = await fetch('/api/auth/me', { credentials: 'same-origin' })
    if (me.ok) {
      state.user = (await me.json()).username
      await loadAll()
      if (location.pathname.startsWith('/admin/login')) history.replaceState(null, '', '/admin#/overview')
      render()
    } else {
      showLogin()
    }
  } catch {
    showLogin('Cannot reach the server. Check your connection and refresh.')
  }
})()
