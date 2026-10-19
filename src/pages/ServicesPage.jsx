import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { ArrowDot, easeOut, Label, Lines, Reveal } from '../components/motion'
import { MENU, TEETH_WHITENING } from '../menu'
import { wa } from '../site'



function Row({ item }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="border-b border-ink/15"
    >
      <Link
        to={`/booking?service=${encodeURIComponent(item.name)}`}
        className="group grid grid-cols-[1fr_auto] items-end gap-4 sm:gap-8 py-6"
      >
        <span>
          <span className="label text-ink-500 block mb-1">{item.category}</span>
          <span className="flex items-baseline">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight transition-colors group-hover:text-ember">{item.name}</span>
            <span className="leader hidden md:block" />
          </span>
          {item.note && <span className="block text-ink-500 mt-1">{item.note}</span>}
        </span>
        <span className="flex items-center gap-4">
          <span className="text-right">
            <span className="block text-xl sm:text-2xl lg:text-3xl font-medium tabular-nums whitespace-nowrap">{item.price}</span>
            {/\d/.test(item.price) && <span className="block label text-ink-500 mt-1">FCFA</span>}
          </span>
          <ArrowDot className="hidden sm:grid border border-ink/20 transition-colors duration-500 group-hover:bg-ink group-hover:text-paper" />
        </span>
      </Link>
    </motion.li>
  )
}

export default function ServicesPage({ ready }) {
  const [cat, setCat] = useState('All')
  const categories = ['All', ...MENU.map(m => m.group)]
  const allServices = MENU.flatMap(m => m.items.map(it => ({ ...it, category: m.group })))
  const list = cat === 'All' ? allServices : allServices.filter(s => s.category === cat)

  return (
    <>
      <PageHero
        ready={ready}
        index="02"
        kicker="Services & prices"
        lines={[<>The whole</>, <><span className="accent text-ember">menu.</span></>]}
        intro="Every price in FCFA. Where you see a range, the final price depends on your hair, skin and the products used — we tell you before we start."
      />

      <section className="bg-paper pt-12 pb-24 lg:pb-36">
        <div className="wrap">
          <LayoutGroup>
            <div className="sticky top-[72px] z-30 -mx-5 px-5 sm:mx-0 sm:px-0 py-4 bg-paper/90 backdrop-blur-md flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative isolate chip whitespace-nowrap ${cat === c ? 'text-paper border-ink' : 'border-ink/20 text-ink hover:border-ink'}`}
                >
                  {cat === c && (
                    <motion.span layoutId="chip" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>

            <motion.ul layout className="mt-6 border-t border-ink/15">
              <AnimatePresence mode="popLayout">
                {list.map(item => <Row key={item.category + item.name} item={item} />)}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-ink-600">
            <span>Most services can also be done at your home.</span>
            <Link to="/home-service" className="link-draw text-ink">Home service →</Link>
            <span className="text-ink/30">·</span>
            <span>Tattoo work is priced per design.</span>
            <Link to="/tattoo" className="link-draw text-ink">See the tattoo studio →</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-5">
            <Label num="+" className="text-paper/50 mb-6">VIP teeth whitening</Label>
            <h2 className="h2"><Lines lines={[<>Three sessions,</>, <span key="t" className="accent text-ember">the third is free.</span>]} /></h2>
            <Reveal className="mt-6 text-paper/60 text-lg max-w-sm">
              Book the course in the VIP suite. Pay for the first two sessions — the last one is on us.
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <Link to={`/booking?service=${encodeURIComponent('VIP teeth whitening')}`} className="btn-ember group !pr-2">
                Book whitening <ArrowDot className="bg-paper/15" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid sm:grid-cols-3 gap-4">
            {TEETH_WHITENING.map((t, i) => (
              <Reveal key={t.session} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className={`h-full p-7 rounded-[2px] flex flex-col justify-between min-h-[220px] ${i === 2 ? 'bg-ember text-ink' : 'bg-ink-800'}`}
                >
                  <span className="label opacity-60">0{i + 1}</span>
                  <div>
                    <p className="opacity-70">{t.session}</p>
                    <p className="display text-5xl mt-2">{t.price}</p>
                    {i < 2 && <p className="label opacity-50 mt-2">FCFA</p>}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="display text-4xl lg:text-6xl max-w-2xl">Not sure what to book?</p>
          <a href={wa('Hello CiGa Raw, I have a question about your services.')} target="_blank" rel="noopener noreferrer" className="btn-ink group !pr-2">
            Ask us on WhatsApp <ArrowDot className="bg-paper/15" />
          </a>
        </div>
      </section>
    </>
  )
}
