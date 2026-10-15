import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 'barbing',
    image: '/images/barber_service.jpg',
    tag: 'Signature Service',
    title: 'Master Barbering',
    desc: 'From classic fades to modern sculpted cuts — our master barbers craft your perfect look with precision scissors and expert technique.',
    href: '#barbing',
  },
  {
    id: 'spa',
    image: '/images/spa_service.jpg',
    tag: 'Wellness & Relaxation',
    title: 'Luxury Spa',
    desc: 'Surrender to pure relaxation with bespoke facial treatments, deep-tissue massages, and holistic therapies curated for total rejuvenation.',
    href: '#vip',
  },
  {
    id: 'tattoo',
    image: '/images/tattoo_art.jpg',
    tag: 'Body Art',
    title: 'Tattoo Studio',
    desc: 'Our resident tattoo artists blend timeless tradition with contemporary artistry — turning your vision into wearable, living masterpieces.',
    href: '#tattoo',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!revealEls) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-28 bg-dark-950 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      {/* Marquee bar */}
      <div className="overflow-hidden py-4 border-y border-gold-500/10 mb-20">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[0.6rem] font-sans tracking-[0.4em] text-gold-500/30 uppercase whitespace-nowrap">
              Premium Barbering &nbsp;◆&nbsp; Luxury Spa &nbsp;◆&nbsp; Tattoo Art &nbsp;◆&nbsp; VIP Suite &nbsp;◆&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="reveal">
            <p className="eyebrow">What We Offer</p>
            <h2 className="section-title">
              Our <em>Services</em>
            </h2>
          </div>
          <p className="reveal font-serif text-dark-300 text-lg max-w-md leading-relaxed md:text-right">
            Three disciplines. One destination. Unrivalled craftsmanship for the discerning individual.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map(({ id, image, tag, title, desc, href }, i) => (
            <Link
              key={id}
              to={id === 'barbing' ? '/barbing' : id === 'spa' ? '/vip' : '/tattoo'}
              className="service-card reveal group block border border-gold-500/15 hover:border-gold-400/50 hover:shadow-ruby-gold transition-all duration-500 rounded-sm"
              style={{ transitionDelay: `${i * 0.12}s` }}
              aria-label={title}
            >
              <div className="overflow-hidden relative">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-64 object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <span className="vip-badge mb-4 inline-block">{tag}</span>
                <h3 className="font-display text-3xl text-white tracking-wider mt-3 group-hover:text-gold-300 transition-colors duration-300">
                  {title}
                </h3>
                <div className="gold-divider" />
                <p className="font-serif text-dark-300 leading-relaxed text-base">{desc}</p>
                <div className="mt-6 flex items-center gap-2 text-gold-400 text-xs font-sans tracking-widest uppercase group-hover:text-gold-300">
                  <span>Discover More</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-2 transition-transform duration-300">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
