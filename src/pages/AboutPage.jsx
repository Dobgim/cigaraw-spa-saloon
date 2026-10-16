import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageHero from '../components/PageHero'
import { ArrowDot, Count, ImageReveal, Label, Lines, Reveal } from '../components/motion'

const values = [
  { title: 'Sterile, every time', desc: 'Shears, guards and combs go through the autoclave between clients. Straight-razor blades are single-use and unwrapped in front of you.' },
  { title: 'Time over turnover', desc: 'No assembly-line cuts. We listen first, then work to your head shape, your hair and the way you actually live.' },
  { title: 'A room you can rest in', desc: 'Warm light, good music at a sensible volume, and an espresso if you want one. It should feel like a pause, not an errand.' },
  { title: 'Made in Bamenda', desc: 'North West hospitality with the standards of the best shops anywhere. We are proud of where we are from and it shows in the work.' },
]

const milestones = [
  { year: '2024', title: 'Doors open', desc: 'CiGa Raw opens on Commercial Avenue with four chairs and one spa room.' },
  { year: '2024', title: 'The VIP Suite', desc: 'A sound-isolated private grooming room — the first of its kind in Bamenda.' },
  { year: '2025', title: 'Tattoo studio', desc: 'A sterile studio for fine-line, script and Afro-centric blackwork.' },
  { year: '2026', title: 'Twelve strong', desc: 'Over 5,000 clients, a 4.9 average rating and twelve resident artists.' },
]

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative lg:col-span-7 lg:col-start-6">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/15" />
      <motion.div style={{ height: h }} className="absolute left-[5px] top-2 w-px bg-ember" />
      <ol className="space-y-14">
        {milestones.map((m, i) => (
          <Reveal as="li" key={i} delay={0.05} className="relative pl-12">
            <span className="absolute left-0 top-3 w-[11px] h-[11px] rounded-full bg-paper border-2 border-ember" />
            <span className="label text-ember">{m.year}</span>
            <h3 className="display text-4xl lg:text-5xl mt-2">{m.title}</h3>
            <p className="text-ink-600 text-lg mt-3 max-w-md">{m.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export default function AboutPage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="01"
        kicker="About"
        lines={[<>Grooming,</>, <>done <span className="accent text-ember">properly.</span></>]}
        intro="CiGa Raw started in 2024 because Bamenda deserved better than rushed cuts and dirty tools. This is who we are and how we work."
        image="/images/hero_barber.jpg"
        imageAlt="Inside the CiGa Raw barbershop"
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <Label num="A" className="lg:col-span-3 text-ink-500">The origin</Label>
          <div className="lg:col-span-8 space-y-8 text-xl lg:text-2xl leading-relaxed text-ink-700">
            <Reveal as="p" className="text-3xl lg:text-[2.6rem] leading-[1.15] text-ink font-medium tracking-tight">
              Too many salons rushed people through, skipped hygiene and played the music too loud. We built the antidote.
            </Reveal>
            <Reveal as="p">
              From the first day on Commercial Avenue the idea was simple: the people of Bamenda should get a grooming experience as good as anything in Lagos, Paris or London — without leaving home.
            </Reveal>
            <Reveal as="p">
              Two years later we have twelve resident barbers, therapists and artists, more than five thousand regulars, and the same rule we started with: <span className="accent text-ember">nobody leaves the chair until it is right.</span>
            </Reveal>
          </div>
        </div>

        <div className="wrap grid grid-cols-3 gap-6 mt-24 border-t border-ink/15">
          {[
            { n: 2,    s: '+', l: 'Years open' },
            { n: 5000, s: '+', l: 'Clients' },
            { n: 12,   s: '',  l: 'Artists' },
          ].map(x => (
            <div key={x.l} className="pt-6">
              <p className="display text-5xl sm:text-7xl lg:text-9xl"><Count to={x.n} suffix={x.s} /></p>
              <p className="label text-ink-500 mt-3">{x.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap">
          <Label num="B" className="text-paper/50 mb-6">What we stand for</Label>
          <h2 className="h2 mb-16 lg:mb-24">
            <Lines lines={[<>Four things we</>, <>won&rsquo;t <span className="accent text-ember">compromise on.</span></>]} />
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.1} className="border-t border-paper/15 py-10 grid grid-cols-[3rem_1fr] gap-4">
                <span className="label text-ember pt-2">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-medium tracking-tight">{v.title}</h3>
                  <p className="text-paper/60 text-lg mt-3 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Label num="C" className="text-ink-500 mb-6">So far</Label>
            <h2 className="h2">
              <Lines lines={[<>Two years,</>, <span key="b" className="accent text-ember">four chapters.</span>]} />
            </h2>
            <ImageReveal src="/images/tattoo_art.jpg" alt="Blackwork tattoo detail" className="hidden lg:block aspect-[4/5] mt-12 max-w-xs" />
          </div>
          <Timeline />
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="display text-4xl lg:text-6xl max-w-2xl">Come and see for yourself.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking" className="btn-ember group !pr-2">Book a visit <ArrowDot className="bg-paper/15" /></Link>
            <Link to="/services" className="btn-line">Browse services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
