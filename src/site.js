// Contact details and navigation shared across the site

export const PHONE_DISPLAY = '+237 679 170 410'
export const PHONE_TEL = '+237679170410'
export const EMAIL = 'bookings@cigaraw.com'
export const ADDRESS = ['Commercial Avenue', 'Bamenda, North West Region', 'Cameroon']

export const HOURS = [
  { days: 'Mon – Sat', time: '8:00 – 19:00' },
  { days: 'Sunday',    time: '10:00 – 16:00' },
]

export const wa = (text = 'Hello CiGa Raw, I would like to book an appointment.') =>
  `https://wa.me/237679170410?text=${encodeURIComponent(text)}`

export const NAV = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Barbering', path: '/barbing' },
  { label: 'VIP Suite', path: '/vip' },
  { label: 'Tattoo',    path: '/tattoo' },
  { label: 'Gallery',   path: '/gallery' },
  { label: 'Book',      path: '/booking' },
]
