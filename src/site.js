// Contact details and navigation shared across the site

// Contact details: built-in defaults, replaced by applySettings() when the backend is running
export let PHONE_DISPLAY = '+237 671 19 08 78'
export let PHONE_TEL = '+237671190878'
export let WHATSAPP_DISPLAY = '+237 679 170 410'
let WHATSAPP_NUMBER = '237679170410'
export let EMAIL = 'cigaraw237@gmail.com'
export const ADDRESS = ['Between Tradex Rhône Poulenc', '& Collège Charles de Gaulle', 'Logpom, Douala, Cameroon']
export const ADDRESS_SHORT = 'Logpom, Douala'
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('CIGA RAW SALON AND SPA, 3QP6+C5 Logpom, Douala')
// Plus code 3QP6+C5 Douala (6FPF3QP6+C5), on Avenue de Logpom
export const SALON_COORDS = [4.08606, 9.76044]
export const GOOGLE_RATING = { score: '5.0', count: 2 }

// Opening hours by weekday (0 = Sunday): [open, close] in hours, or null when closed
export let OPENING = {
  0: [10, 16],
  1: [8, 19], 2: [8, 19], 3: [8, 19], 4: [8, 19], 5: [8, 19], 6: [8, 19],
}

// Human-readable hours, grouping neighbouring days with the same times
export let HOURS = []
const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const fmt = (h) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`
function deriveHours() {
  const order = [1, 2, 3, 4, 5, 6, 0]
  const groups = []
  for (const d of order) {
    const key = OPENING[d] ? OPENING[d].join('-') : 'closed'
    const last = groups[groups.length - 1]
    if (last && last.key === key) last.days.push(d)
    else groups.push({ key, days: [d] })
  }
  HOURS = groups.map(g => ({
    days: g.days.length === 1 ? DAY[g.days[0]] : `${SHORT[g.days[0]]} – ${SHORT[g.days[g.days.length - 1]]}`,
    time: g.key === 'closed' ? 'Closed' : `${fmt(OPENING[g.days[0]][0])} – ${fmt(OPENING[g.days[0]][1])}`,
  }))
}
deriveHours()

// Replace contact details and hours with saved settings from the backend
export function applySettings(st) {
  if (!st) return
  const digits = (v) => String(v || '').replace(/\D/g, '')
  if (st.phone) { PHONE_DISPLAY = st.phone; PHONE_TEL = '+' + digits(st.phone) }
  if (st.whatsapp) { WHATSAPP_DISPLAY = st.whatsapp; WHATSAPP_NUMBER = digits(st.whatsapp) }
  if (st.email) EMAIL = st.email
  if (st.hours && typeof st.hours === 'object') { OPENING = st.hours; deriveHours() }
}

// Current open/closed state in Douala time (WAT, UTC+1)
export function openStatus(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Douala', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(now).map(p => [p.type, p.value])
  )
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday)
  const hour = Number(parts.hour) + Number(parts.minute) / 60
  const today = OPENING[day]
  if (today && hour >= today[0] && hour < today[1]) return { open: true, text: `Open now · until ${fmt(today[1])}` }
  if (today && hour < today[0]) return { open: false, text: `Closed · opens today at ${fmt(today[0])}` }
  for (let i = 1; i <= 7; i++) {
    const next = OPENING[(day + i) % 7]
    if (next) return { open: false, text: `Closed · opens ${i === 1 ? 'tomorrow' : DAY[(day + i) % 7]} at ${fmt(next[0])}` }
  }
  return { open: false, text: 'Closed' }
}

export const wa = (text = 'Hello CiGa Raw, I would like to book an appointment.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

export const NAV = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Barbering', path: '/barbing' },
  { label: 'VIP Suite', path: '/vip' },
  { label: 'Tattoo',    path: '/tattoo' },
  { label: 'Home Service', path: '/home-service' },
  { label: 'Gallery',   path: '/gallery' },
  { label: 'Book',      path: '/booking' },
]
