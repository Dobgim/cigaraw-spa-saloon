import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ArrowDot, easeOut, Label, Lines, Reveal } from '../components/motion'
import { wa } from '../site'

const amenities = [
  { title: 'Sound-isolated room',     desc: 'Take a call, close your eyes, or just think. Nobody hears a thing.' },
  { title: 'Spirits & espresso',      desc: 'Single malts, cognac and freshly pulled espresso throughout your session.' },
  { title: 'Wardrobe refresh',        desc: 'Your jacket steamed and shoes cleaned while you sit.' },
  { title: 'Private rain shower',     desc: 'Cedar-finished en-suite to freshen up after a massage.' },
  { title: 'Personal attendant',      desc: 'One person handling your timing, drinks and any request.' },
  { title: 'Screens & sound',         desc: 'Fast fibre, streaming, and jazz or Afrobeats at the volume you choose.' },
]

const rituals = [
  { name: 'Royal botanical facial',      time: '90 min',  price: '15,000', desc: 'Gold infusion serum, ultrasonic cleanse, African shea hydration.' },
  { name: 'Heated basalt stone massage', time: '75 min',  price: '12,000', desc: 'Volcanic stones worked along the spine and shoulders.' },
  { name: 'Executive deep tissue',       time: '60 min',  price: '10,000', desc: 'Firm pressure for chronic tension and travel fatigue.' },
  { name: 'Scalp & neck aromatherapy',   time: '45 min',  price: '8,000',  desc: 'Warm peppermint and eucalyptus oil for a tired head.' },
  { name: 'Hand & foot grooming',        time: '60 min',  price: '9,000',  desc: 'Paraffin dip, nail shaping, cuticle care, calf massage.' },
  { name: 'VIP full body ritual',        time: '3.5 hrs', price: '35,000', desc: 'Cut, beard sculpt, body scrub, massage and facial.' },
]

const tiers = [
  { tier: 'Executive Pass', price: '25,000', unit: 'per session', desc: 'For the occasional day you need complete privacy.',
    perks: ['2 hours in the suite', 'Signature cut + beard sculpt', 'Drinks included', 'Priority booking'] },
  { tier: 'Black Card', price: '50,000', unit: 'per month', desc: 'Our membership for regulars who want the suite every time.',
    perks: ['Unlimited suite sessions', '4 cuts + beard sculpts', '2 full body massages', 'Private entrance', '15% off for guests'], featured: true },
  { tier: 'Private Group', price: 'On request', unit: '', desc: 'Full buy-out for wedding parties, retreats or delegations.',
    perks: ['The whole VIP floor', 'Catering & cigars', 'Several dedicated barbers', 'Your schedule'] },
]

function SuiteImage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const inset = useTransform(scrollYProgress, [0.05, 0.5], ['14%', '0%'])
  const clip = useTransform(inset, v => `inset(${v} ${v} ${v} ${v} round 2px)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <div ref={ref} className="bg-paper">
      <motion.div style={{ clipPath: clip }} className="relative h-[75vh] lg:h-[95vh] overflow-hidden">
        <motion.img style={{ scale }} src="/images/spa_suite.jpg" alt="The candle-lit private suite" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <p className="absolute bottom-8 left-5 sm:left-8 lg:left-12 display text-paper text-5xl lg:text-8xl max-w-3xl">
          One client. <span className="accent text-ember">One room.</span>
        </p>
      </motion.div>
    </div>
  )
}

export default function VipPage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="04"
        kicker="VIP Suite"
        lines={[<>Privacy is</>, <>the <span className="accent text-ember">luxury.</span></>]}
        intro="A self-contained suite away from the main floor — for confidential calls, a quiet drink, and grooming without an audience."
        image="/images/vip_section.jpg"
        imageAlt="The VIP grooming suite"
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

      <SuiteImage />

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Label num="B" className="text-paper/50 mb-6">Suite rituals</Label>
            <h2 className="h2"><Lines lines={[<>Slow down,</>, <span key="b" className="accent text-ember">properly.</span>]} /></h2>
          </div>
          <ul className="lg:col-span-8 border-t border-paper/15">
            {rituals.map((r, i) => (
              <Reveal as="li" key={r.name} delay={(i % 3) * 0.05}>
                <Link to={`/booking?service=${encodeURIComponent(r.name)}`} className="menu-row group">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl lg:text-3xl font-medium tracking-tight transition-colors group-hover:text-ember">{r.name}</span>
                      <span className="leader hidden sm:block" />
                    </div>
                    <p className="text-paper/50 mt-1">{r.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl lg:text-3xl font-medium tabular-nums">{r.price}</span>
                    <span className="block label text-paper/40 mt-1">{r.time}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <Label num="C" className="text-ink-500 mb-6">Membership</Label>
          <h2 className="h2 mb-16"><Lines lines={[<>Make it a</>, <span key="c" className="accent text-ember">habit.</span>]} /></h2>
          <div className="grid lg:grid-cols-3 gap-5">
            {tiers.map((t, i) => (
              <Reveal key={t.tier} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className={`h-full flex flex-col p-8 lg:p-10 rounded-[2px] ${t.featured ? 'bg-ink text-paper' : 'bg-paper'}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="display text-4xl">{t.tier}</h3>
                    {t.featured && <span className="label bg-ember text-ink px-2.5 py-1 rounded-full">Popular</span>}
                  </div>
                  <p className={`mt-3 ${t.featured ? 'text-paper/60' : 'text-ink-600'}`}>{t.desc}</p>
                  <p className="mt-10 text-4xl font-medium tabular-nums">
                    {t.price} {t.unit && <span className="text-base opacity-60">FCFA {t.unit}</span>}
                  </p>
                  <ul className={`mt-8 pt-8 border-t space-y-2 flex-1 ${t.featured ? 'border-paper/15' : 'border-ink/15'}`}>
                    {t.perks.map(p => <li key={p} className="flex gap-2"><span className="text-ember">—</span>{p}</li>)}
                  </ul>
                  <Link to={`/booking?service=${encodeURIComponent('Executive Suite')}`} className={`mt-10 group !pr-2 self-start ${t.featured ? 'btn-ember' : 'btn-line'}`}>
                    Enquire <ArrowDot className={t.featured ? 'bg-paper/15' : 'bg-ink/5'} />
                  </Link>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-ink-500">Booking ahead is strongly recommended — there is only one suite.</p>
        </div>
      </section>
    </>
  )
}
