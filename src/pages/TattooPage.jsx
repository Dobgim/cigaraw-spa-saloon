import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ArrowDot, ImageReveal, Label, Lines, Reveal } from '../components/motion'
import { wa } from '../site'
import { TATTOOS, tattoo } from '../photos'

const tattooStyles = [
  { name: 'Fine-line & script',        rate: 'from 15,000', desc: 'Single-needle work for quotes, dates, botanicals and small symbols.' },
  { name: 'Afro-centric & tribal',     rate: 'from 25,000', desc: 'Grassfields geometry, royal chevrons, cowries and ancestral motifs.' },
  { name: 'Blackwork',                 rate: 'from 30,000', desc: 'Solid black saturation built for deep melanin skin — high contrast that lasts.' },
  { name: 'Micro-realism & portraits', rate: 'from 40,000', desc: 'Loved ones, wildlife or icons with photographic depth and shading.' },
  { name: 'Cover-ups & scars',         rate: 'quote',       desc: 'Turning old tattoos or surgical scars into new work you actually want.' },
  { name: 'Geometric & mandala',       rate: 'from 25,000', desc: 'Balanced symmetry and dotwork that follows the shape of your body.' },
]

const steps = [
  { num: '01', title: 'Talk it through', desc: 'Your idea, size, placement and style — a proper conversation with the artist.', bg: 'bg-bone' },
  { num: '02', title: 'Draw it up',      desc: 'A custom digital stencil drawn for your body. We redraw until it is right.', bg: 'bg-sand' },
  { num: '03', title: 'Ink it',          desc: 'Private studio, sealed single-use needles, premium vegan pigment.', bg: 'bg-ember' },
  { num: '04', title: 'Heal it',         desc: 'Breathable medical film to seal it, and our organic aftercare balm to take home.', bg: 'bg-paper' },
]

const aftercare = [
  { day: 'Days 1–3',   title: 'Keep it covered', tip: 'Leave the film on. No soaking, swimming or direct sun.' },
  { day: 'Days 4–7',   title: 'Wash gently',     tip: 'Fragrance-free soap, pat dry, a thin layer of balm.' },
  { day: 'Days 8–14',  title: 'Let it peel',     tip: 'Don’t pick or scratch. Keep it lightly moisturised with shea.' },
  { day: 'For life',   title: 'Block the sun',   tip: 'SPF 50 outdoors keeps dark pigment rich for decades.' },
]

export default function TattooPage({ ready }) {
  return (
    <>
      <PageHero
        ready={ready}
        index="05"
        kicker="Tattoo studio"
        lines={[<>Your story,</>, <><span className="accent text-ember">in ink.</span></>]}
        intro="Custom work only, drawn for your body and tattooed by artists who specialise in dark skin tones. Sterile, private, unhurried."
        image={tattoo('golden-crown-back')}
        imagePosition="center 35%"
        imageAlt="Artist tattooing a golden crown of thorns on a client's back"
        aside={<Link to="/booking?service=Consultation" className="btn-ember group !pr-2">Book a consultation <ArrowDot className="bg-paper/15" /></Link>}
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <ImageReveal src={tattoo('jesus-rosary-realism')} alt="Black and grey realism: Jesus holding a rosary" className="aspect-[4/5]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Label num="A" className="text-ink-500 mb-6">How we work</Label>
            <h2 className="h2 mb-8"><Lines lines={[<>No flash sheets.</>, <span key="a" className="accent text-ember">Only originals.</span>]} /></h2>
            <Reveal as="p" className="text-xl text-ink-700 leading-relaxed">
              A tattoo marks a milestone, a person, a place you come from. So every piece is drawn from scratch for you — no copying off the wall.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-xl text-ink-700 leading-relaxed mt-6">
              Our artists use needle groupings and saturation techniques that keep lines crisp and contrast rich on brown skin, without blowout or scarring.
            </Reveal>
            <Reveal delay={0.15} className="mt-10 grid grid-cols-2 border-t border-ink/15">
              <div className="pt-5"><p className="display text-5xl">500+</p><p className="label text-ink-500 mt-2">Custom pieces</p></div>
              <div className="pt-5"><p className="display text-5xl">100%</p><p className="label text-ink-500 mt-2">Single-use needles</p></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <Label num="A+" className="text-ink-500 mb-6">Recent work</Label>
              <h2 className="h2"><Lines lines={[<>Fresh from</>, <span key="p" className="accent text-ember">the chair.</span>]} /></h2>
            </div>
            <Reveal className="max-w-sm text-ink-600 text-lg">Realism, lettering and blackwork — a few of the pieces that have left our studio.</Reveal>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 lg:gap-5 [&>*]:mb-4 lg:[&>*]:mb-5">
            {TATTOOS.map((w, i) => (
              <Reveal key={w.src} delay={(i % 4) * 0.06} y={30} className="break-inside-avoid">
                <figure className="group relative overflow-hidden rounded-[2px] bg-ink">
                  <img src={w.src} alt={`${w.title} — ${w.style}`} loading="lazy" className="w-full h-auto transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/85 to-transparent text-paper translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="block font-medium">{w.title}</span>
                    <span className="label text-paper/60">{w.style}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap">
          <Label num="B" className="text-paper/50 mb-6">Styles</Label>
          <h2 className="h2 mb-16"><Lines lines={[<>What we</>, <span key="b" className="accent text-ember">specialise in.</span>]} /></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-paper/15">
            {tattooStyles.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.08} className="border-r border-b border-paper/15">
                <Link
                  to={`/booking?service=Tattoo&notes=${encodeURIComponent(s.name)}`}
                  className="group relative block p-8 lg:p-10 h-full min-h-[300px] overflow-hidden"
                >
                  <span className="absolute inset-0 bg-ember origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
                  <div className="relative flex flex-col h-full justify-between gap-12 transition-colors duration-500 group-hover:text-ink">
                    <div className="flex justify-between label opacity-60">
                      <span>0{i + 1}</span>
                      <span>{s.rate}</span>
                    </div>
                    <div>
                      <h3 className="display text-4xl lg:text-5xl">{s.name}</h3>
                      <p className="mt-3 text-paper/60 group-hover:text-ink/80 transition-colors duration-500">{s.desc}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper pt-24 lg:pt-36">
        <div className="wrap">
          <Label num="C" className="text-ink-500 mb-6">The process</Label>
          <h2 className="h2 mb-16"><Lines lines={[<>Idea to skin,</>, <span key="c" className="accent text-ember">in four steps.</span>]} /></h2>
        </div>
        <div className="wrap pb-24 lg:pb-36">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`sticky ${s.bg} border border-ink/10 rounded-[2px] p-8 lg:p-14 mb-6 min-h-[50vh] grid lg:grid-cols-12 gap-8 items-end shadow-[0_-20px_40px_-30px_rgba(23,17,13,0.5)]`}
              style={{ top: `${96 + i * 28}px` }}
            >
              <span className="lg:col-span-3 display text-[7rem] lg:text-[11rem] leading-none">{s.num}</span>
              <div className="lg:col-span-7 lg:col-start-6">
                <h3 className="display text-5xl lg:text-7xl">{s.title}</h3>
                <p className="text-xl mt-4 max-w-lg opacity-80">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <Label num="D" className="text-ink-500 mb-6">Aftercare</Label>
              <h2 className="h2">Half the work is yours.</h2>
            </div>
            <Reveal className="max-w-sm text-ink-600 text-lg">A great tattoo is half technique, half healing. Follow this and it will look sharp for years.</Reveal>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {aftercare.map((a, i) => (
              <Reveal as="li" key={a.day} delay={i * 0.1} className="border-t-2 border-ink pt-6">
                <span className="label text-ember">{a.day}</span>
                <h3 className="text-2xl font-medium tracking-tight mt-3">{a.title}</h3>
                <p className="text-ink-600 mt-2">{a.tip}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-paper py-20">
        <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="display text-4xl lg:text-6xl max-w-2xl">Got an idea? <span className="accent text-ember">Send us a sketch.</span></p>
          <a href={wa('Hello CiGa Raw Tattoo Studio, I have an idea for a tattoo.')} target="_blank" rel="noopener noreferrer" className="btn bg-wa text-ink before:bg-paper">
            <WhatsAppIcon className="w-4 h-4" /> Send references
          </a>
        </div>
      </section>
    </>
  )
}
