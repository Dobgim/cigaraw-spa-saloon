// Real CiGa Raw photos. Add new ones here and they show up in the gallery.

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
export const SALON = [
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

export const TATTOOS = [
  { src: t('jesus-rosary-realism'),      title: 'Jesus with rosary',        style: 'Black & grey realism' },
  { src: t('golden-crown-back'),         title: 'Golden crown of thorns',   style: 'Colour realism, back piece' },
  { src: t('praying-jesus-dove-sleeve'), title: 'Praying Christ & dove',    style: 'Half sleeve' },
  { src: t('one-life-one-chance'),       title: 'One Life One Chance',      style: 'Colour & lettering' },
  { src: t('jesus-dove-sleeve'),         title: 'Christ with open hands',   style: 'Half sleeve' },
  { src: t('mary-and-jesus'),            title: 'Mary & Jesus',             style: 'Black & grey' },
  { src: t('jesus-chest-sketch'),        title: 'Sketch-style portrait',    style: 'Chest, red accents' },
  { src: t('praying-jesus-back'),        title: 'Christ in prayer',         style: 'Colour back piece' },
  { src: t('calvary-forearm'),           title: 'Calvary',                  style: 'Forearm, blue wash' },
  { src: t('it-is-finished'),            title: 'It is finished',           style: 'Forearm, red accents' },
  { src: t('jesus-forearm'),             title: 'Crown of thorns',          style: 'Fine shading, forearm' },
  { src: t('jesus-shoulder-portrait'),   title: 'Shoulder portrait',        style: 'Colour, upper arm' },
  { src: t('jesus-full-back'),           title: 'Full back',                style: 'Black & grey' },
  { src: t('crucifix-script'),           title: 'Crucifix & name',          style: 'Blackwork, script' },
  { src: t('crucifix-wrist'),            title: 'Small crucifix',           style: 'Blackwork, forearm' },
  { src: t('praying-hands-rosary'),      title: 'Praying hands & rosary',   style: 'Black & grey' },
]

// Look up a tattoo photo by its file name
export const tattoo = (file) => TATTOOS.find(x => x.src.endsWith(`/${file}.jpg`)).src
