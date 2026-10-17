import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOP, TATTOOS, tattoo } from '../photos'
import { PriceTag } from '../components/TattooCard'
import LocationMap from '../components/LocationMap'
import FAQ from '../components/FAQ'
import OpenStatus from '../components/OpenStatus'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { Arrow, ArrowDot, Count, ease, easeOut, ImageReveal, Label, Lines, Magnetic, Marquee, Reveal, SpinBadge } from '../components/motion'
import { ADDRESS, GOOGLE_RATING, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '../site'
import { CLASSIC, FACE_BODY, VIP } from '../menu'

const disciplines = [
  { num: '01', title: 'Barbering', note: 'Shaving, sporting waves, black & treatment', image: SHOP.mainFloor, path: '/barbing' },
  { num: '02', title: 'Spa',       note: 'Face treatments, scrubs, massage, mani-pedi', image: SHOP.facial, path: '/services' },
  { num: '03', title: 'VIP Suite', note: 'VIP shaving, facials & teeth whitening',        image: SHOP.vipLounge, path: '/vip' },
  { num: '04', title: 'Tattoo',    note: 'Realism, blackwork, lettering', image: tattoo('golden-crown-back'), path: '/tattoo' },
]

const shortMenu = [
  { ...CLASSIC[0], group: 'Classic' },
  { ...CLASSIC[3], group: 'Classic' },
  { ...FACE_BODY[1], group: 'Face & body' },
  { ...FACE_BODY[6], group: 'Face & body' },
  { ...FACE_BODY[8], group: 'Face & body' },
  { ...VIP[1], group: 'VIP' },
]

// Recent tattoo work for the photo strip
const day = ['jesus-rosary-realism', 'golden-crown-back', 'one-life-one-chance', 'mary-and-jesus', 'it-is-finished', 'praying-jesus-dove-sleeve']
  .map(f => TATTOOS.find(x => x.src.endsWith(`/${f}.jpg`)))


function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const headY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <section ref={ref} className="relative bg-ink text-paper min-h-[100svh] pt-28 lg:pt-32 pb-14 overflow-hidden flex flex-col">
      {/* Background photo: the CiGa Raw floor */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 lg:left-auto lg:w-[64%]"
        initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
      >
        <motion.img
          src={SHOP.team1}
          alt=""
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] object-cover object-[center_18%]"
          initial={{ scale: 1.25 }}
          animate={ready ? { scale: 1 } : {}}
          transition={{ duration: 2.4, ease: easeOut, delay: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40 lg:bg-gradient-to-r lg:from-ink lg:from-[8%] lg:via-ink/40 lg:via-[45%] lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <div className="wrap relative flex-1 flex flex-col">
        <motion.div
          className="flex justify-between label text-paper/60 mb-10"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>Salon · Spa · Ink</span>
          <span>Logpom<span className="hidden sm:inline">, Douala</span></span>
        </motion.div>

        <motion.h1 style={{ y: headY }} className="display text-[16vw] sm:text-[12vw] lg:text-[9.6vw] max-w-[11ch]">
          <Lines
            when={ready}
            delay={0.35}
            lines={[
              <>Sharp cuts,</>,
              <><span className="accent text-ember">slow</span> rituals,</>,
              <>honest ink.</>,
            ]}
          />
        </motion.h1>

        <motion.div
          className="absolute right-5 sm:right-8 lg:right-12 bottom-48 hidden sm:block"
          initial={{ scale: 0, rotate: -120 }}
          animate={ready ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1.4 }}
        >
          <Link to="/booking" aria-label="Book a chair" className="block group">
            <SpinBadge className="w-32 h-32 lg:w-36 lg:h-36 text-ink bg-paper rounded-full">
              <span className="w-12 h-12 rounded-full bg-ember text-paper grid place-items-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                <Arrow className="w-5 h-5" />
              </span>
            </SpinBadge>
          </Link>
        </motion.div>

        <motion.div
          className="mt-auto pt-14 grid lg:grid-cols-12 gap-10 items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOut, delay: 1 }}
        >
          <div className="lg:col-span-5">
            <p className="text-lg lg:text-xl leading-snug text-paper/75 max-w-md">
              A beauty, grooming and wellness salon in Logpom, Douala. Book a chair, take your time, leave sharper than you came in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link to="/booking" className="btn-ember group !pr-2">
                  Book an appointment <ArrowDot className="bg-paper/15" />
                </Link>
              </Magnetic>
              <Link to="/services" className="btn-line-light">See the menu</Link>
            </div>
          </div>

          <dl className="lg:col-span-6 lg:col-start-7 grid grid-cols-3 border-t border-paper/20">
            {[
              { n: 12,   s: '',  l: 'Services' },
              { n: 4,    s: '',  l: 'Departments' },
              { n: 5.0,  s: '★', l: 'Google rating', raw: true },
            ].map((x) => (
              <div key={x.l} className="pt-5 pr-4">
                <dd className="display text-4xl sm:text-5xl">
                  {x.raw ? <>{x.n.toFixed(1)}<span className="text-ember text-3xl align-top">{x.s}</span></> : <Count to={x.n} suffix={x.s} when={ready} />}
                </dd>
                <dt className="label text-paper/55 mt-2">{x.l}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}

// Paragraph whose words darken one by one as it scrolls through view
function ScrollWords({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{children}</motion.span>
}

// Big hover list; a photo trails the pointer on desktop
function Disciplines() {
  const [active, setActive] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })
  const listRef = useRef(null)

  const onMove = (e) => {
    const r = listRef.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="bg-ink text-paper py-24 lg:py-36">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <Label num="02" className="text-paper/50 mb-6">What we do</Label>
            <h2 className="h2">
              <Lines lines={[<>Four rooms,</>, <>one <span className="accent text-ember">standard.</span></>]} />
            </h2>
          </div>
          <Reveal className="max-w-sm text-paper/60 text-lg">
            Every department runs like its own studio, with its own specialists. Pick one to see the full menu.
          </Reveal>
        </div>

        <ul
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="relative border-t border-paper/15"
        >
          {disciplines.map((d, i) => (
            <Reveal as="li" key={d.num} delay={i * 0.06} className="border-b border-paper/15">
              <Link
                to={d.path}
                onMouseEnter={() => setActive(i)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-6 lg:py-8"
              >
                <span className="label text-paper/40 w-8">{d.num}</span>
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-8">
                  <span className={`display text-5xl sm:text-7xl lg:text-8xl transition-all duration-500 group-hover:translate-x-3 ${
                    active !== null && active !== i ? 'text-paper/25' : 'text-paper'
                  }`}>
                    {d.title}
                  </span>
                  <span className="text-paper/50 lg:text-lg">{d.note}</span>
                </div>
                <img src={d.image} alt="" className="w-16 h-20 object-cover lg:hidden" loading="lazy" />
                <ArrowDot className="hidden lg:grid border border-paper/25 w-14 h-14 transition-colors duration-500 group-hover:bg-ember group-hover:border-ember" />
              </Link>
            </Reveal>
          ))}

          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className="hidden lg:block pointer-events-none absolute top-0 left-0 z-10 w-[300px] h-[380px] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="w-full h-full overflow-hidden -ml-[150px] -mt-[190px]"
              animate={{ scale: active !== null ? 1 : 0, rotate: active !== null ? -4 : 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <motion.div
                className="w-full"
                animate={{ y: `${-(active ?? 0) * (100 / disciplines.length)}%` }}
                transition={{ duration: 0.6, ease }}
              >
                {disciplines.map(d => (
                  <img key={d.num} src={d.image} alt="" className="w-[300px] h-[380px] object-cover" />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </ul>
      </div>
    </section>
  )
}

// Photo strip that drifts sideways as the section scrolls past (no pinning)
function DayStrip() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0.15, 0.85], [0, -distance])
  const bar = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%'])

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section ref={ref} className="relative bg-bone py-20 lg:py-28 overflow-hidden">
      <div>
        <div className="wrap flex items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <Label num="03" className="text-ink-500 mb-4">Recent ink</Label>
            <h2 className="h2">Straight from the studio.</h2>
          </div>
          <div className="hidden sm:block w-48 h-px bg-ink/15 relative">
            <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-ember h-[2px] -top-px" />
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-start gap-5 lg:gap-6 pl-5 sm:pl-8 lg:pl-12 min-[1440px]:pl-[calc((100vw-1440px)/2+3rem)] pr-[6vw] w-max"
        >
          {day.map((d, i) => (
            <figure key={d.src} className={`shrink-0 ${i % 2 ? 'mt-10' : ''}`}>
              <Link to="/tattoo" className="relative block overflow-hidden aspect-[3/4] h-[300px] lg:h-[min(44vh,400px)]">
                <img src={d.src} alt={d.title} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
                <PriceTag price={d.price} className="absolute top-3 left-3" />
              </Link>
              <figcaption className="mt-4 flex gap-4 w-0 min-w-full">
                <span className="text-ink font-medium">{d.title}</span>
                <span className="label text-ink-500 pt-1">{d.style}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ShortMenu() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="wrap grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Label num="04" className="text-ink-500 mb-6">The short menu</Label>
          <h2 className="h2">
            <Lines lines={[<>Fair prices,</>, <span key="a" className="accent text-ember">written down.</span>]} />
          </h2>
          <Reveal className="mt-6 text-ink-600 text-lg max-w-sm">
            All prices in FCFA. No surprises at the till. Walk-ins welcome, bookings go first.
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Link to="/services" className="btn-line group !pr-2">Full menu <ArrowDot className="bg-ink/5" /></Link>
          </Reveal>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6 border-t border-ink/15">
          {shortMenu.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.05} className="menu-row group">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight transition-colors group-hover:text-ember">{m.name}</span>
                <span className="leader hidden sm:block" />
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl lg:text-3xl font-medium tabular-nums whitespace-nowrap">{m.price}</span>
                <span className="block label text-ink-500 mt-1">{m.group} · FCFA</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Real Google Maps rating and review
function Reviews() {
  return (
    <section className="bg-ember text-ink py-24 lg:py-32 overflow-hidden">
      <div className="wrap grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-4">
          <Label num="05" className="text-ink/60 mb-8">On Google</Label>
          <p className="display text-[9rem] lg:text-[12rem] leading-[0.8]">
            <Count to={5} suffix=".0" />
          </p>
          <div className="flex gap-1 mt-4 text-2xl" aria-label={`${GOOGLE_RATING.score} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.08 }}
              >
                ★
              </motion.span>
            ))}
          </div>
          <p className="label text-ink/60 mt-3">Google Maps rating · {GOOGLE_RATING.count} reviews</p>
        </div>

        <figure className="lg:col-span-7 lg:col-start-6">
          <blockquote className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1]">
            <Lines lines={[<>&ldquo;They offer</>, <>premium services.&rdquo;</>]} />
          </blockquote>
          <Reveal as="figcaption" delay={0.3} className="mt-8 flex items-center gap-4">
            <span className="w-10 h-px bg-ink" />
            <span className="font-medium">IDP Board Members</span>
            <span className="text-ink/60">Google review</span>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ink group !pr-2">
              Read & write reviews <ArrowDot className="bg-paper/15" />
            </a>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}

// Map pointing at the salon, with the visit details on a card over it
function Visit() {
  return (
    <section className="bg-paper pt-24 lg:pt-36 pb-10">
      <div className="wrap flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <Label num="06" className="text-ink-500 mb-6">Find us</Label>
          <h2 className="h2"><Lines lines={[<>Avenue de Logpom,</>, <span key="d" className="accent text-ember">Douala.</span>]} /></h2>
        </div>
        <Reveal className="max-w-sm text-ink-600 text-lg">Between Tradex Rhône Poulenc and Collège Charles de Gaulle. Tap the pin for directions.</Reveal>
      </div>

      <div className="relative mx-5 sm:mx-8 lg:mx-12">
        <motion.div
          initial={{ clipPath: 'inset(12% 8% 12% 8% round 4px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 4px)' }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.4, ease }}
        >
          <LocationMap className="h-[70vh] min-h-[460px] lg:h-[78vh]" />
        </motion.div>

        <Reveal delay={0.3} className="relative lg:absolute lg:left-8 lg:bottom-8 z-[500] mt-4 lg:mt-0 lg:w-[380px]">
          <div className="bg-ink text-paper p-7 rounded-[4px] shadow-[0_30px_60px_-20px_rgba(23,17,13,0.6)]">
            <div className="flex gap-4 items-center">
              <img src={SHOP.frontNight} alt="CiGa Raw storefront at night" className="w-16 h-16 rounded-full object-cover border-2 border-ember" />
              <div>
                <p className="font-medium text-lg leading-tight">CiGa Raw Salon and Spa</p>
                <p className="text-paper/60 text-sm">★ {GOOGLE_RATING.score} on Google · {GOOGLE_RATING.count} reviews</p>
              </div>
            </div>
            <OpenStatus className="mt-5" />
            <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="label text-paper/40 mb-2">Address</p>
                {ADDRESS.map(l => <p key={l}>{l}</p>)}
              </div>
              <div>
                <p className="label text-paper/40 mb-2">Hours</p>
                {HOURS.map(h => <p key={h.days}><span className="text-paper/60">{h.days}</span><br />{h.time}</p>)}
              </div>
            </div>
            <a href={`tel:${PHONE_TEL}`} className="mt-6 block display text-3xl link-draw hover:text-ember transition-colors">{PHONE_DISPLAY}</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ember group !pr-2 mt-6 w-full justify-between">
              Get directions <ArrowDot className="bg-paper/15" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Promo band for the home service page
function HomeServiceBand() {
  return (
    <section className="bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="wrap">
        <Link to="/home-service" className="group grid lg:grid-cols-12 gap-8 items-center">
          <ImageReveal src={SHOP.facial} alt="A CiGa Raw therapist giving a face treatment" className="lg:col-span-4 aspect-[4/3] lg:aspect-[4/5]" />
          <div className="lg:col-span-7 lg:col-start-6">
            <Label num="+" className="text-ink-500 mb-6">New · Home service</Label>
            <h2 className="display text-6xl sm:text-7xl lg:text-[7.5rem] leading-[0.9]">
              <Lines lines={[<>Can&rsquo;t come in?</>, <>We come <span className="accent text-ember">to you.</span></>]} />
            </h2>
            <Reveal className="mt-8 flex flex-wrap items-center gap-6">
              <p className="text-lg text-ink-600 max-w-md">Shaving, face treatments, massage, manicure, pedicure and hair — at home, at the office or wherever you are.</p>
              <span className="btn-ember group-hover:before:translate-y-0 !pr-2">See the home menu <ArrowDot className="bg-paper/15" /></span>
            </Reveal>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default function HomePage({ ready }) {
  return (
    <>
      <Hero ready={ready} />

      <div className="bg-ember text-paper py-5 lg:py-7 -rotate-1 scale-[1.03] relative z-10">
        <Marquee>
          {['Shaving & waves', 'Face scrub & mask', 'Full body massage', 'Pedicure & manicure', 'Dreadlock renewal', 'VIP teeth whitening'].map(t => (
            <span key={t} className="display text-4xl lg:text-6xl flex items-center">
              <span className="px-6 lg:px-10">{t}</span>
              <svg viewBox="0 0 20 20" className="w-6 h-6 lg:w-8 lg:h-8 fill-current" aria-hidden="true">
                <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
              </svg>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="bg-paper pt-28 pb-24 lg:pt-40 lg:pb-36">
        <div className="wrap grid lg:grid-cols-12 gap-10">
          <Label num="01" className="lg:col-span-3 text-ink-500">Who we are</Label>
          <div className="lg:col-span-9">
            <ScrollWords
              className="text-[1.9rem] sm:text-5xl lg:text-[3.6rem] leading-[1.08] font-medium tracking-[-0.03em]"
              text="It started with a customer at Hair Force 1. Today that customer, Nde Clinton Fru — Ciga Raw — owns the salon, and it carries his name: a place in Logpom built on faith, hard work and a simple promise of beauty, confidence and excellence."
            />
            <Reveal className="mt-12 flex flex-wrap items-center gap-6">
              <Link to="/about" className="btn-line group !pr-2">Our story <ArrowDot className="bg-ink/5" /></Link>
              <span className="text-ink-500">From Hair Force 1 to CiGa Raw Salon and Spa.</span>
            </Reveal>
          </div>
        </div>
      </section>

      <Disciplines />
      <HomeServiceBand />
      <DayStrip />
      <ShortMenu />
      <Reviews />
      <FAQ />
      <Visit />
    </>
  )
}
