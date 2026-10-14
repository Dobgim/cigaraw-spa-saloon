import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import WhatsAppIcon from './WhatsAppIcon'

const navLinks = [
  { num: '01', label: 'Home',                  path: '/' },
  { num: '02', label: 'Services & Menu',       path: '/services' },
  { num: '03', label: 'Master Barbering',      path: '/barbing' },
  { num: '04', label: 'VIP Executive Suite',   path: '/vip' },
  { num: '05', label: 'Tattoo Studio',         path: '/tattoo' },
  { num: '06', label: 'Lookbook & Gallery',    path: '/gallery' },
  { num: '07', label: 'Book Appointment',      path: '/booking' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent background scroll when mobile/fullscreen menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      {/* Clean, minimalist header - no horizontal menu clutter */}
      <header
        className={`fixed top-0 left-0 right-0 z-[990] flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 transition-all duration-500 ${
          scrolled ? 'nav-scrolled py-3.5' : 'bg-gradient-to-b from-dark-950/90 via-dark-950/40 to-transparent'
        }`}
        role="banner"
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex flex-col leading-none group"
          aria-label="Cigaraw Saloon & Spa Homepage"
        >
          <span className="font-display text-2xl md:text-3xl text-white tracking-[0.2em] group-hover:text-gold-400 transition-colors duration-300">
            CIGARAW
          </span>
          <span className="text-[0.5rem] md:text-[0.55rem] tracking-[0.45em] text-gold-500 uppercase font-sans mt-0.5">
            Saloon &amp; Spa &bull; Bamenda
          </span>
        </Link>

        {/* Right Actions: Direct Booking CTA + Clean Luxury Menu Trigger */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/booking"
            className="btn-gold text-dark-950 font-semibold px-5 md:px-7 py-2.5 md:py-3 text-xs tracking-widest uppercase"
            id="nav-book-btn"
          >
            Book Now
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex items-center gap-3 px-4 py-2.5 border border-gold-500/25 bg-dark-900/60 backdrop-blur-md hover:border-gold-400/70 hover:bg-gold-500/10 text-gold-400 transition-all duration-300"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-gold-300 group-hover:text-gold-200">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
            <div className="flex flex-col justify-center gap-1.5 w-5 h-4">
              <span
                className={`block h-[1.5px] bg-gold-400 transition-transform duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-white transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : 'opacity-80'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-gold-400 transition-transform duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Luxury Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[995] bg-dark-950/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        {/* Background decorative watermark */}
        <div className="absolute right-6 bottom-10 pointer-events-none select-none opacity-5 hidden lg:block" aria-hidden="true">
          <span className="font-display text-[18vw] text-gold-400 tracking-widest">CIGARAW</span>
        </div>

        {/* Top bar inside drawer */}
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 border-b border-gold-500/15">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex flex-col leading-none"
          >
            <span className="font-display text-2xl text-white tracking-[0.2em]">CIGARAW</span>
            <span className="text-[0.5rem] tracking-[0.45em] text-gold-500 uppercase font-sans mt-0.5">Bamenda, Cameroon</span>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 border border-gold-500/25 text-gold-400 hover:text-white hover:border-gold-400 text-xs font-sans tracking-widest uppercase transition-all duration-300"
            aria-label="Close menu"
          >
            <span>Close</span>
            <span className="text-base leading-none">&times;</span>
          </button>
        </div>

        {/* Main Links Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-16 py-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Numbered Page List */}
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">Directory &bull; Dedicated Pages</p>
              <ul className="space-y-4 md:space-y-5" role="list">
                {navLinks.map(({ num, label, path }) => {
                  const isActive = location.pathname === path
                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-baseline gap-4 md:gap-6 py-1 transition-all duration-300 ${
                          isActive ? 'text-gold-400' : 'text-dark-200 hover:text-white'
                        }`}
                      >
                        <span className="font-sans text-xs md:text-sm text-gold-500/50 group-hover:text-gold-400 transition-colors tracking-widest font-mono">
                          {num}
                        </span>
                        <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide group-hover:translate-x-3 transition-transform duration-300 flex items-center gap-3">
                          {label}
                          {isActive && (
                            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block align-middle ml-2" />
                          )}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right Information & Quick Contacts */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-gold-500/15 pt-8 lg:pt-0 lg:pl-12 space-y-8">
              <div>
                <p className="text-xs font-sans tracking-[0.3em] text-gold-400 uppercase mb-2">Location</p>
                <p className="font-serif text-white text-base leading-relaxed">
                  Commercial Avenue, Bamenda<br />
                  North West Region, Cameroon
                </p>
              </div>

              <div>
                <p className="text-xs font-sans tracking-[0.3em] text-gold-400 uppercase mb-2">Opening Hours</p>
                <p className="font-serif text-dark-300 text-sm leading-relaxed">
                  Monday – Saturday: 8:00 AM – 7:00 PM<br />
                  Sunday: 10:00 AM – 4:00 PM
                </p>
              </div>

              <div>
                <p className="text-xs font-sans tracking-[0.3em] text-gold-400 uppercase mb-2">Direct Contact</p>
                <div className="space-y-1">
                  <a href="tel:+237677123456" className="font-serif text-white hover:text-gold-400 text-sm block transition-colors">
                    +237 677 123 456
                  </a>
                  <a
                    href="https://wa.me/237677123456?text=Hello%20Cigaraw%20Saloon%2C%20I%20would%20like%20to%20inquire%20about%20booking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-sans tracking-widest text-[#25D366] hover:text-[#20ba5a] uppercase mt-2 font-medium transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="btn-gold w-full text-center py-4 text-xs tracking-widest block font-semibold"
                >
                  Schedule Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer inside drawer */}
        <div className="px-6 md:px-12 lg:px-16 py-4 border-t border-gold-500/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-serif text-dark-500">
          <span>&copy; {new Date().getFullYear()} Cigaraw Saloon &amp; Spa. Bamenda, Cameroon.</span>
          <span className="font-sans text-[0.65rem] tracking-widest text-gold-500/60 uppercase">
            Master Barbering &bull; Luxury Spa &bull; Custom Ink
          </span>
        </div>
      </div>
    </>
  )
}
