import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ArrowDot, easeOut, Label, Lines, Marquee, Reveal } from '../components/motion'
import { HOME_SERVICE } from '../menu'
import { SHOP } from '../photos'
import { WHATSAPP_DISPLAY, wa } from '../site'

const steps = [
  { title: 'Tell us what you need', desc: 'Pick your services and send us your address, the day and the time — on WhatsApp or through the booking form.' },
  { title: 'We confirm the price', desc: 'You pay the salon price for each service, plus a travel fee based on where you are. We confirm the total before anyone sets off.' },
  { title: 'We come to you', desc: 'A CiGa Raw specialist arrives with the tools and products for your treatment. You relax at home.' },
]

const occasions = ['At home', 'At the office', 'Hotel stays', 'Weddings', 'Events', 'Busy days']

const bookingMessage = 'Hello CiGa Raw, I would like a home service.\n\nService(s):\nAddress / neighbourhood:\nDate & time:'

// Three steps joined by a line that draws as you scroll
function Steps() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const w = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative mt-16">
      <div className="hidden md:block absolute left-0 right-0 top-[27px] h-px bg-paper/15" />
      <motion.div style={{ width: w }} className="hidden md:block absolute left-0 top-[27px] h-px bg-ember" />
      <ol className="grid md:grid-cols-3 gap-12 md:gap-10">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.12} className="relative">
            <span className="relative z-10 grid place-items-center w-14 h-14 rounded-full bg-ember text-ink display text-2xl">{i + 1}</span>
            <h3 className="text-2xl lg:text-3xl font-medium tracking-tight mt-8">{s.title}</h3>
            <p className="text-paper/60 text-lg mt-3 leading-relaxed max-w-sm">{s.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export default function HomeServicePage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="08"
        kicker="Home service"
        lines={[<>We come</>, <>to <span className="accent text-ember">you.</span></>]}
        intro="CiGa Raw at your door. Shaving, face treatments, massage, manicure, pedicure and hair — done at home, at the office or wherever you are."
        image={SHOP.facial}
        imagePosition="center 30%"
        imageAlt="A CiGa Raw therapist giving a face treatment"
        aside={
          <a href={wa(bookingMessage)} target="_blank" rel="noopener noreferrer" className="btn bg-wa text-ink before:bg-ink hover:text-paper">
            <WhatsAppIcon className="w-4 h-4" /> Book a home visit
          </a>
        }
      />

      <div className="bg-paper py-10">
        <Marquee>
          {occasions.map(o => (
            <span key={o} className="display text-4xl lg:text-6xl px-6 lg:px-10 flex items-center gap-6 lg:gap-10">
              {o} <span className="text-ember">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap">
          <Label num="A" className="text-paper/50 mb-6">How it works</Label>
          <h2 className="h2"><Lines lines={[<>Three steps,</>, <span key="a" className="accent text-ember">no traffic.</span>]} /></h2>
          <Steps />
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <Label num="B" className="text-ink-500 mb-6">The home menu</Label>
              <h2 className="h2"><Lines lines={[<>What we can</>, <span key="b" className="accent text-ember">bring to you.</span>]} /></h2>
            </div>
            <Reveal className="max-w-sm text-ink-600 text-lg">
              Salon prices in FCFA. A travel fee is added depending on your location — we confirm the total on WhatsApp before your visit.
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_SERVICE.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className={`h-full p-8 rounded-[2px] ${i === 0 ? 'bg-ember text-ink' : 'bg-bone'}`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="display text-4xl">{g.group}</h3>
                    <span className="label opacity-50">0{i + 1}</span>
                  </div>
                  <ul className={`mt-6 border-t ${i === 0 ? 'border-ink/20' : 'border-ink/15'}`}>
                    {g.items.map(it => (
                      <li key={it.name} className={`flex items-baseline justify-between gap-4 py-3 border-b ${i === 0 ? 'border-ink/20' : 'border-ink/10'}`}>
                        <span className="font-medium">{it.name}</span>
                        <span className="tabular-nums whitespace-nowrap opacity-75">{it.price}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="h-full p-8 rounded-[2px] bg-ink text-paper flex flex-col justify-between gap-8">
                <div>
                  <h3 className="display text-4xl">Something else?</h3>
                  <p className="text-paper/60 mt-3">Need a service that isn&rsquo;t listed here? Ask us — if it can be done well at home, we&rsquo;ll bring it.</p>
                </div>
                <Link to="/services" className="btn-line-light group !pr-2 self-start">Full salon menu <ArrowDot /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ember text-ink py-20 lg:py-28">
        <div className="wrap flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <h2 className="display text-5xl lg:text-7xl max-w-3xl">Stay home. <span className="accent">We&rsquo;ll bring the salon.</span></h2>
            <p className="mt-4 text-ink/70 text-lg">WhatsApp {WHATSAPP_DISPLAY} — send your services, address and preferred time.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={wa(bookingMessage)} target="_blank" rel="noopener noreferrer" className="btn-ink">
              <WhatsAppIcon className="w-4 h-4 text-wa" /> Book on WhatsApp
            </a>
            <Link to="/booking?location=home" className="btn-line group !pr-2">Use the booking form <ArrowDot className="bg-ink/5" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
