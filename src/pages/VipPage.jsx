import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SHOP } from '../photos'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ArrowDot, easeOut, Label, Lines, Reveal } from '../components/motion'
import { wa } from '../site'
import { TEETH_WHITENING, VIP } from '../menu'

const amenities = [
  { title: 'Sound-isolated room',     desc: 'Take a call, close your eyes, or just think. Nobody hears a thing.' },
  { title: 'Spirits & espresso',      desc: 'Single malts, cognac and freshly pulled espresso throughout your session.' },
  { title: 'Wardrobe refresh',        desc: 'Your jacket steamed and shoes cleaned while you sit.' },
  { title: 'Private rain shower',     desc: 'Cedar-finished en-suite to freshen up after a massage.' },
  { title: 'Personal attendant',      desc: 'One person handling your timing, drinks and any request.' },
  { title: 'Screens & sound',         desc: 'Fast fibre, streaming, and jazz or Afrobeats at the volume you choose.' },
]

export default function VipPage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="04"
        kicker="VIP Suite"
        lines={[<>Privacy is</>, <>the <span className="accent text-ember">luxury.</span></>]}
        intro="A self-contained suite away from the main floor — for confidential calls, a quiet drink, and grooming without an audience."
        image={SHOP.team2}
        imageAlt="Clients at CiGa Raw"
        aside={
          <a href={wa('Hello CiGa Raw, I would like to reserve the VIP Suite.')} target="_blank" rel="noopener noreferrer" className="btn-ink">
            <WhatsAppIcon className="w-4 h-4 text-wa" /> Reserve on WhatsApp
          </a>
        }
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Label num="A" className="text-ink-500 mb-6">Included every visit</Label>
            <h2 className="h2"><Lines lines={[<>The small</>, <span key="a" className="accent text-ember">things.</span>]} /></h2>
          </div>
          <ol className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12">
            {amenities.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 2) * 0.08} className="border-t border-ink/15 py-8 group">
                <span className="label text-ember">0{i + 1}</span>
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight mt-3 transition-transform duration-500 group-hover:translate-x-2">{a.title}</h3>
                <p className="text-ink-600 text-lg mt-2">{a.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Label num="B" className="text-paper/50 mb-6">VIP menu</Label>
            <h2 className="h2"><Lines lines={[<>Slow down,</>, <span key="b" className="accent text-ember">properly.</span>]} /></h2>
          </div>
          <ul className="lg:col-span-8 border-t border-paper/15">
            {VIP.map((r, i) => (
              <Reveal as="li" key={r.name} delay={(i % 3) * 0.05}>
                <Link to={`/booking?service=${encodeURIComponent(r.name)}`} className="menu-row group">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl lg:text-3xl font-medium tracking-tight transition-colors group-hover:text-ember">{r.name}</span>
                      <span className="leader hidden sm:block" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl lg:text-3xl font-medium tabular-nums whitespace-nowrap">{r.price}</span>
                    <span className="block label text-paper/40 mt-1">FCFA</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="lg:col-span-8 lg:col-start-5 text-paper/50 -mt-6">The reservation fee secures the suite for your visit.</p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5">
              <Label num="C" className="text-ink-500 mb-6">VIP teeth whitening</Label>
              <h2 className="h2"><Lines lines={[<>A brighter smile</>, <span key="c" className="accent text-ember">in three visits.</span>]} /></h2>
              <Reveal className="mt-6 text-ink-600 text-lg max-w-sm">
                Done in the privacy of the VIP suite. Pay for the first two sessions — the third one is free.
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <Link to={`/booking?service=${encodeURIComponent('VIP teeth whitening')}`} className="btn-ink group !pr-2">
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
                    className={`h-full min-h-[220px] p-7 rounded-[2px] flex flex-col justify-between ${i === 2 ? 'bg-ember text-ink' : i === 1 ? 'bg-ink text-paper' : 'bg-paper'}`}
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
          <p className="mt-10 text-ink-500">Booking ahead is strongly recommended — there is only one suite.</p>
        </div>
      </section>
    </>
  )
}
