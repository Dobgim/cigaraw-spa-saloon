import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const styles = [
  { name: 'Fine Line',       desc: 'Delicate, intricate line work with surgical precision' },
  { name: 'Blackwork',       desc: 'Bold graphic designs with solid black ink impact' },
  { name: 'Japanese',        desc: 'Traditional irezumi motifs with rich storytelling' },
  { name: 'Realism',         desc: 'Photographic quality portraits and still-life art' },
  { name: 'Geometric',       desc: 'Sacred geometry and mathematical pattern mastery' },
  { name: 'Neo-Traditional', desc: 'Modern twists on classic tattoo iconography' },
]

export default function Tattoo() {
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
    <section id="tattoo" ref={sectionRef} className="relative py-28 bg-dark-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      {/* Background texture accent */}
      <div className="absolute inset-0 bg-noise opacity-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content side */}
          <div>
            <p className="eyebrow reveal">The Studio</p>
            <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
              Tattoo <em>Artistry</em>
            </h2>
            <div className="gold-divider reveal" style={{ transitionDelay: '0.2s' }} />
            <p className="font-serif text-dark-300 text-lg leading-relaxed reveal" style={{ transitionDelay: '0.25s' }}>
              At CiGa Raw's tattoo studio in Bamenda, your skin is the canvas and our resident artists are the storytellers. With a private consultation process and custom sterile designs tailored to your narrative, every piece is a singular work of wearable art.
            </p>

            {/* Styles grid */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {styles.map(({ name, desc }, i) => (
                <div
                  key={name}
                  className="reveal border border-gold-500/10 p-5 hover:border-gold-400/40 transition-colors duration-300 group hover:shadow-ruby-gold"
                  style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                >
                  <h4 className="font-display text-xl text-white tracking-widest group-hover:text-gold-300 transition-colors duration-300">{name}</h4>
                  <p className="font-serif text-dark-400 text-xs mt-2 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10 reveal" style={{ transitionDelay: '0.7s' }}>
              <Link
                to="/booking?service=Tattoo%20Consultation"
                className="btn-gold font-semibold px-8 py-4 text-xs tracking-widest uppercase shadow-ruby-gold"
                id="btn-tattoo-consult"
              >
                Book Consultation
              </Link>
              <Link
                to="/tattoo"
                className="btn-outline-gold px-8 py-4 text-xs tracking-widest uppercase"
              >
                View Full Studio
              </Link>
            </div>
            </div>
          </div>

          {/* Image side */}
          <div className="reveal-right space-y-4">
            <div className="relative overflow-hidden" style={{ height: '420px' }}>
              <img
                src="/images/tattoo_section.jpg"
                alt="Tattoo artist at work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <img
                  src="/images/tattoo_art.jpg"
                  alt="Tattoo art detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="border border-gold-500/15 flex flex-col items-center justify-center p-6 text-center" style={{ height: '200px' }}>
                <span className="font-display text-5xl text-gold-400">5★</span>
                <span className="font-sans text-xs tracking-widest text-dark-300 uppercase mt-2">Rated Studio</span>
                <span className="font-serif text-dark-400 text-sm mt-2">500+ works completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
