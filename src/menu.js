// The salon's real price list (FCFA). Every page reads prices from here.

export const CLASSIC = [
  { name: 'Normal shaving',                 price: '2,000' },
  { name: 'Shaving & black',                price: '3,000 – 5,000' },
  { name: 'Shaving, black & treatment',     price: '5,000 – 10,000' },
  { name: 'Shaving & sporting wave',        price: '3,000 – 5,000' },
  { name: 'Shaving, sporting wave & black', price: '5,000 – 10,000' },
]

export const FACE_BODY = [
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

export const VIP = [
  { name: 'VIP reservation fee',    price: '10,000' },
  { name: 'VIP shaving',            price: '15,000' },
  { name: 'VIP shaving with scrub', price: '25,000' },
  { name: 'VIP facial',             price: '15,000 – 30,000' },
  { name: 'VIP pedicure',           price: '10,000 – 15,000' },
  { name: 'VIP manicure',           price: '5,000 – 10,000' },
]

export const TEETH_WHITENING = [
  { session: 'First session',  price: '50,000' },
  { session: 'Second session', price: '25,000' },
  { session: 'Third session',  price: 'Free' },
]

// On the shop sign but not on the price list yet
export const ON_REQUEST = [
  { name: 'Braiding',          price: 'On request' },
  { name: 'Hair installation', price: 'On request' },
  { name: 'Hammam',            price: 'On request' },
  { name: 'Nails',             price: 'On request' },
]

export const MENU = [
  { group: 'Classic',     items: CLASSIC },
  { group: 'Face & body', items: FACE_BODY },
  { group: 'Hair & nails', items: ON_REQUEST },
  { group: 'VIP',         items: [...VIP, { name: 'VIP teeth whitening', price: 'from 50,000', note: '3 sessions: 50,000 · 25,000 · third free' }] },
]

// Services we can bring to a client's home. Prices are the salon prices;
// the travel fee depends on the address and is confirmed on WhatsApp.
const pick = (list, names) => names.map(n => list.find(x => x.name === n))

export const HOME_SERVICE = [
  { group: 'Grooming',   items: pick(CLASSIC, ['Normal shaving', 'Shaving & black', 'Shaving & sporting wave']) },
  { group: 'Face',       items: pick(FACE_BODY, ['Face scrub', 'Face scrub & mask', 'Face treatment']) },
  { group: 'Body',       items: pick(FACE_BODY, ['Full body massage (1 hour)', 'Body scrub', 'Epilation']) },
  { group: 'Hands & feet', items: pick(FACE_BODY, ['Classic manicure', 'Classic pedicure']).concat(pick(ON_REQUEST, ['Nails'])) },
  { group: 'Hair',       items: [...pick(FACE_BODY, ['Dreadlock renewal']), ...pick(ON_REQUEST, ['Braiding', 'Hair installation'])] },
]
