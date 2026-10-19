// Real CiGa Raw photos. These are the built-in defaults; when the backend is
// running, applyPhotos() replaces the gallery and tattoo lists with the admin's.

const s = (file) => `/images/shop/${file}.jpg`

export const SHOP = {
  team1:        s('team-1'),        // two clients posing, arched mirrors
  team2:        s('team-2'),
  frontNight:   s('front-night'),   // storefront sign lit up at night
  frontDay:     s('front-day'),
  mainFloor:    s('main-floor'),    // ground-floor barber stations
  floorFacials: s('floor-facials'), // staff doing face treatments on the main floor
  facial:       s('facial'),        // therapist giving a face treatment
  vipLounge:    s('vip-lounge'),    // upstairs VIP chairs, lounge and curtain
  vipChairs:    s('vip-chairs'),    // wider view of the VIP room
  vipEntrance:  s('vip-entrance'),  // VIP entrance with poster wall
}

// Salon photos shown in the gallery
export let SALON = [
  { src: SHOP.frontNight,   title: 'CiGa Raw at night',        desc: 'The storefront in Logpom, Douala.' },
  { src: SHOP.vipLounge,    title: 'The VIP room',             desc: 'Two chairs, a lounge corner and a curtained treatment space.' },
  { src: SHOP.facial,       title: 'Face treatment',           desc: 'One of our therapists at work.' },
  { src: SHOP.mainFloor,    title: 'The main floor',           desc: 'Barber stations on the ground floor.' },
  { src: SHOP.team1,        title: 'Fresh out of the chair',   desc: 'Clients on the CiGa Raw floor.' },
  { src: SHOP.vipEntrance,  title: 'Upstairs entrance',        desc: 'The way into the VIP spa.' },
  { src: SHOP.floorFacials, title: 'A busy afternoon',         desc: 'Face treatments on the main floor.' },
  { src: SHOP.vipChairs,    title: 'VIP spa, wide view',       desc: 'Wood panelling, red carpet, private chairs.' },
  { src: SHOP.team2,        title: 'Good day at the salon',    desc: 'Arched mirrors, black chairs and happy regulars.' },
  { src: SHOP.frontDay,     title: 'Our sign by day',          desc: 'Every service we offer, right above the door.' },
]

export const LOGO = '/logo.png'

const t = (file) => `/images/tattoo/${file}.jpg`

// price in FCFA for that exact design
export let TATTOOS = [
  { src: t('jesus-rosary-realism'),      title: 'Jesus with rosary',        style: 'Black & grey realism', price: 500_000 },
  { src: t('golden-crown-back'),         title: 'Golden crown of thorns',   style: 'Colour realism, back piece', price: 1_500_000 },
  { src: t('praying-jesus-dove-sleeve'), title: 'Praying Christ & dove',    style: 'Half sleeve', price: 500_000 },
  { src: t('one-life-one-chance'),       title: 'One Life One Chance',      style: 'Colour & lettering', price: 300_000 },
  { src: t('jesus-dove-sleeve'),         title: 'Christ with open hands',   style: 'Half sleeve', price: 200_000 },
  { src: t('mary-and-jesus'),            title: 'Mary & Jesus',             style: 'Black & grey', price: 500_000 },
  { src: t('jesus-chest-sketch'),        title: 'Sketch-style portrait',    style: 'Chest, red accents', price: 200_000 },
  { src: t('praying-jesus-back'),        title: 'Christ in prayer',         style: 'Colour back piece', price: 1_000_000 },
  { src: t('calvary-forearm'),           title: 'Calvary',                  style: 'Forearm, blue wash', price: 300_000 },
  { src: t('it-is-finished'),            title: 'It is finished',           style: 'Forearm, red accents', price: 200_000 },
  { src: t('jesus-forearm'),             title: 'Crown of thorns',          style: 'Fine shading, forearm', price: 200_000 },
  { src: t('jesus-shoulder-portrait'),   title: 'Shoulder portrait',        style: 'Colour, upper arm', price: 500_000 },
  { src: t('jesus-full-back'),           title: 'Full back',                style: 'Black & grey', price: 2_000_000 },
  { src: t('crucifix-script'),           title: 'Crucifix & name',          style: 'Blackwork, script', price: 100_000 },
  { src: t('crucifix-wrist'),            title: 'Small crucifix',           style: 'Blackwork, forearm', price: 100_000 },
  { src: t('praying-hands-rosary'),      title: 'Praying hands & rosary',   style: 'Black & grey', price: 200_000 },
]

// Built-in tattoo photos, kept for page headers even if the admin removes them from the portfolio
const BUILT_IN_TATTOOS = TATTOOS

// Look up a built-in tattoo photo by its file name
export const tattoo = (file) => BUILT_IN_TATTOOS.find(x => x.src.endsWith(`/${file}.jpg`)).src

// Replace the gallery and tattoo lists with saved content from the backend
export function applyPhotos(c) {
  if (Array.isArray(c?.salon)) SALON = c.salon
  if (Array.isArray(c?.tattoos)) TATTOOS = c.tattoos.map(x => ({ ...x, price: Number(x.price) || 0 }))
}

// 1500000 -> "1.5M", 500000 -> "500K"
export const shortPrice = (n) => n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${+(n / 1000).toFixed(1)}K` : `${n}`

// 1500000 -> "1,500,000"
export const fullPrice = (n) => n.toLocaleString('en-US')
