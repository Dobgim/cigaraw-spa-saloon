import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SHOP } from '../photos'
import { useRef } from 'react'
import PageHero from '../components/PageHero'
import { ArrowDot, ImageReveal, Label, Lines, Marquee, Reveal } from '../components/motion'

const roles = ['Entrepreneur', 'Recording artist', 'Music producer', 'Video director', 'Founder of Raw Music', 'CEO of CiGa Raw Salon and Spa']

const services = ['Dreadlocks', 'Braiding', 'Hair installation', 'Facial treatments', 'Manicures', 'Pedicures', 'Teeth whitening', 'Shaving', 'Epilation', 'Body scrubs', 'Hammam', 'Nail care']

const journey = [
  { step: 'The beginning', title: 'A customer at Hair Force 1', desc: 'Nde Clinton Fru first walked into the salon in Logpom, Douala as a client.' },
  { step: 'The opportunity', title: 'CiGa Raw Salon and Spa', desc: 'Through God’s blessings and the opportunities that came his way, he acquired the business and transformed it into CiGa Raw Salon and Spa.' },
  { step: 'The music', title: 'Raw Music Record Label', desc: 'Formerly Real Life Empire — a label built around authenticity, talent and real-life expression.' },
  { step: 'What’s next', title: 'From Cameroon to the world', desc: 'New salon branches in Bamenda, Buea, Limbe, Yaoundé, Kribi and other cities, with ambitions to expand internationally.' },
]

const beliefs = [
  { title: 'Faith', desc: 'Every step of this journey — from customer to owner — has been guided by faith and gratitude.' },
  { title: 'Hard work', desc: 'Small beginnings become something meaningful when the work is put in, day after day.' },
  { title: 'Consistency', desc: 'Beauty, confidence and customer satisfaction, delivered the same way on every visit.' },
  { title: 'A clear vision', desc: 'Two brands with roots in Cameroon and ambitions that reach beyond its borders.' },
]

const cities = ['Bamenda', 'Buea', 'Limbe', 'Yaoundé', 'Kribi']

function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative lg:col-span-7 lg:col-start-6">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/15" />
      <motion.div style={{ height: h }} className="absolute left-[5px] top-2 w-px bg-ember" />
      <ol className="space-y-14">
        {journey.map((m, i) => (
          <Reveal as="li" key={i} delay={0.05} className="relative pl-12">
            <span className="absolute left-0 top-3 w-[11px] h-[11px] rounded-full bg-paper border-2 border-ember" />
            <span className="label text-ember">{m.step}</span>
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
        kicker="About CiGa Raw"
        lines={[<>From customer</>, <>to <span className="accent text-ember">owner.</span></>]}
        intro="The story of Nde Clinton Fru — known as Ciga Raw — and the salon in Logpom, Douala that carries his name."
        image={SHOP.vipChairs}
        imageAlt="Inside CiGa Raw Salon and Spa"
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <Label num="A" className="lg:col-span-3 text-ink-500">The man behind the name</Label>
          <div className="lg:col-span-8 space-y-8 text-xl lg:text-2xl leading-relaxed text-ink-700">
            <Reveal as="p" className="text-3xl lg:text-[2.6rem] leading-[1.15] text-ink font-medium tracking-tight">
              Nde Clinton Fru, popularly known as <span className="accent text-ember">Ciga Raw</span>, is a Cameroonian entrepreneur, artist, music producer, video director and creative visionary from Mankon, Bamenda.
            </Reveal>
            <Reveal as="p">
              His journey reflects faith, determination, creativity, and a strong desire to build a lasting legacy in both the beauty and entertainment industries.
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-20">
          <Marquee className="border-y border-ink/15 py-5">
            {roles.map(r => (
              <span key={r} className="display text-3xl lg:text-5xl px-6 lg:px-10 flex items-center gap-6 lg:gap-10">
                {r} <span className="text-ember">✦</span>
              </span>
            ))}
          </Marquee>
        </Reveal>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Label num="B" className="text-paper/50 mb-6">CiGa Raw Salon and Spa</Label>
            <h2 className="h2 mb-10"><Lines lines={[<>A story of</>, <span key="t" className="accent text-ember">transformation.</span>]} /></h2>
            <Reveal as="p" className="text-xl text-paper/75 leading-relaxed">
              Based in Logpom, Douala, CiGa Raw Salon and Spa is a growing beauty and wellness business, formerly known as <span className="text-paper">Hair Force 1</span>. The story began when Ciga Raw was a customer at the salon. Through God&rsquo;s blessings and the opportunities that came his way, he was able to acquire the business and transform it.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-xl text-paper/75 leading-relaxed mt-6">
              What began as a simple customer relationship became a remarkable business journey — proof that unexpected opportunities can change lives and open doors to greater achievements.
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ImageReveal src={SHOP.frontDay} alt="The CiGa Raw Salon and Spa storefront in Logpom, Douala" className="aspect-[4/5]" />
          </div>
        </div>

        <div className="wrap mt-24">
          <Reveal as="p" className="label text-paper/50 mb-6">What we offer today</Reveal>
          <ul className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.03} y={16}>
                <span className="chip border-paper/25 text-paper inline-block">{s}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="mt-8 text-paper/60 text-lg max-w-2xl">
            With a commitment to beauty, confidence and customer satisfaction, the brand keeps working to become a recognised name in beauty and wellness.
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Label num="C" className="text-ink-500 mb-6">The artist & creative mind</Label>
            <h2 className="h2"><Lines lines={[<>Real life.</>, <>Real stories.</>, <span key="m" className="accent text-ember">Real music.</span>]} /></h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-xl text-ink-700 leading-relaxed">
            <Reveal as="p">
              Beyond business, Ciga Raw is an artist, music producer and video director. He uses music to express real-life experiences, struggles, street culture, personal ambition and the realities of everyday life.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              For him, music is more than entertainment — it is a way of expressing reality, communicating emotion and documenting life&rsquo;s experiences.
            </Reveal>
            <Reveal delay={0.1} className="border-t border-ink/15 pt-8 mt-10">
              <p className="label text-ember">Raw Music Record Label</p>
              <p className="mt-3">
                As founder and CEO of Raw Music — formerly Real Life Empire — he is building a label that creates opportunities for artists, encourages originality and develops music that reflects genuine experiences, with the aim of contributing to Cameroon&rsquo;s music industry and sharing authentic African stories with the world.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Label num="D" className="text-ink-500 mb-6">The journey</Label>
            <h2 className="h2">
              <Lines lines={[<>Small beginnings,</>, <span key="b" className="accent text-ember">big vision.</span>]} />
            </h2>
            <ImageReveal src={SHOP.frontNight} alt="CiGa Raw Salon and Spa at night" className="hidden lg:block aspect-[4/5] mt-12 max-w-xs" />
          </div>
          <Journey />
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap">
          <Label num="E" className="text-paper/50 mb-6">Our vision</Label>
          <h2 className="h2 mb-6"><Lines lines={[<>From Cameroon</>, <>to <span className="accent text-ember">the world.</span></>]} /></h2>
          <Reveal as="p" className="text-xl text-paper/70 max-w-2xl">
            The long-term plan for CiGa Raw Salon and Spa: more branches across Cameroon, then beyond.
          </Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 display text-4xl sm:text-5xl lg:text-7xl">
            <Reveal as="span" className="text-ember">Douala</Reveal>
            {cities.map((c, i) => (
              <Reveal as="span" key={c} delay={0.08 * (i + 1)} className="text-paper/35">
                → {c}
              </Reveal>
            ))}
            <Reveal as="span" delay={0.5} className="accent text-paper/80">& abroad</Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 mt-24">
            {beliefs.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="border-t border-paper/15 pt-8 pb-6">
                <span className="label text-ember">0{i + 1}</span>
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight mt-3">{v.title}</h3>
                <p className="text-paper/60 text-lg mt-3 leading-relaxed">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12">
          <Label num="F" className="lg:col-span-3 text-ink-500">A message of gratitude</Label>
          <div className="lg:col-span-8">
            <Reveal as="p" className="font-serif text-3xl lg:text-5xl leading-[1.15]">
              &ldquo;Every customer, supporter, collaborator and well-wisher is part of this journey. Every act of support, every recommendation and every opportunity helps move the vision forward.&rdquo;
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 text-xl text-ink-600 max-w-2xl">
              Success does not always begin with ownership or recognition. Sometimes it begins with a simple connection, an opportunity, and the courage to take the next step.
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex items-center gap-4">
              <span className="w-10 h-px bg-ink" />
              <span className="font-medium">Nde Clinton Fru</span>
              <span className="text-ink-500">“Ciga Raw”</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="display text-4xl lg:text-6xl max-w-2xl">Beauty, Confidence, Excellence.</p>
            <p className="text-ink-600 mt-3">CiGa Raw Salon and Spa — Logpom, Douala.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking" className="btn-ember group !pr-2">Book a visit <ArrowDot className="bg-paper/15" /></Link>
            <Link to="/services" className="btn-line">Browse services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
