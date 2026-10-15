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
      {/* Background image with Ken Burns cinematic zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_barber.jpg"
          alt="CiGa Raw Salon & Spa luxury interior"
          className="w-full h-full object-cover ken-burns-image"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Multi-layer overlay with subtle ruby & gold warmth */}
        <div className="absolute inset-0 bg-dark-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-dark-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/70" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 25 }).map((_, i) => <Particle key={i} />)}
      </div>

      {/* Vertical text left side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4" aria-hidden="true">
        <span className="writing-vertical text-[0.55rem] tracking-[0.4em] text-gold-500/60 uppercase font-sans">
          VIP SPA &bull; BAMENDA
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent" />
      </div>

      {/* Main content grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column: Brand Statement */}
        <div className="flex-1 max-w-3xl">
          <p
            className="eyebrow animate-fade-in flex items-center gap-2"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Beauty &bull; Relaxation &bull; Confidence &mdash; Bamenda
          </p>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none tracking-wider mt-4"
            style={{ animationDelay: '0.5s' }}
          >
            <span
              className="block animate-fade-in-up"
              style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
            >
              CiGa Raw
            </span>
            <span
              className="block text-gradient-logo animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] mt-1"
              style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
            >
              SALON &amp; SPA
            </span>
          </h1>

          <div className="gold-divider mt-6" />

          <p
            className="font-serif text-base sm:text-lg md:text-xl text-dark-300 max-w-xl leading-relaxed mt-5 animate-fade-in-up"
            style={{ animationDelay: '1.0s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Bamenda’s sanctuary of royal grooming, master barbering, VIP spa treatments, and bespoke tattoo artistry — where precision meets timeless luxury.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-8 sm:mt-10 animate-fade-in-up"
            style={{ animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link
              to="/booking"
              className="btn-gold font-semibold px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-widest uppercase inline-block text-center shadow-ruby-gold"
              id="btn-hero-book"
            >
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="btn-outline-gold px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-widest uppercase inline-block text-center"
              id="btn-hero-explore"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Floating Medallion (Zoom In & Out Animation) */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center animate-fade-in"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="relative flex items-center justify-center zoom-in-out-hero group cursor-pointer">
            {/* Outer rotating decorative ring 1 */}
            <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-gold-400/35 animate-spin-slow pointer-events-none" />

            {/* Counter rotating decorative ring 2 */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dotted border-ruby-500/40 animate-spin-reverse pointer-events-none" />

            {/* Ambient ruby-gold glow aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-gold-500/25 via-ruby-600/35 to-amber-500/25 blur-2xl animate-aura-pulse pointer-events-none" />

            {/* Medallion container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-gold-400 via-ruby-600 to-gold-300 shadow-[0_0_50px_rgba(232,168,32,0.45)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-dark-950 p-1 border-2 border-gold-400/80">
                <img
                  src="/logo.png"
                  alt="CiGa Raw Salon and Spa Medallion Crest"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Floating VIP Badge under medallion */}
            <div className="absolute -bottom-4 bg-dark-950/95 border border-gold-400/70 text-gold-300 px-5 py-1.5 rounded-full text-[0.65rem] tracking-[0.25em] uppercase font-sans font-semibold shadow-gold backdrop-blur-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
              <span>VIP Executive Salon &bull; Spa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-12">

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
