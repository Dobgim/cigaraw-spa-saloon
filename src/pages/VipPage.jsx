import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'

const amenities = [
  { icon: '🚪', title: 'Private Acoustic Seclusion', desc: 'Sound-isolated private room ensuring complete discretion during phone calls or private conversations.' },
  { icon: '🥃', title: 'Complimentary Spirits & Coffee', desc: 'Aged single malts, fine cognacs, and freshly pulled espresso available throughout your session.' },
  { icon: '👔', title: 'Wardrobe Refresh Service', desc: 'Complimentary jacket steam press and footwear detailing while you sit back and relax.' },
  { icon: '🚿', title: 'Private En-Suite Rain Shower', desc: 'Freshen up after deep-tissue therapy in our cedar-finished private rain shower.' },
  { icon: '🤵', title: 'Personal Grooming Butler', desc: 'One dedicated specialist managing your schedule, beverage preferences, and bespoke requests.' },
  { icon: '📺', title: 'Private Entertainment Hub', desc: 'High-speed fiber connectivity, curated jazz/afrobeats acoustics, and streaming screens.' },
]

const spaTreatments = [
  { name: 'Royal Botanical Facial',       duration: '90 min',  price: '15,000 FCFA', desc: '24k gold infusion serum, ultrasonic pore vacuuming, and natural African shea hydration.' },
  { name: 'Heated Basalt Stone Massage',  duration: '75 min',  price: '12,000 FCFA', desc: 'Volcanic basalt stones melting deep muscular stiffness along the spine and shoulders.' },
  { name: 'Executive Deep Tissue Therapy',duration: '60 min',  price: '10,000 FCFA', desc: 'Therapeutic pressure targeting chronic tension, knots, and travel fatigue.' },
  { name: 'VIP Full Body Ritual',         duration: '3.5 hrs', price: '35,000 FCFA', desc: 'The ultimate royal experience: Haircut, beard sculpt, full-body scrub, massage, and facial.' },
  { name: 'Scalp & Neck Aromatherapy',    duration: '45 min',  price: '8,000 FCFA',  desc: 'Warm peppermint and eucalyptus oil massage relieving mental fatigue and headache tension.' },
  { name: 'Executive Hand & Foot Grooming', duration: '60 min', price: '9,000 FCFA', desc: 'Therapeutic paraffin wax dip, nail shaping, cuticle care, and calf massage.' },
]

const tiers = [
  {
    tier: 'Executive Pass',
    price: '25,000 FCFA / Session',
    desc: 'Ideal for occasional VIP appointments when absolute privacy is required.',
    perks: ['2 Hours VIP Suite Access', 'Signature Haircut + Beard Sculpt', 'Complimentary Beverage Bar', 'Priority Booking Status'],
  },
  {
    tier: 'Black Card Monthly',
    price: '50,000 FCFA / Month',
    desc: 'Our premier private membership for Bamenda leaders and executives.',
    perks: ['Unlimited VIP Suite sessions', '4 Haircuts + Beard Sculptings', '2 Full Body Massages per month', 'Private entrance coordination', '15% Guest discount'],
  },
  {
    tier: 'Corporate Dignitary Group',
    price: 'Custom Quotation',
    desc: 'Full salon buyout for wedding parties, executive retreats, or delegations.',
    perks: ['Full VIP floor exclusivity', 'Catered refreshments & cigars', 'Multi-barber dedicated staffing', 'Custom event scheduling'],
  },
]

export default function VipPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Exclusive Retreat &bull; Bamenda"
        title="VIP Executive"
        highlight="Suite &amp; Spa"
        subtitle="Unmatched acoustic privacy, personal butler service, and world-class rejuvenation designed for those who value discretion and luxury."
        image="/images/vip_section.jpg"
        breadcrumb="VIP Suite"
      />

      {/* Main Feature Highlight */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative h-[520px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/vip_section.jpg"
                alt="VIP Suite interior in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-dark-950/90 border border-gold-400/40 px-5 py-3 backdrop-blur-md">
                <span className="font-display text-2xl text-gold-400 block">PRIVATE</span>
                <span className="text-[0.6rem] font-sans tracking-[0.3em] text-dark-300 uppercase">Single-Client Suite</span>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">A Sanctuary of Discretion</p>
            <h2 className="section-title">
              Designed for <em>Uncompromising</em> Solitude
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-200 text-lg leading-relaxed mb-6">
              In a fast-paced world, true luxury is privacy. Our VIP Executive Suite is a self-contained sanctuary where you can conduct confidential calls, unwind with a glass of aged spirit, and receive seamless master grooming away from the public floor.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              Whether preparing for a major business keynote, hosting an intimate pre-wedding celebration, or taking time out for physical rejuvenation, our suite provides an unmatched hospitality standard in Bamenda.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking?service=VIP%20Suite%20Experience" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Reserve the Suite
              </Link>
              <a
                href="https://wa.me/237679170410?text=Hello%20CiGa%20Raw%2C%20I%20would%20like%20to%20reserve%20the%20VIP%20Executive%20Suite"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center gap-2.5 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
                <span>VIP WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 bg-dark-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Every Detail Considered</p>
            <h2 className="section-title">
              Suite <em>Privileges</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-serif text-dark-300 text-base max-w-xl mx-auto">
              Included complimentary with every VIP Suite appointment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((item) => (
              <div key={item.title} className="p-8 border border-gold-500/15 bg-dark-950/60 hover:border-gold-400/40 transition-colors">
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-sans font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="font-serif text-dark-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Spa Treatment Menu */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <p className="eyebrow">Holistic Therapies</p>
          <h2 className="section-title">
            VIP Spa <em>Rituals</em>
          </h2>
          <div className="gold-divider mx-auto my-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {spaTreatments.map((tr) => (
            <div key={tr.name} className="border border-gold-500/15 bg-dark-900/40 p-6 flex items-start justify-between gap-6 hover:border-gold-400/40 transition-colors">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-sans font-semibold text-white text-base">{tr.name}</h3>
                  <span className="text-[0.65rem] text-dark-400 border border-gold-500/20 px-2 py-0.5">{tr.duration}</span>
                </div>
                <p className="font-serif text-dark-400 text-sm mt-1 leading-relaxed">{tr.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-display text-gold-400 text-xl block">{tr.price}</span>
                <Link
                  to={`/booking?service=${encodeURIComponent(tr.name)}`}
                  className="text-[0.65rem] font-sans text-gold-500 hover:text-white uppercase tracking-wider mt-2 inline-block font-semibold"
                >
                  Book &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 bg-dark-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Exclusive Access</p>
            <h2 className="section-title">
              VIP <em>Memberships</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((t) => (
              <div key={t.tier} className="border border-gold-500/20 bg-dark-950 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white">{t.tier}</h3>
                  <p className="font-display text-2xl text-gold-400 my-3">{t.price}</p>
                  <p className="font-serif text-dark-400 text-xs mb-6 leading-relaxed">{t.desc}</p>
                  <div className="gold-divider mb-6" />

                  <ul className="space-y-3 mb-8">
                    {t.perks.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-serif text-dark-200">
                        <span className="text-gold-400 font-bold">&check;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/booking"
                  className="btn-gold w-full text-center py-3.5 text-xs tracking-widest uppercase block"
                >
                  Inquire Membership
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Book the VIP Suite</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Advanced reservations are strongly recommended to ensure suite availability.
          </p>
          <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
            Schedule VIP Session
          </Link>
        </div>
      </section>
    </div>
  )
}
