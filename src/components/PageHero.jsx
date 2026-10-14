import { Link } from 'react-router-dom'

export default function PageHero({ eyebrow, title, highlight, subtitle, image, breadcrumb }) {
  return (
    <div className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-dark-950 border-b border-gold-500/10">
      {/* Background with dark gradient & vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={image || '/images/hero_barber.jpg'}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/80" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-500/20 bg-dark-900/60 backdrop-blur-sm mb-6 text-xs font-sans tracking-widest uppercase">
          <Link to="/" className="text-dark-400 hover:text-gold-400 transition-colors">Home</Link>
          <span className="text-gold-500/40">/</span>
          <span className="text-gold-400 font-semibold">{breadcrumb || title}</span>
        </nav>

        {eyebrow && <p className="eyebrow block mx-auto">{eyebrow}</p>}

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider max-w-4xl mx-auto leading-tight">
          {title} {highlight && <em className="text-gradient-gold not-italic">{highlight}</em>}
        </h1>

        <div className="gold-divider mx-auto my-6" />

        {subtitle && (
          <p className="font-serif text-dark-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
