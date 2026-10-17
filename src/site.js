// Contact details and navigation shared across the site

// Salon line from the Google Maps listing; WhatsApp stays on the number the owner set
export const PHONE_DISPLAY = '+237 671 19 08 78'
export const PHONE_TEL = '+237671190878'
export const WHATSAPP_DISPLAY = '+237 679 170 410'
export const EMAIL = 'cigaraw237@gmail.com'
export const ADDRESS = ['Between Tradex Rhône Poulenc', '& Collège Charles de Gaulle', 'Logpom, Douala, Cameroon']
export const ADDRESS_SHORT = 'Logpom, Douala'
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('CIGA RAW SALON AND SPA, 3QP6+C5 Logpom, Douala')
// Plus code 3QP6+C5 Douala (6FPF3QP6+C5), on Avenue de Logpom
export const SALON_COORDS = [4.08606, 9.76044]
export const GOOGLE_RATING = { score: '5.0', count: 2 }

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
  { label: 'Home Service', path: '/home-service' },
  { label: 'Gallery',   path: '/gallery' },
  { label: 'Book',      path: '/booking' },
]
