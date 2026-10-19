// The salon's price list (FCFA). These are the built-in defaults; when the
// backend is running, applyMenu() replaces them with what the admin saved.

export let CLASSIC = [
  { name: 'Normal shaving',                 price: '2,000' },
  { name: 'Shaving & black',                price: '3,000 – 5,000' },
  { name: 'Shaving, black & treatment',     price: '5,000 – 10,000' },
  { name: 'Shaving & sporting wave',        price: '3,000 – 5,000' },
  { name: 'Shaving, sporting wave & black', price: '5,000 – 10,000' },
]

export let FACE_BODY = [
  { name: 'Face scrub',              price: '3,000 – 5,000' },
  { name: 'Face scrub & mask',       price: '5,000 – 8,000' },
  { name: 'Face treatment',          price: '10,000 – 25,000', note: 'Depends on skin type and products used' },
  { name: 'Classic pedicure',        price: '5,000 – 10,000' },
  { name: 'Classic manicure',        price: '3,000 – 5,000' },
  { name: 'Body scrub',              price: '20,000 – 35,000' },
  { name: 'Full body massage (1 hour)', price: '20,000 – 30,000' },
  { name: 'Epilation',               price: '10,000 – 20,000' },
  { name: 'Dreadlock renewal',       price: '10,000 – 30,000' },
]

export let VIP = [
  { name: 'VIP reservation fee',    price: '10,000' },
  { name: 'VIP shaving',            price: '15,000' },
  { name: 'VIP shaving with scrub', price: '25,000' },
  { name: 'VIP facial',             price: '15,000 – 30,000' },
  { name: 'VIP pedicure',           price: '10,000 – 15,000' },
  { name: 'VIP manicure',           price: '5,000 – 10,000' },
]

export let TEETH_WHITENING = [
  { session: 'First session',  price: '50,000' },
  { session: 'Second session', price: '25,000' },
  { session: 'Third session',  price: 'Free' },
]

// On the shop sign but not on the price list yet
export let ON_REQUEST = [
  { name: 'Braiding',          price: 'On request' },
  { name: 'Hair installation', price: 'On request' },
  { name: 'Hammam',            price: 'On request' },
  { name: 'Nails',             price: 'On request' },
]

export let MENU = []
export let HOME_SERVICE = []

// Services we can bring to a client's home, by name. Prices come from the lists above;
// the travel fee depends on the address and is confirmed on WhatsApp.
const HOME_GROUPS = [
  { group: 'Grooming',     names: ['Normal shaving', 'Shaving & black', 'Shaving & sporting wave'] },
  { group: 'Face',         names: ['Face scrub', 'Face scrub & mask', 'Face treatment'] },
  { group: 'Body',         names: ['Full body massage (1 hour)', 'Body scrub', 'Epilation'] },
  { group: 'Hands & feet', names: ['Classic manicure', 'Classic pedicure', 'Nails'] },
  { group: 'Hair',         names: ['Dreadlock renewal', 'Braiding', 'Hair installation'] },
]

// Rebuild the lists that are derived from the price lists
function derive() {
  const whitening = TEETH_WHITENING.find(t => /\d/.test(t.price))
  MENU = [
    { group: 'Classic',      items: CLASSIC },
    { group: 'Face & body',  items: FACE_BODY },
    { group: 'Hair & nails', items: ON_REQUEST },
    { group: 'VIP',          items: [...VIP, ...(TEETH_WHITENING.length ? [{
      name: 'VIP teeth whitening',
      price: whitening ? `from ${whitening.price}` : 'On request',
      note: `${TEETH_WHITENING.length} sessions: ${TEETH_WHITENING.map(t => t.price).join(' · ')}`,
    }] : [])] },
  ]
  const all = [...CLASSIC, ...FACE_BODY, ...ON_REQUEST]
  HOME_SERVICE = HOME_GROUPS
    .map(g => ({ group: g.group, items: g.names.map(n => all.find(x => x.name === n)).filter(Boolean) }))
    .filter(g => g.items.length)
}
derive()

// Replace the price lists with saved content from the backend
export function applyMenu(m) {
  if (!m) return
  if (Array.isArray(m.classic)) CLASSIC = m.classic
  if (Array.isArray(m.faceBody)) FACE_BODY = m.faceBody
  if (Array.isArray(m.vip)) VIP = m.vip
  if (Array.isArray(m.onRequest)) ON_REQUEST = m.onRequest
  if (Array.isArray(m.teethWhitening)) TEETH_WHITENING = m.teethWhitening
  derive()
}
