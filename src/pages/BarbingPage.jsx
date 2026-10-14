import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const cuts = [
  { name: 'Classic Precision Cut',     desc: 'Timeless scissor and clipper styling tailored to your natural hairline',    price: '3,000 FCFA', time: '35 min' },
  { name: 'Seamless Skin Fade',        desc: 'Low, mid, high, or taper fade blended with razor-sharp detailing',          price: '4,500 FCFA', time: '50 min' },
  { name: 'Beard Sculpt & Definition', desc: 'Symmetrical shaping, straight-razor cheek lines, and beard oil hydration', price: '2,500 FCFA', time: '30 min' },
  { name: 'Hot Towel Straight Razor',  desc: 'Triple steamed eucalyptus towels, rich pre-shave lather, and smooth shave',  price: '4,000 FCFA', time: '45 min' },
  { name: 'Hairline Shape-Up & Line',  desc: 'Crisp perimeter edging, temple tapers, and neck clean-up',                  price: '2,000 FCFA', time: '20 min' },
  { name: 'Hair Tint & Darkening',     desc: 'Natural black or brown tone enhancement for hair or grey beard coverage',   price: '4,000 FCFA', time: '40 min' },
  { name: 'Father & Son Duo Cut',      desc: 'Shared bonding session for father and young son in side-by-side chairs',     price: '7,000 FCFA', time: '60 min' },
  { name: 'Full Signature Experience', desc: 'Skin fade + Beard sculpt + Hot towel shave + facial moisturizer massage',   price: '10,000 FCFA', time: '80 min' },
]

const styles = [
  {
    name: 'Skin Fade / Bald Fade',
    desc: 'Seamless transition down to bare skin at the base, creating maximum contrast with the top hair.',
    popularity: 'Very High',
  },
  {
    name: 'Afro Taper & Edge',
    desc: 'Keeping full natural volume on top while cleaning up the sideburns and neckline for a sleek silhouette.',
    popularity: 'Bamenda Favorite',
  },
  {
    name: 'Burst Fade & Mohican',
    desc: 'Curved gradient fading around the ears, highlighting curly or sponge-textured hair on top.',
    popularity: 'Trendy',
  },
  {
    name: 'Low Drop Fade',
    desc: 'Subtle fade dipping lower behind the crown, ideal for professional business executives.',
    popularity: 'Classic',
  },
  {
    name: '360 Waves & Crisp Edges',
    desc: 'Deep wave definition with surgical temple lineups and sharp razor cleanups.',
    popularity: 'Signature',
  },
  {
    name: 'Custom Hair Tattoo Art',
    desc: 'Hand-sculpted geometric or tribal linework etched directly into the fade using precision clippers.',
    popularity: 'Creative',
  },
]

const hygieneRules = [
  { title: 'Autoclave & UV Sterilization', desc: 'Every metal clipper guard, shear, and comb undergoes multi-stage medical grade sterilization between clients.' },
  { title: 'Single-Use Blades Only', desc: 'Straight razors use factory-sealed, single-use surgical steel blades unwrapped directly in front of you.' },
  { title: 'Fresh Capes & Sanitized Seats', desc: 'Clean, sanitized barber capes and hospital-grade surface disinfection on our leather chairs for every patron.' },
  { title: 'Premium Organic Formulations', desc: 'We only use tested, skin-safe alcohol-free aftershave balms, organic shea butters, and tea tree scalp tonics.' },
]

export default function BarbingPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="The Craft &bull; Bamenda, Cameroon"
        title="Master Barbering"
        highlight="Lounge"
        subtitle="Where precision scissor artistry and classic clipper mastery meet modern gentleman grooming on Commercial Avenue, Bamenda."
        image="/images/gallery_haircut.jpg"
        breadcrumb="Master Barbering"
      />

      {/* Intro section with photo */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">The Cigaraw Standard</p>
            <h2 className="section-title">
              Craftsmanship in <em>Every Stroke</em>
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-200 text-lg leading-relaxed mb-6">
              A great haircut is not just maintenance; it is an elevation of confidence. At Cigaraw in Bamenda, our barbers are master craftsmen who respect the architecture of every face shape and hair texture.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              Whether you require a razor-sharp fade for a boardroom presentation, an intricate Afro taper, or an old-world hot-towel straight razor shave, we take the time to deliver unmatched perfection.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking?service=Skin%20Fade" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Book a Barber Chair
              </Link>
              <Link to="/gallery" className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                View Barbering Lookbook
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[480px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/barber_service.jpg"
                alt="Master barber cutting hair in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark-950/85 backdrop-blur-md border border-gold-400/30">
                <p className="font-display text-2xl text-white">12+ Years of Combined Mastery</p>
                <p className="font-serif text-xs text-dark-300 mt-1">Our resident barbers are certified in advanced Afro-hair texturing and razor geometry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu & Pricing Table */}
      <section className="py-24 bg-dark-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Price Menu</p>
            <h2 className="section-title">
              Barbering <em>Rates</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Transparent rates in Central African CFA Franc (FCFA). No hidden fees. Walk-ins welcomed, reservations prioritized.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {cuts.map((cut) => (
              <div
                key={cut.name}
                className="border border-gold-500/15 bg-dark-950/70 p-6 flex items-start justify-between gap-4 hover:border-gold-400/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-sans font-semibold text-white text-base tracking-wide">{cut.name}</h3>
                    <span className="text-[0.65rem] font-sans text-dark-400 border border-gold-500/20 px-2 py-0.5">
                      {cut.time}
                    </span>
                  </div>
                  <p className="font-serif text-dark-400 text-sm mt-1 leading-relaxed">{cut.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-display text-gold-400 text-xl block">{cut.price}</span>
                  <Link
                    to={`/booking?service=${encodeURIComponent(cut.name)}`}
                    className="text-[0.65rem] font-sans text-gold-500 hover:text-white uppercase tracking-wider mt-2 inline-block font-semibold"
                  >
                    Select &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase inline-block">
              Book Your Appointment Now
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Haircut Styles */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow">Style Gallery</p>
            <h2 className="section-title">
              Signature <em>Cuts &amp; Styles</em>
            </h2>
          </div>
          <p className="font-serif text-dark-300 text-base max-w-md">
            Our most requested haircut styles crafted daily in our Bamenda barbershop chairs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((st) => (
            <div key={st.name} className="border border-gold-500/15 bg-dark-900/40 p-6 hover:border-gold-400/40 transition-colors">
              <span className="text-[0.65rem] tracking-widest font-sans uppercase text-gold-500 block mb-2 font-mono">
                {st.popularity}
              </span>
              <h3 className="font-display text-2xl text-white mb-2">{st.name}</h3>
              <p className="font-serif text-dark-300 text-sm leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hygiene & Sterilization Section */}
      <section className="py-20 bg-dark-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Safety &amp; Cleanliness</p>
            <h2 className="section-title">
              Our Hygiene <em>Guarantee</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Your safety is sacred. We operate with strict clinical sterilization standards unmatched anywhere in Bamenda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hygieneRules.map((rule) => (
              <div key={rule.title} className="p-6 border border-gold-500/15 bg-dark-950">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4 text-sm font-bold">
                  ✓
                </div>
                <h3 className="font-sans font-semibold text-white text-base mb-2">{rule.title}</h3>
                <p className="font-serif text-dark-400 text-xs leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-dark-950 text-center border-t border-gold-500/10">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Ready for a Fresh Cut?</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Walk into our salon on Commercial Avenue or secure your favorite barber by booking ahead.
          </p>
          <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
            Reserve Your Chair
          </Link>
        </div>
      </section>
    </div>
  )
}
