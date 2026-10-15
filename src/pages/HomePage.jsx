import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import WhatsAppIcon from '../components/WhatsAppIcon'

const pillars = [
  {
    num: '01',
    title: 'Master Barbering',
    tag: 'Precision & Fades',
    desc: 'From razor-sharp skin fades to meticulous beard sculpting and traditional hot-towel straight razor shaves.',
    image: '/images/gallery_haircut.jpg',
    path: '/barbing',
    cta: 'Explore Barbering',
  },
  {
    num: '02',
    title: 'Luxury Spa Therapies',
    tag: 'Rejuvenation',
    desc: 'Bespoke facial rejuvenation, deep-tissue therapy, and relaxing head-to-toe body rituals tailored for pure stress relief.',
    image: '/images/spa_suite.jpg',
    path: '/services',
    cta: 'View Spa Menu',
  },
  {
    num: '03',
    title: 'VIP Executive Suite',
    tag: 'Private Sanctuaries',
    desc: 'Complete acoustic seclusion, personal grooming butler, complimentary aged spirits bar, and dedicated private showers.',
    image: '/images/vip_section.jpg',
    path: '/vip',
    cta: 'Discover VIP Suite',
  },
  {
    num: '04',
    title: 'Tattoo & Body Art',
    tag: 'Custom Ink',
    desc: 'Resident tattoo artists specializing in fine-line, bold blackwork, African tribal patterns, and custom body masterpieces.',
    image: '/images/tattoo_section.jpg',
    path: '/tattoo',
    cta: 'View Tattoo Studio',
  },
]

const reviews = [
  {
    name: 'Nchinda Bertrand',
    role: 'Business Owner, Bamenda',
    text: 'Nothing in Bamenda touches Cigaraw. The attention to detail, the clean environment, the skilled hands — this place has completely changed how I think about grooming.',
  },
  {
    name: 'Tabi Godwill',
    role: 'Creative Director',
    text: 'My skin fade was on point. These barbers actually know what they are doing — proper technique, clean tools, and genuine care. None of us have looked back.',
  },
  {
    name: 'Fru Valerie',
    role: 'Entrepreneur',
    text: 'The spa service was unreal. I came in stressed and left completely renewed. Cigaraw is a genuine gem right here on Commercial Avenue in Bamenda.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-dark-950">
      {/* Hero Section */}
      <Hero />

      {/* Marquee ticker */}
      <div className="overflow-hidden py-4 border-y border-gold-500/10 bg-dark-900/60">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-xs font-sans tracking-[0.4em] text-gold-500/50 uppercase whitespace-nowrap">
              Bamenda's Premier Saloon &bull; Master Barbering &bull; Luxury Spa &bull; Custom Tattoo Art &bull; Private VIP Suite &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* About Us Story Section on Home Page */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-b border-gold-500/10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">About Cigaraw &bull; Bamenda Roots</p>
            <h2 className="section-title">
              Crafted in 2024,<br />Elevated with <em>Passion</em>
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-200 text-lg leading-relaxed mb-6">
              Located on Commercial Avenue in Bamenda, Cigaraw Saloon &amp; Spa was founded with a clear intention: to bring authentic luxury, hospital-grade hygiene, and master craftsmanship together under one distinguished roof.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              Over 2+ years of excellence, we have transformed everyday grooming into an art form. From seamless skin fades and therapeutic hot stone rituals to custom tribal body ink and our private VIP suite, our sanctuary is designed for those who carry themselves with pride.
            </p>

            {/* Quick value cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="border border-gold-500/20 bg-dark-900/40 p-4">
                <span className="font-display text-3xl text-gold-400 block">2+</span>
                <span className="text-[0.65rem] font-sans tracking-widest text-dark-300 uppercase mt-1 block">Years of Mastery</span>
              </div>
              <div className="border border-gold-500/20 bg-dark-900/40 p-4">
                <span className="font-display text-3xl text-gold-400 block">5k+</span>
                <span className="text-[0.65rem] font-sans tracking-widest text-dark-300 uppercase mt-1 block">Satisfied Clients</span>
              </div>
              <div className="border border-gold-500/20 bg-dark-900/40 p-4">
                <span className="font-display text-3xl text-gold-400 block">100%</span>
                <span className="text-[0.65rem] font-sans tracking-widest text-dark-300 uppercase mt-1 block">Sterile Guarantee</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Read Our Story &rarr;
              </Link>
              <Link to="/booking" className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Reserve Appointment
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[480px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/hero_barber.jpg"
                alt="Cigaraw Master Barber at work in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              <div className="absolute top-6 right-6 bg-dark-950/90 border border-gold-400/40 px-4 py-2 backdrop-blur-sm">
                <span className="text-xs font-sans tracking-widest text-gold-400 uppercase font-semibold">
                  Est. 2024 &bull; Bamenda
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark-950/85 backdrop-blur-md border border-gold-400/30">
                <p className="font-serif italic text-white text-sm">
                  &ldquo;A haven of dignity, meticulous skill, and warm camaraderie on Commercial Avenue.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars / Dedicated Portals */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow">The Cigaraw Standard</p>
            <h2 className="section-title">
              Our Four <em>Pillars</em>
            </h2>
          </div>
          <p className="font-serif text-dark-300 text-base md:text-lg max-w-md leading-relaxed">
            Every department is an independent sanctuary of craftsmanship. Click any pillar to explore its dedicated menu and details.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              to={pillar.path}
              className="group relative border border-gold-500/15 bg-dark-900/40 overflow-hidden hover:border-gold-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image aspect ratio container */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1 bg-dark-950/80 border border-gold-400/30 text-gold-400 text-xs font-sans tracking-widest uppercase backdrop-blur-sm">
                  {pillar.tag}
                </span>
                <span className="absolute top-5 right-5 font-mono text-xs text-white/60 tracking-widest">
                  {pillar.num}
                </span>
              </div>

              {/* Text content */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl text-white tracking-wider group-hover:text-gold-400 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <div className="gold-divider my-4" />
                  <p className="font-serif text-dark-300 text-base leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gold-400 text-xs font-sans tracking-widest uppercase font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>{pillar.cta}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bamenda Flagship Spotlight */}
      <section className="py-24 bg-dark-900 relative overflow-hidden border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">Bamenda Flagship</p>
            <h2 className="section-title">
              Crafted in <em>Bamenda</em>,<br />Built for Distinction
            </h2>
            <div className="gold-divider my-6" />
            <p className="font-serif text-dark-300 text-lg leading-relaxed mb-6">
              Located conveniently on Commercial Avenue in Bamenda, Cigaraw was designed from the ground up to redefine high-end personal grooming in Cameroon.
            </p>
            <p className="font-serif text-dark-400 text-base leading-relaxed mb-8">
              We combine world-class barbering equipment, certified spa practitioners, hospital-grade tattoo sterilization, and an uncompromised commitment to client comfort.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-2 border-gold-400 pl-4">
                <p className="font-display text-3xl text-white">Commercial Ave</p>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase mt-1">Prime Bamenda Address</p>
              </div>
              <div className="border-l-2 border-gold-400 pl-4">
                <p className="font-display text-3xl text-white">7 Days</p>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase mt-1">Open Every Week</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking" className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                Book Your Visit
              </Link>
              <Link to="/gallery" className="btn-outline-gold px-8 py-3.5 text-xs tracking-widest uppercase">
                View Gallery
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[480px] overflow-hidden border border-gold-500/20">
              <img
                src="/images/spa_suite.jpg"
                alt="Cigaraw Saloon interior in Bamenda"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark-950/85 backdrop-blur-md border border-gold-400/30">
                <p className="font-display text-2xl text-white">The Sanctuary Experience</p>
                <p className="font-serif text-xs text-dark-300 mt-1">Warm ambient lighting, acoustic seclusion &amp; handcrafted leather appointments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Summary */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <p className="eyebrow">Client Endorsements</p>
          <h2 className="section-title">
            Words from <em>Our Patrons</em>
          </h2>
          <div className="gold-divider mx-auto my-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div key={rev.name} className="border border-gold-500/15 bg-dark-900/30 p-8 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-gold-400 mb-4">
                  {'★★★★★'}
                </div>
                <p className="font-serif text-dark-200 text-base leading-relaxed italic mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-gold-500/10">
                <p className="font-sans font-semibold text-white text-sm">{rev.name}</p>
                <p className="font-serif text-xs text-gold-500 mt-0.5">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big Action Banner */}
      <section className="py-20 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950 border-t border-gold-500/15">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="eyebrow">Personalized Grooming</p>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider mb-6">
            Ready to Experience the <em>Cigaraw Standard?</em>
          </h2>
          <p className="font-serif text-dark-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Book online in under 60 seconds or reach out to our concierge on WhatsApp for VIP bookings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
              Schedule Appointment
            </Link>
            <a
              href="https://wa.me/237679170410?text=Hello%20CiGa%20Raw%2C%20I%20would%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase inline-flex items-center gap-2.5 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
