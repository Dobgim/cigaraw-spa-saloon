import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { ArrowDot, ease, easeOut, Label, Lines, Reveal } from '../components/motion'

const items = [
  { id: 9, title: 'Fresh out of the chair', category: 'Barbering', image: '/images/team_shop.jpg', desc: 'Clients and crew on the CiGa Raw floor.', span: 'lg:col-span-5 aspect-[3/4]' },
  { id: 1, title: 'Mid skin fade & groomed beard', category: 'Barbering', image: '/images/gallery_haircut.jpg', desc: 'Crisp hairline, natural beard shape, gradual skin blend.', span: 'lg:col-span-7 aspect-[4/3] lg:aspect-auto' },
  { id: 2, title: 'Saturday morning on the floor', category: 'Barbering', image: '/images/hero_barber.jpg', desc: 'Clipper work in the main shop on Commercial Avenue.', span: 'lg:col-span-8 aspect-[16/10]' },
  { id: 3, title: 'Fade detailing',                category: 'Barbering', image: '/images/barber_service.jpg', desc: 'Close focus on the transition and the temple line.', span: 'lg:col-span-4 aspect-[3/4] lg:aspect-auto' },
  { id: 4, title: 'Facial massage',                category: 'Spa', image: '/images/spa_service.jpg', desc: 'Balancing facial acupressure in the spa room.', span: 'lg:col-span-6 aspect-[4/3]' },
  { id: 5, title: 'The stone room',                category: 'Spa', image: '/images/spa_suite.jpg', desc: 'Stone walls, candlelight and two massage tables.', span: 'lg:col-span-6 aspect-[4/3]' },
  { id: 7, title: 'Forearm tribal, session one',   category: 'Tattoo', image: '/images/tattoo_section.jpg', desc: 'Sterile needlework and custom Grassfields linework.', span: 'lg:col-span-5 aspect-[3/4]' },
  { id: 8, title: 'Blackwork detail',              category: 'Tattoo', image: '/images/tattoo_art.jpg', desc: 'High-density pigment in Cameroonian geometric patterns.', span: 'lg:col-span-7 aspect-[4/3] lg:aspect-auto' },
  { id: 6, title: 'The VIP Suite',                 category: 'VIP', image: '/images/vip_section.jpg', desc: 'Single-client lounge with leather chairs and a private bar.', span: 'lg:col-span-12 aspect-[4/3] lg:aspect-[21/9]' },
]

const categories = ['All', 'Barbering', 'Spa', 'VIP', 'Tattoo']

const reviews = [
  { name: 'Nchinda Bertrand', role: 'Business owner', service: 'Skin fade', text: 'Nothing in Bamenda touches CiGa Raw. Attention to detail, clean tools, skilled hands. I won’t sit in any other chair.' },
  { name: 'Tabi Godwill', role: 'Creative director', service: 'Beard sculpt', text: 'Proper technique, clean tools, and they take their time. I’ve brought three friends. None of us have looked back.' },
  { name: 'Fru Valerie', role: 'Entrepreneur', service: 'Deep tissue', text: 'I came in stressed and left renewed. The therapist understood exactly what my body needed.' },
  { name: 'Che Kingsley', role: 'Civil engineer', service: 'VIP Suite', text: 'Worth every franc. A haircut in total quiet with an espresso and no crowd made my Saturday.' },
]

export default function GalleryPage({ ready }) {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = cat === 'All' ? items : items.filter(i => i.category === cat)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <PageHero
        ready={ready}
        index="06"
        kicker="Gallery"
        lines={[<>Real chairs,</>, <><span className="accent text-ember">real people.</span></>]}
        intro="No stock photos of strangers. This is the shop, the spa, the suite and the studio — and the work that comes out of them."
      />

      <section className="bg-paper pt-10 pb-24 lg:pb-36">
        <div className="wrap">
          <LayoutGroup>
            <div className="flex items-center justify-between gap-4 mb-10">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`relative isolate chip whitespace-nowrap ${cat === c ? 'text-paper border-ink' : 'border-ink/20 hover:border-ink'}`}
                  >
                    {cat === c && <motion.span layoutId="gchip" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    {c}
                  </button>
                ))}
              </div>
              <span className="label text-ink-500 hidden sm:block tabular-nums">{String(list.length).padStart(2, '0')} photos</span>
            </div>

            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
              <AnimatePresence mode="popLayout">
                {list.map((it, i) => (
                  <motion.button
                    layout
                    key={it.id}
                    onClick={() => setOpen(it)}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.6, ease: easeOut, delay: i * 0.04 }}
                    className={`group relative overflow-hidden text-left ${cat === 'All' ? it.span : 'lg:col-span-6 aspect-[4/3]'}`}
                  >
                    <motion.img layoutId={`img-${it.id}`} src={it.image} alt={it.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute left-5 right-5 bottom-5 flex items-end justify-between text-paper translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span>
                        <span className="label text-paper/70 block mb-1">{it.category}</span>
                        <span className="text-xl lg:text-2xl font-medium tracking-tight">{it.title}</span>
                      </span>
                      <span className="w-10 h-10 rounded-full bg-paper text-ink grid place-items-center scale-0 group-hover:scale-100 transition-transform duration-500">
                        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" /></svg>
                      </span>
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {open && (
                <motion.div
                  className="fixed inset-0 z-[1000] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-5 lg:p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={open.title}
                >
                  <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 items-end" onClick={e => e.stopPropagation()}>
                    <div className="lg:col-span-8 relative aspect-[4/3] overflow-hidden">
                      <motion.img layoutId={`img-${open.id}`} src={open.image} alt={open.title} className="absolute inset-0 w-full h-full object-cover" transition={{ duration: 0.7, ease }} />
                    </div>
                    <motion.div
                      className="lg:col-span-4 text-paper"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="label text-ember">{open.category}</p>
                      <h3 className="display text-4xl lg:text-5xl mt-3">{open.title}</h3>
                      <p className="text-paper/60 text-lg mt-4">{open.desc}</p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/booking" className="btn-ember">Book this look</Link>
                        <button onClick={() => setOpen(null)} className="btn-line-light">Close</button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <Label num="A" className="text-ink-500 mb-6">What clients say</Label>
          <h2 className="h2 mb-16"><Lines lines={[<>In their</>, <span key="a" className="accent text-ember">own words.</span>]} /></h2>
          <div className="grid md:grid-cols-2 gap-x-16">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 0.1} className="border-t border-ink/15 py-10">
                <p className="font-serif text-3xl lg:text-4xl leading-[1.15]">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-6 flex flex-wrap gap-x-3 text-ink-600">
                  <span className="text-ink font-medium">{r.name}</span>
                  <span>{r.role}</span>
                  <span className="label text-ember self-center">· {r.service}</span>
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link to="/booking" className="btn-ink group !pr-2">Book your appointment <ArrowDot className="bg-paper/15" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
