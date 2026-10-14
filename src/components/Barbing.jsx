import { useEffect, useRef } from 'react'

const cuts = [
  { name: 'Classic Cut',        desc: 'Timeless precision cut & style',               price: '3,000 FCFA' },
  { name: 'Skin Fade',          desc: 'Low, mid or high – seamless gradient blend',   price: '4,500 FCFA' },
  { name: 'Beard Sculpt',       desc: 'Shape, define & trim to perfection',           price: '2,500 FCFA' },
  { name: 'Hot Towel Shave',    desc: 'Traditional straight-razor luxury shave',      price: '4,000 FCFA' },
  { name: 'Shape-Up & Line',    desc: 'Crisp edges & clean hairline definition',      price: '2,000 FCFA' },
  { name: 'Full Signature Pkg', desc: 'Cut + Beard + Hot Towel – the full experience', price: '10,000 FCFA' },
]

const styleTags = ['Low Fade', 'Bald Fade', 'Afro Taper', 'Burst Fade', 'Drop Fade', 'Caesar Cut', 'Waves', 'Line Art']

export default function Barbing() {
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
    <section id="barbing" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* BG image with overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero_barber.jpg" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-dark-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <div>
            <p className="eyebrow reveal">The Craft</p>
            <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
              Master<br /><em>Barbering</em>
            </h2>
            <div className="gold-divider reveal" style={{ transitionDelay: '0.2s' }} />
            <p className="font-serif text-dark-300 text-lg leading-relaxed reveal" style={{ transitionDelay: '0.25s' }}>
              Every cut at Cigaraw is an act of precision and artistry. Our master barbers — trained in the classical traditions and the modern craft — sculpt each style with surgical focus and creative vision.
            </p>

            {/* Style tags */}
            <div className="flex flex-wrap gap-3 mt-8 reveal" style={{ transitionDelay: '0.3s' }}>
              {styleTags.map(tag => (
                <button key={tag} className="style-tag">{tag}</button>
              ))}
            </div>

            {/* Process */}
            <div className="mt-12 space-y-6">
              {[
                { n: '01', h: 'Consultation', t: 'We listen. Your face shape, lifestyle, and vision guide every decision.' },
                { n: '02', h: 'Precision Cut',  t: 'Master scissors and clippers in harmony — no rushing, only craftsmanship.' },
                { n: '03', h: 'Finish & Style', t: 'Hot towel, premium products, and the final polish that completes the look.' },
              ].map(({ n, h, t }, i) => (
                <div key={n} className="process-step reveal" style={{ transitionDelay: `${0.35 + i * 0.1}s` }}>
                  <span className="font-display text-4xl text-gold-500/30 leading-none w-12 flex-shrink-0">{n}</span>
                  <div>
                    <h4 className="font-sans font-semibold text-white tracking-widest uppercase text-sm">{h}</h4>
                    <p className="font-serif text-dark-400 text-sm mt-1 leading-relaxed">{t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — price list */}
          <div className="reveal-right" style={{ transitionDelay: '0.2s' }}>
            <div className="border border-gold-500/15 p-8 md:p-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-3xl text-white tracking-widest">Price Menu</h3>
                <span className="vip-badge">2024 Rates</span>
              </div>
              <div className="gold-divider" />

              <div className="space-y-0">
                {cuts.map(({ name, desc, price }) => (
                  <div key={name} className="barb-price-item">
                    <div>
                      <p className="font-sans font-semibold text-white text-sm tracking-wide">{name}</p>
                      <p className="font-serif text-dark-400 text-sm mt-0.5">{desc}</p>
                    </div>
                    <span className="font-display text-gold-400 text-xl ml-6 flex-shrink-0">{price}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold w-full mt-8 font-semibold py-4 text-xs tracking-widest"
                id="btn-barbing-book"
              >
                Book a Cut
              </button>
            </div>

            {/* Image thumbnail */}
            <div className="relative mt-6 h-48 overflow-hidden">
              <img src="/images/barber_service.jpg" alt="Barber at work" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <p className="font-display text-2xl text-white tracking-widest">12+ Years</p>
                <p className="text-xs font-sans tracking-widest text-gold-400 uppercase">Of Mastery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
