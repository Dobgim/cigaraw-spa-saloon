import { useEffect, useRef } from 'react'

const amenities = [
  'Private climate-controlled suite',
  'Complimentary aged spirits bar',
  'Custom wardrobe steaming service',
  'Dedicated personal grooming butler',
  'Premium audio & entertainment system',
  'Cigar lounge access post-service',
]

const spaServices = [
  { name: 'Royal Facial',          duration: '90 min',  price: '15,000 FCFA' },
  { name: 'Hot Stone Massage',     duration: '75 min',  price: '12,000 FCFA' },
  { name: 'Deep Tissue Therapy',   duration: '60 min',  price: '10,000 FCFA' },
  { name: 'VIP Full Body Ritual',  duration: '3 hours', price: '35,000 FCFA' },
]

export default function VIP() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!revealEls) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="vip" ref={sectionRef} className="relative py-28 bg-dark-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-line" />

      {/* Decorative corner accent */}
      <div className="absolute top-12 right-12 w-32 h-32 border border-gold-500/10 hidden lg:block" aria-hidden="true" />
      <div className="absolute top-14 right-14 w-32 h-32 border border-gold-500/5 hidden lg:block" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Top label */}
        <div className="text-center mb-20 reveal">
          <p className="eyebrow">Exclusive Access</p>
          <h2 className="section-title">
            VIP Suite <em>&</em> Spa
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="font-serif text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Our private VIP suites are sanctuaries of indulgence — each meticulously appointed with curated luxuries, personal service, and an atmosphere designed for total sensory pleasure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="reveal-left relative">
            <div className="relative overflow-hidden" style={{ height: '540px' }}>
              <img
                src="/images/vip_section.jpg"
                alt="VIP Suite interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />

              {/* Floating badge */}
              <div className="absolute top-6 left-6 border border-gold-400/40 bg-dark-950/80 backdrop-blur-sm px-5 py-4">
                <p className="font-display text-4xl text-gold-400 leading-none">VIP</p>
                <p className="text-[0.55rem] font-sans tracking-[0.4em] text-dark-300 uppercase mt-1">Private Suite</p>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-6 right-6 text-right">
                <p className="font-display text-2xl text-white tracking-widest">From 15,000 FCFA</p>
                <p className="text-xs font-sans tracking-widest text-gold-400 uppercase">Per Session</p>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="reveal-right">
            {/* Amenities */}
            <h3 className="font-display text-3xl text-white tracking-wider mb-6">Suite Amenities</h3>
            <ul className="space-y-4 mb-12">
              {amenities.map((a, i) => (
                <li key={i} className="flex items-start gap-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-gold-400 flex-shrink-0 mt-0.5" fill="none">
                    <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-serif text-dark-200">{a}</span>
                </li>
              ))}
            </ul>

            {/* Spa services table */}
            <h3 className="font-display text-3xl text-white tracking-wider mb-6">Spa Services</h3>
            <div className="border border-gold-500/15">
              {spaServices.map(({ name, duration, price }, i) => (
                <div
                  key={name}
                  className={`flex items-center justify-between px-6 py-4 transition-colors duration-300 hover:bg-gold-500/5 ${
                    i < spaServices.length - 1 ? 'border-b border-gold-500/10' : ''
                  }`}
                >
                  <div>
                    <p className="font-sans font-semibold text-white text-sm">{name}</p>
                    <p className="font-serif text-dark-400 text-xs mt-0.5">{duration}</p>
                  </div>
                  <span className="font-display text-gold-400 text-xl">{price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold w-full mt-8 font-semibold py-4 text-xs tracking-widest"
              id="btn-vip-book"
            >
              Reserve Your Suite
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
