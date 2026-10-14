import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function CountUp({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

function Particle() {
  const style = {
    left:             `${Math.random() * 100}%`,
    animationDuration:`${Math.random() * 12 + 8}s`,
    animationDelay:   `${Math.random() * 8}s`,
    width:            `${Math.random() * 3 + 1}px`,
    height:           `${Math.random() * 3 + 1}px`,
    opacity:          Math.random() * 0.6 + 0.2,
  }
  return <div className="particle" style={style} aria-hidden="true" />
}

export default function Hero() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_barber.jpg"
          alt="Cigaraw Saloon luxury interior"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/70 to-dark-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-dark-950/50" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 25 }).map((_, i) => <Particle key={i} />)}
      </div>

      {/* Vertical text left side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4" aria-hidden="true">
        <span className="writing-vertical text-[0.55rem] tracking-[0.4em] text-gold-500/60 uppercase font-sans">
          Est 2024
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24">
        <p
          className="eyebrow animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Est. 2024 &mdash; Premium Experience
        </p>

        <h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] text-white leading-none tracking-wider mt-4"
          style={{ animationDelay: '0.5s' }}
        >
          <span
            className="block animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            CIGARAW
          </span>
          <span
            className="block text-gradient-gold animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.15em]"
            style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
          >
            SALOON &amp; SPA
          </span>
        </h1>

        <div className="gold-divider mt-8" />

        <p
          className="font-serif text-lg md:text-xl text-dark-300 max-w-xl leading-relaxed mt-6 animate-fade-in-up"
          style={{ animationDelay: '1.0s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Bamenda’s home of premium grooming, body art, and spa rituals —
          crafted for the men and women who carry themselves with pride.
        </p>

        <div
          className="flex flex-wrap gap-4 mt-10 animate-fade-in-up"
          style={{ animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link
            to="/booking"
            className="btn-gold font-semibold px-10 py-4 text-sm tracking-widest uppercase inline-block text-center"
            id="btn-hero-book"
          >
            Book Appointment
          </Link>
          <Link
            to="/services"
            className="btn-outline-gold px-10 py-4 text-sm tracking-widest uppercase inline-block text-center"
            id="btn-hero-explore"
          >
            Explore Services
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-x-12 gap-y-6 mt-20 animate-fade-in"
          style={{ animationDelay: '1.5s', opacity: 0, animationFillMode: 'forwards' }}
          aria-label="Statistics"
        >
          {[
            { target: 5000, label: 'Happy Clients', suffix: '+' },
            { target: 12,   label: 'Expert Artists'            },
            { target: 2,    label: 'Years of Excellence', suffix: '+' },
          ].map(({ target, label, suffix }, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl text-white leading-none">
                <CountUp target={target} />
                {suffix && <span className="text-gold-400">{suffix}</span>}
              </span>
              <span className="text-xs tracking-widest text-dark-400 uppercase font-sans mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        to="/services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer"
        aria-label="Explore services"
      >
        <span className="text-[0.6rem] tracking-[0.4em] text-dark-400 uppercase font-sans">Explore</span>
        <div className="w-px h-12 overflow-hidden relative">
          <div className="w-full h-full bg-gold-400 animate-scroll-line" />
        </div>
      </Link>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-10" />
    </section>
  )
}
