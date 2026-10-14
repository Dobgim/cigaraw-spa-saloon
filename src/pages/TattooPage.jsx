import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'

const tattooStyles = [
  {
    name: 'Fine-Line & Script',
    desc: 'Delicate single-needle execution for meaningful quotes, botanical leaves, birth dates, and minimalist silhouettes.',
    rate: 'From 15,000 FCFA',
  },
  {
    name: 'Afro-Centric & Tribal Geometry',
    desc: 'Intricate patterns honoring Cameroonian Grassfields culture, royal chevrons, cowrie symbols, and ancestral motifs.',
    rate: 'From 25,000 FCFA',
  },
  {
    name: 'Bold Blackwork & Heavy Contrast',
    desc: 'Deep solid black saturation engineered specifically for rich dark melanin skin tones to ensure high contrast and longevity.',
    rate: 'From 30,000 FCFA',
  },
  {
    name: 'Micro-Realism & Portraits',
    desc: 'Photographic fidelity portraits of loved ones, wildlife, or sacred icons with realistic depth and shading.',
    rate: 'From 40,000 FCFA',
  },
  {
    name: 'Cover-Up & Scar Camouflage',
    desc: 'Expert redesigns turning old, unwanted tattoos or surgical scars into breathtaking fresh artwork.',
    rate: 'Custom Quote',
  },
  {
    name: 'Geometric & Sacred Mandalas',
    desc: 'Mathematically balanced symmetry, dotwork stippling, and sacred geometry flowing naturally with your anatomy.',
    rate: 'From 25,000 FCFA',
  },
]

const processSteps = [
  { num: '01', title: 'Consultation & Concept', desc: 'Discuss your idea, size, placement on the body, and artistic direction with our resident artist.' },
  { num: '02', title: 'Custom Digital Draft', desc: 'We design a bespoke digital stencil tailored to your specific anatomy and refine it until you are 100% satisfied.' },
  { num: '03', title: 'Sterile Inking Session', desc: 'Conducted in a private clinical studio using factory-sealed single-use needles and premium vegan pigments.' },
  { num: '04', title: 'Dermal Bandage & Aftercare', desc: 'We seal the tattoo with breathable medical dermal film and provide you with our organic aftercare balm.' },
]

const aftercareTips = [
  { day: 'Days 1 – 3', title: 'Keep Protected', tip: 'Leave the medical dermal film on. Avoid soaking, swimming, and direct sunlight.' },
  { day: 'Days 4 – 7', title: 'Gentle Wash & Moisturize', tip: 'Wash with fragrance-free antibacterial soap and pat dry. Apply thin layer of healing balm.' },
  { day: 'Days 8 – 14', title: 'Peeling & Flaking', tip: 'Do not scratch or pick peeling skin. Continue light hydration with organic shea butter.' },
  { day: 'Long-term', title: 'Sun Protection', tip: 'Apply SPF 50 sunscreen when outdoors to keep dark pigments vibrant for decades.' },
]

export default function TattooPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Body Art Studio &bull; Bamenda, Cameroon"
        title="Custom Tattoo"
        highlight="&amp; Body Art"
        subtitle="Where your personal narrative becomes wearable art. Sterile clinical hygiene, custom Afro-centric designs, and master needlework on Commercial Avenue."
        image="/images/tattoo_section.jpg"
        breadcrumb="Tattoo Studio"
      />

      {/* Studio Philosophy & Dual Imagery */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">The Philosophy</p>
            <h2 className="section-title">
              Living Art on <em>Living Canvas</em>
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-200 text-lg leading-relaxed mb-6">
              A tattoo is a permanent testament to your milestones, your heritage, and your identity. In our Bamenda studio, we reject cookie-cutter flash art in favor of thoughtful, custom-drawn designs crafted specifically for your body.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              Our artists specialize in tattooing on dark brown skin tones — utilizing specialized needle groupings and pigment saturation techniques that maintain crisp lines and rich contrast without scarring or blowout.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking?service=Tattoo%20Consultation" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Book Artist Consultation
              </Link>
              <Link to="/gallery" className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                View Tattoo Portfolio
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative h-[340px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/tattoo_section.jpg"
                alt="Tattoo artist tattooing client in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
            </div>
            <div className="relative h-[220px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/tattoo_art.jpg"
                alt="Detailed close up of custom tattoo on skin"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-display text-xl text-white">500+ Custom Works Inked</span>
                <span className="text-xs font-sans tracking-widest text-gold-400 uppercase block">100% Sterile Track Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tattoo Styles Grid */}
      <section className="py-24 bg-dark-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Disciplines &amp; Techniques</p>
            <h2 className="section-title">
              Our Tattoo <em>Specialties</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Every style executed with specialized needle depth and hospital-grade sterilization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tattooStyles.map((st) => (
              <div
                key={st.name}
                className="p-8 border border-gold-500/15 bg-dark-950/80 hover:border-gold-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-sans tracking-widest text-gold-400 uppercase font-semibold">
                      {st.rate}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">{st.name}</h3>
                  <div className="gold-divider mb-4" />
                  <p className="font-serif text-dark-300 text-sm leading-relaxed mb-6">{st.desc}</p>
                </div>

                <Link
                  to={`/booking?service=Tattoo%20Session&notes=${encodeURIComponent(st.name)}`}
                  className="btn-outline-gold w-full text-center py-2.5 text-xs tracking-widest uppercase block"
                >
                  Consult for This Style
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Step Process */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <p className="eyebrow">From Thought to Skin</p>
          <h2 className="section-title">
            The Consultation <em>Journey</em>
          </h2>
          <div className="gold-divider mx-auto my-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.num} className="border border-gold-500/15 bg-dark-900/40 p-8 relative">
              <span className="font-display text-5xl text-gold-500/25 block mb-4 leading-none font-bold">
                {step.num}
              </span>
              <h3 className="font-sans font-semibold text-white text-base mb-2">{step.title}</h3>
              <p className="font-serif text-dark-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aftercare Guide */}
      <section className="py-20 bg-dark-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow">Healing &amp; Longevity</p>
              <h2 className="section-title">
                Tattoo <em>Aftercare Guide</em>
              </h2>
            </div>
            <p className="font-serif text-dark-300 text-sm max-w-md">
              A great tattoo is 50% artist technique and 50% proper aftercare. Follow our proven protocol for vibrant healing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aftercareTips.map((tip) => (
              <div key={tip.day} className="p-6 border border-gold-500/15 bg-dark-950">
                <span className="text-xs font-sans tracking-widest text-gold-400 uppercase font-mono block mb-1">
                  {tip.day}
                </span>
                <h3 className="font-sans font-semibold text-white text-base mb-2">{tip.title}</h3>
                <p className="font-serif text-dark-400 text-xs leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Have an Idea for a Tattoo?</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Book a private design consultation or send your reference images directly to our Bamenda artists on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking?service=Tattoo%20Consultation" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
              Book Studio Consultation
            </Link>
            <a
              href="https://wa.me/237677123456?text=Hello%20Cigaraw%20Tattoo%20Studio%2C%20I%20have%20an%20idea%20for%20a%20tattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase inline-flex items-center gap-2.5 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
              <span>Send Reference on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
