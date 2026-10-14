import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const values = [
  {
    num: '01',
    title: 'Hospital-Grade Hygiene',
    desc: 'Sterilization is non-negotiable. Every shear, clipper guard, and razor undergoes autoclave sanitation, and all straight razor blades are single-use sealed surgical steel.',
  },
  {
    num: '02',
    title: 'Bespoke Craftsmanship',
    desc: 'No hurried assembly-line cuts. Our master barbers and certified spa practitioners spend dedicated time listening and tailoring each ritual to your unique anatomy.',
  },
  {
    num: '03',
    title: 'Acoustic & Sensory Comfort',
    desc: 'From our curated background acoustics to our warm Edison ambient lighting and complimentary aged espresso bar, every visit feels like a restorative retreat.',
  },
  {
    num: '04',
    title: 'Cameroonian Cultural Pride',
    desc: 'Rooted firmly in the heritage of Bamenda and the North West Region, we fuse traditional African hospitality with cutting-edge global barbering standards.',
  },
]

const milestones = [
  { year: '2024', title: 'The Vision Conceived', desc: 'Cigaraw Saloon & Spa opens its doors on Commercial Avenue in Bamenda to bring world-class grooming to Cameroon.' },
  { year: '2024', title: 'VIP Suite Launch', desc: 'Unveiled Bamenda’s first sound-isolated private executive grooming suite for leaders and dignitaries.' },
  { year: '2025', title: 'Custom Tattoo Studio', desc: 'Introduced sterile body art specializing in Afro-centric tribal geometry, fine-line, and script work.' },
  { year: '2026', title: '2+ Years of Excellence', desc: 'Over 5,000 happy clients served with a 4.9-star average rating and 12 expert resident artists.' },
]

export default function AboutPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Our Story &bull; Commercial Avenue, Bamenda"
        title="About"
        highlight="Cigaraw"
        subtitle="Born in 2024 with a singular mission: to provide the people of Bamenda with a world-class sanctuary where grooming is elevated into an art form."
        image="/images/hero_barber.jpg"
        breadcrumb="About Us"
      />

      {/* Origin Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">The Origin</p>
            <h2 className="section-title">
              Crafted with Pride in <em>Bamenda</em>
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-200 text-lg leading-relaxed mb-6">
              In 2024, Cigaraw was founded on Commercial Avenue, Bamenda, with a bold premise: men and women in Cameroon deserve a grooming experience that rivals the finest luxury salons in London, Paris, or New York.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-6">
              We noticed that too many salons rushed clients through impersonal haircuts, neglected tool hygiene, or provided noisy, uncomfortable environments. Cigaraw was built to be the antidote — a haven of dignity, meticulous skill, and warm camaraderie.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              Today, with 2+ years of continuous excellence, 12 resident master artists, and over 5,000 satisfied patrons, we remain committed to elevating personal care in the North West Region.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-gold-500/10 pt-6">
              <div>
                <p className="font-display text-4xl text-gold-400">2+</p>
                <p className="text-xs font-sans tracking-widest text-dark-300 uppercase mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="font-display text-4xl text-gold-400">5,000+</p>
                <p className="text-xs font-sans tracking-widest text-dark-300 uppercase mt-1">Patrons Groomed</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/hero_barber.jpg"
                alt="Master Barber in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark-950/85 backdrop-blur-md border border-gold-400/30">
                <p className="font-serif italic text-white text-sm">
                  &ldquo;A haircut is not just maintenance; it is an elevation of confidence and self-respect.&rdquo;
                </p>
                <p className="text-xs font-sans tracking-widest text-gold-400 uppercase mt-2">
                  &mdash; Cigaraw Master Barber Philosophy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-dark-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="section-title">
              What We <em>Stand For</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Our four foundational values guiding every haircut, shave, facial therapy, and tattoo session.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.num} className="p-8 border border-gold-500/15 bg-dark-950 flex flex-col justify-between">
                <div>
                  <span className="font-display text-4xl text-gold-500/30 font-bold block mb-4">
                    {v.num}
                  </span>
                  <h3 className="font-sans font-semibold text-white text-lg mb-3">{v.title}</h3>
                  <div className="w-8 h-px bg-gold-400/40 mb-4" />
                  <p className="font-serif text-dark-300 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <p className="eyebrow">Our Journey</p>
          <h2 className="section-title">
            Milestones of <em>Distinction</em>
          </h2>
          <div className="gold-divider mx-auto my-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <div key={i} className="p-6 border border-gold-500/15 bg-dark-900/40 relative">
              <span className="text-xs font-mono font-bold tracking-widest text-gold-400 block mb-2">
                {m.year}
              </span>
              <h3 className="font-sans font-semibold text-white text-base mb-2">{m.title}</h3>
              <p className="font-serif text-dark-400 text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Invitation Section */}
      <section className="py-20 bg-dark-900 border-t border-gold-500/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Experience the Standard</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Visit our salon on Commercial Avenue, Bamenda, and discover how our craftsmen bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
              Book Appointment
            </Link>
            <Link to="/services" className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
