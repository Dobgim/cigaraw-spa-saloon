// Real CiGa Raw photos. Add new ones here and they show up in the gallery.

export const SHOP = {
  team1: '/images/shop/team-1.jpg',
  team2: '/images/shop/team-2.jpg',
}

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
