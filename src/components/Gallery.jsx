import { useEffect, useRef } from 'react'

const images = [
  { src: '/images/hero_barber.jpg',    alt: 'Expert barber at work' },
  { src: '/images/barber_service.jpg', alt: 'Classic cut session' },
  { src: '/images/spa_service.jpg',    alt: 'Spa treatment' },
  { src: '/images/vip_section.jpg',    alt: 'VIP suite interior' },
  { src: '/images/tattoo_section.jpg', alt: 'Tattoo session' },
  { src: '/images/tattoo_art.jpg',     alt: 'Tattoo artwork' },
  { src: '/images/hero_barber.jpg',    alt: 'Barbering precision' },
  { src: '/images/spa_service.jpg',    alt: 'Relaxation ritual' },
]

const testimonials = [
  {
    name: 'Nchinda Bertrand',
    role: 'Business Owner, Bamenda',
    text: 'Nothing in Bamenda touches Cigaraw. The attention to detail, the clean environment, the skilled hands — this place has completely changed how I think about grooming. I won\'t sit in any other barber chair.',
    stars: 5,
  },
  {
    name: 'Tabi Godwill',
    role: 'Creative Director',
    text: 'My skin fade was on point. These barbers actually know what they\'re doing — proper technique, clean tools, and they take their time. I\'ve brought three of my friends here. None of us have looked back.',
    stars: 5,
  },
  {
    name: 'Fru Valerie',
    role: 'Entrepreneur',
    text: 'The spa service was unreal. I came in stressed and left completely renewed. The therapist was professional and really understood what my body needed. Cigaraw is a genuine gem in Bamenda.',
    stars: 5,
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#e8a820">
          <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Gallery() {
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
    <>
      {/* Gallery Section */}
      <section id="gallery" ref={sectionRef} className="relative py-28 bg-dark-900 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="reveal">
              <p className="eyebrow">Our Work</p>
              <h2 className="section-title">
                The <em>Gallery</em>
              </h2>
            </div>
            <p className="font-serif text-dark-300 text-lg max-w-sm leading-relaxed reveal md:text-right">
              A curated selection of our finest work — captured in moments of artistry.
            </p>
          </div>
        </div>

        {/* Scrolling gallery */}
        <div className="overflow-hidden py-4 reveal">
          <div className="gallery-scroll">
            {[...images, ...images].map(({ src, alt }, i) => (
              <div key={i} className="gallery-item">
                <img src={src} alt={alt} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-28 bg-dark-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />

        {/* Large watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="font-display text-[15vw] text-dark-800/30 tracking-widest whitespace-nowrap">REVIEWS</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16 reveal">
            <p className="eyebrow">What They Say</p>
            <h2 className="section-title">
              Client <em>Testimonials</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map(({ name, role, text, stars }, i) => (
              <div
                key={name}
                className="test-card reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <Stars count={stars} />
                <p className="font-serif text-dark-200 text-base leading-relaxed mt-5 mb-8 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gold-500/10">
                  <div className="w-10 h-10 bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-gold-400 text-xl">{name[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white text-sm tracking-wide">{name}</p>
                    <p className="font-serif text-dark-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-16 reveal">
            {[
              { value: '4.9', label: 'Average Rating' },
              { value: '500+', label: 'Reviews' },
              { value: '98%', label: 'Would Recommend' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-5xl text-gold-400 leading-none">{value}</p>
                <p className="font-sans text-xs tracking-widest text-dark-400 uppercase mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
