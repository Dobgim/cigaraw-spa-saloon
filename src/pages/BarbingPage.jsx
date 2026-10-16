import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOP } from '../photos'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { CLASSIC, FACE_BODY } from '../menu'
import { ArrowDot, easeOut, ImageReveal, Label, Lines, Marquee, Reveal } from '../components/motion'

const cuts = [...CLASSIC, FACE_BODY.find(f => f.name === 'Dreadlock renewal')]

// Each style looks for its own photo in public/images/styles/; until one is added it
// falls back to a shop photo
const styles = [
  { name: 'Skin fade',     slug: 'skin-fade',     tag: 'Most booked',       fallback: SHOP.mainFloor, pos: 'center 55%', desc: 'Down to bare skin at the base for maximum contrast with the top.' },
  { name: 'Afro taper',    slug: 'afro-taper',    tag: 'Bamenda favourite', fallback: SHOP.team1, pos: 'center 18%',    desc: 'Full volume on top, clean sideburns and neckline for a sleek outline.' },
  { name: 'Burst fade',    slug: 'burst-fade',    tag: 'Trending',          fallback: SHOP.floorFacials, pos: 'center 55%', desc: 'A curved fade around the ear that shows off curls or sponge texture.' },
  { name: 'Low drop fade', slug: 'low-drop-fade', tag: 'Office-ready',      fallback: SHOP.team2, pos: 'center 22%', desc: 'Dips lower behind the crown. Subtle enough for any boardroom.' },
  { name: '360 waves',     slug: '360-waves',     tag: 'Signature',         fallback: SHOP.vipLounge, pos: '30% 60%', desc: 'Deep wave definition, surgical temple line-up, razor clean-up.' },
  { name: 'Hair art',      slug: 'hair-art',      tag: 'Creative',          fallback: SHOP.vipChairs, pos: '45% 60%',    desc: 'Geometric or tribal lines cut straight into the fade by hand.' },
]

const hygiene = [
  { title: 'Autoclave + UV', desc: 'Every guard, shear and comb is sterilised between clients.' },
  { title: 'Single-use blades', desc: 'Factory-sealed razor blades, opened in front of you.' },
  { title: 'Fresh cape, clean chair', desc: 'A clean cape for every client, chairs wiped down each time.' },
  { title: 'Skin-safe products', desc: 'Alcohol-free balms, organic shea, tea tree scalp tonic.' },
]

// Drag-to-scroll row of style cards
function StyleRail() {
  const outer = useRef(null)
  const inner = useRef(null)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const measure = () => setLeft(Math.min(0, outer.current.offsetWidth - inner.current.scrollWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div ref={outer} className="overflow-hidden cursor-grab active:cursor-grabbing">
      <motion.div ref={inner} drag="x" dragConstraints={{ left, right: 0 }} dragElastic={0.08} className="flex gap-5 w-max">
        {styles.map((s, i) => (
          <motion.article
            key={s.name}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOut, delay: i * 0.07 }}
            className="group w-[78vw] sm:w-[360px] shrink-0 bg-paper text-ink select-none rounded-[2px] overflow-hidden"
          >
            <div className="relative h-[240px] overflow-hidden">
              <img
                src={`/images/styles/${s.slug}.jpg`}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = s.fallback }}
                alt={`${s.name} haircut`}
                draggable="false"
                loading="lazy"
                style={{ objectPosition: s.pos }}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 inset-x-4 flex justify-between label">
                <span className="bg-paper/90 text-ink px-2 py-1 rounded-full">0{i + 1}</span>
                <span className="bg-ember text-paper px-2.5 py-1 rounded-full">{s.tag}</span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="display text-4xl lg:text-5xl">{s.name}</h3>
              <p className="text-ink-600 text-lg mt-3">{s.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

export default function BarbingPage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="03"
        kicker="Barbering"
        lines={[<>Clean lines.</>, <><span className="accent text-ember">No</span> shortcuts.</>]}
        intro="Shaving, sporting waves, colour and dreadlock renewal — by barbers who know Afro hair inside out."
        image={SHOP.vipChairs}
        imageAlt="Barber chairs in the CiGa Raw salon"
        aside={<Link to="/booking?service=Normal%20shaving" className="btn-ember group !pr-2">Book a chair <ArrowDot className="bg-paper/15" /></Link>}
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Label num="A" className="text-ink-500 mb-6">The approach</Label>
            <h2 className="h2 mb-8"><Lines lines={[<>Every head is</>, <span key="x" className="accent text-ember">different.</span>]} /></h2>
            <Reveal as="p" className="text-xl text-ink-700 leading-relaxed max-w-xl">
              A good cut starts before the clippers come out. We look at your head shape, how your hair grows and what you do all day — then we cut for that.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-xl text-ink-700 leading-relaxed max-w-xl mt-6">
              Boardroom fade, full Afro taper or a slow straight-razor shave on a Saturday morning: same care, every chair.
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-4">
            <ImageReveal src={SHOP.mainFloor} alt="Barber stations on the CiGa Raw main floor" className="aspect-[3/4] mt-16" />
            <ImageReveal src={SHOP.floorFacials} alt="Staff at work on the main floor" className="aspect-[3/4]" delay={0.15} />
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Label num="B" className="text-paper/50 mb-6">Price list</Label>
            <h2 className="h2"><Lines lines={[<>The chair</>, <span key="y" className="accent text-ember">menu.</span>]} /></h2>
            <p className="text-paper/60 text-lg mt-6 max-w-xs">Prices in FCFA. Ranges depend on your hair and the products used — we confirm before we start.</p>
          </div>
          <ul className="lg:col-span-8 border-t border-paper/15">
            {cuts.map((c, i) => (
              <Reveal as="li" key={c.name} delay={(i % 4) * 0.04}>
                <Link to={`/booking?service=${encodeURIComponent(c.name)}`} className="menu-row group">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl lg:text-3xl font-medium tracking-tight transition-colors group-hover:text-ember">{c.name}</span>
                      <span className="leader hidden sm:block" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl lg:text-3xl font-medium tabular-nums whitespace-nowrap">{c.price}</span>
                    <span className="block label text-paper/40 mt-1">FCFA</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ember text-ink py-24 lg:py-32 overflow-hidden">
        <div className="wrap flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Label num="C" className="text-ink/60 mb-6">Most asked-for</Label>
            <h2 className="h2">Six styles we cut daily.</h2>
          </div>
          <p className="label text-ink/60">← drag →</p>
        </div>
        <div className="pl-5 sm:pl-8 lg:pl-12">
          <StyleRail />
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <Label num="D" className="text-ink-500 mb-6">Hygiene</Label>
          <h2 className="h2 max-w-4xl mb-16"><Lines lines={[<>Sterile isn&rsquo;t a feature.</>, <span key="z" className="accent text-ember">It&rsquo;s the minimum.</span>]} /></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-ink/15">
            {hygiene.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08} className={`pt-8 pb-4 pr-6 ${i ? 'lg:border-l lg:pl-6 border-ink/15' : ''}`}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-ember mb-8" aria-hidden="true">
                  <motion.path
                    d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                </svg>
                <h3 className="text-2xl font-medium tracking-tight">{h.title}</h3>
                <p className="text-ink-600 mt-2">{h.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-ink text-paper py-8 border-b border-paper/10">
        <Marquee reverse>
          {['Fresh cut', 'Book ahead', 'Walk-ins welcome', 'Commercial Ave'].map(t => (
            <span key={t} className="display text-5xl lg:text-7xl px-8 flex items-center gap-8">
              {t} <span className="accent text-ember">&</span>
            </span>
          ))}
        </Marquee>
      </div>
    </>
  )
}
