import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const categories = ['All Services', 'Barbering', 'Spa & Facial', 'VIP Suite', 'Tattoo Art']

const allServices = [
  // Barbering
  {
    category: 'Barbering',
    name: 'Classic Precision Cut',
    duration: '40 min',
    price: '3,000 FCFA',
    desc: 'Bespoke scissor and clipper styling tailored precisely to your head shape, lifestyle, and hair texture.',
    perks: ['Consultation', 'Shampoo & Conditioning', 'Light hot towel finish'],
  },
  {
    category: 'Barbering',
    name: 'Signature Skin Fade',
    duration: '50 min',
    price: '4,500 FCFA',
    desc: 'High, mid, low or drop fade blended to perfection with razor-sharp detailing and natural lineup.',
    perks: ['Foil shaver gradient', 'Crisp perimeter line-up', 'Premium styling balm'],
  },
  {
    category: 'Barbering',
    name: 'Beard Sculpt & Treatment',
    duration: '35 min',
    price: '2,500 FCFA',
    desc: 'Volumizing beard wash, straight-razor cheek line sculpting, trim, and organic beard oil hydration.',
    perks: ['Beard steam therapy', 'Straight-razor edging', 'Organic beard butter'],
  },
  {
    category: 'Barbering',
    name: 'Traditional Hot Towel Shave',
    duration: '45 min',
    price: '4,000 FCFA',
    desc: 'The timeless barbershop ritual. Triple hot towels, pre-shave lather, straight razor glide, and soothing aftershave balm.',
    perks: ['Eucalyptus infused towels', 'Double-pass straight razor', 'Cold-towel pore closer'],
  },
  {
    category: 'Barbering',
    name: 'Full Signature Hair & Beard Package',
    duration: '75 min',
    price: '10,000 FCFA',
    desc: 'The complete grooming overhaul: Skin fade or classic cut + full beard sculpt + hot towel facial cleanse.',
    perks: ['Full haircut & beard sculpt', 'Hot towel facial massage', 'Complimentary drink'],
  },

  // Spa
  {
    category: 'Spa & Facial',
    name: 'Gentleman’s Deep Cleanse Facial',
    duration: '60 min',
    price: '10,000 FCFA',
    desc: 'Deep ultrasonic pore cleansing, volcanic scrub exfoliation, blackhead extraction, and balancing serum.',
    perks: ['Steam extraction', 'Clay mask', 'Hydrating SPF massage'],
  },
  {
    category: 'Spa & Facial',
    name: 'Royal Botanical Facial',
    duration: '90 min',
    price: '15,000 FCFA',
    desc: 'Premium holistic facial using natural African botanical extracts, lymphatic drainage, and 24k gold essence.',
    perks: ['24k gold leaf serum', 'Acupressure face massage', 'Neck & shoulder relief'],
  },
  {
    category: 'Spa & Facial',
    name: 'Full Body Deep Tissue Massage',
    duration: '60 min',
    price: '10,000 FCFA',
    desc: 'Therapeutic pressure targeted at chronic muscular knots, tension along the spine, and post-workout recovery.',
    perks: ['Warm aromatherapy oils', 'Targeted myofascial release', 'Herbal tea post-session'],
  },
  {
    category: 'Spa & Facial',
    name: 'Heated Basalt Stone Therapy',
    duration: '75 min',
    price: '12,000 FCFA',
    desc: 'Smooth volcanic stones heated to optimum temperature to melt away deep muscular stress and restore energy flow.',
    perks: ['Volcanic stones', 'Full spine therapy', 'Stress relief guarantee'],
  },

  // VIP Suite
  {
    category: 'VIP Suite',
    name: 'Executive Suite Day Pass',
    duration: '2 Hours',
    price: '20,000 FCFA',
    desc: 'Private single-client grooming room with complimentary spirits, streaming entertainment, and priority service.',
    perks: ['Dedicated grooming butler', 'Spirits & espresso bar', 'Haircut + Hot towel shave'],
  },
  {
    category: 'VIP Suite',
    name: 'Royal VIP Rejuvenation Ritual',
    duration: '3.5 Hours',
    price: '35,000 FCFA',
    desc: 'The ultimate luxury experience: Full Hair & Beard Signature Package, Royal Botanical Facial, and 60-min Deep Tissue Massage.',
    perks: ['Complete suite privacy', 'Private rain shower', 'Signature Cigaraw gift pack'],
  },

  // Tattoo
  {
    category: 'Tattoo Art',
    name: 'Custom Tattoo Consultation & Sketch',
    duration: '45 min',
    price: '5,000 FCFA (Credited to tattoo)',
    desc: 'One-on-one sitting with our lead tattoo artist to conceptualize, size, and create custom stencils.',
    perks: ['Digital design mockups', 'Skin tone color matching', 'Sterile hygiene walk-through'],
  },
  {
    category: 'Tattoo Art',
    name: 'Fine-Line & Script Tattoo',
    duration: '1 - 2 Hours',
    price: 'From 15,000 FCFA',
    desc: 'Micro-precision needles for elegant quotes, memorial scripts, minimalist symbols, and delicate outlines.',
    perks: ['Single-use sterile needles', 'Vegan black inks', 'Medical grade dermal bandage'],
  },
  {
    category: 'Tattoo Art',
    name: 'Afro-Centric & Tribal Blackwork',
    duration: 'Half-Day Session',
    price: 'From 30,000 FCFA',
    desc: 'Bold, striking African patterns, Bamenda cultural geometry, and solid black ink saturation crafted to last.',
    perks: ['Custom cultural motifs', 'High-density pigment', 'Free touch-up session'],
  },
]

const packages = [
  {
    title: "Groom's Royal Wedding Package",
    price: '25,000 FCFA',
    subtitle: 'The ultimate preparation for your special wedding day.',
    items: ['Master Haircut & Razor Lineup', 'Hot Towel Beard Sculpting', 'Deep Hydration Mini-Facial', 'Hand Grooming & Manicure', 'Glass of aged whiskey'],
  },
  {
    title: 'The Father & Son Tradition',
    price: '10,000 FCFA',
    subtitle: 'Pass down the timeless ritual of classic barbering.',
    items: ['Two Full Signature Cuts', 'Clean Razor Finishes', 'Scalp Refresh & Styling', 'Complimentary soft beverages'],
  },
  {
    title: 'Executive Monthly Membership',
    price: '40,000 FCFA / Month',
    subtitle: 'Unlimited cuts, VIP suite privileges, and priority booking.',
    items: ['4 Haircuts + Beard Trims per month', '1 Complimentary Deep Tissue Massage', 'VIP Suite access on each visit', '15% off Tattoo Studio services'],
  },
]

export default function ServicesPage() {
  const [selectedCat, setSelectedCat] = useState('All Services')

  const filtered = selectedCat === 'All Services'
    ? allServices
    : allServices.filter(s => s.category === selectedCat)

  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Comprehensive Price List &bull; Bamenda"
        title="Our Services"
        highlight="&amp; Rates"
        subtitle="Transparent pricing in Central African CFA Franc (FCFA). Every service includes master craftsmanship and premium grooming products."
        image="/images/spa_suite.jpg"
        breadcrumb="Services & Menu"
      />

      {/* Category selector */}
      <section className="py-12 border-b border-gold-500/10 sticky top-[72px] z-30 bg-dark-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                selectedCat === cat
                  ? 'btn-gold text-dark-950 font-semibold shadow-gold'
                  : 'border border-gold-500/20 text-dark-300 hover:text-white hover:border-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="border border-gold-500/15 bg-dark-900/40 p-8 flex flex-col justify-between hover:border-gold-400/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[0.65rem] tracking-[0.25em] text-gold-400 uppercase font-sans border border-gold-500/30 px-2.5 py-1 bg-dark-950">
                    {item.category}
                  </span>
                  <span className="text-xs font-serif text-dark-400">
                    ⏱ {item.duration}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-white tracking-wide group-hover:text-gold-400 transition-colors">
                  {item.name}
                </h3>
                <p className="font-display text-2xl text-gold-400 mt-2 mb-4">
                  {item.price}
                </p>
                <div className="gold-divider mb-4" />
                <p className="font-serif text-dark-300 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Perks */}
                <div className="space-y-2 mb-8">
                  {item.perks.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-serif text-dark-300">
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/booking?service=${encodeURIComponent(item.name)}`}
                className="btn-outline-gold w-full text-center py-3 text-xs tracking-widest uppercase block"
              >
                Book This Service
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Packages */}
      <section className="py-24 bg-dark-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Curated Collections</p>
            <h2 className="section-title">
              Signature <em>Packages</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Combining our finest barbering, spa, and VIP privileges for unforgettable grooming milestones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.title} className="border border-gold-400/30 bg-dark-950 p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 -mr-12 -mt-12 rounded-full pointer-events-none" />
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wide">{pkg.title}</h3>
                  <p className="font-display text-3xl text-gold-400 my-3">{pkg.price}</p>
                  <p className="font-serif text-dark-400 text-xs mb-6 leading-relaxed">{pkg.subtitle}</p>
                  <div className="gold-divider mb-6" />

                  <ul className="space-y-3 mb-8">
                    {pkg.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-serif text-dark-200">
                        <span className="text-gold-400 font-bold">&check;</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/booking?package=${encodeURIComponent(pkg.title)}`}
                  className="btn-gold w-full text-center py-3.5 text-xs tracking-widest uppercase block"
                >
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/10 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="eyebrow">Personalized Inquiries</p>
          <h2 className="font-display text-4xl text-white mb-4">Have Questions About Pricing?</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Our front desk at Commercial Avenue in Bamenda is ready to help you plan your appointments and group sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
              Book Appointment
            </Link>
            <a
              href="https://wa.me/237677123456?text=Hello%20Cigaraw%2C%20I%20have%20a%20question%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
