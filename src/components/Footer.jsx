import { Link } from 'react-router-dom'
import WhatsAppIcon from './WhatsAppIcon'

const navLinks = [
  { label: 'Home',                  path: '/' },
  { label: 'About Cigaraw',         path: '/about' },
  { label: 'Services & Menu',       path: '/services' },
  { label: 'Master Barbering',      path: '/barbing' },
  { label: 'VIP Executive Suite',   path: '/vip' },
  { label: 'Tattoo Studio',         path: '/tattoo' },
  { label: 'Lookbook & Gallery',    path: '/gallery' },
  { label: 'Book Appointment',      path: '/booking' },
]

const socials = [
  { name: 'Instagram', handle: '@cigaraw_saloon', href: '#' },
  { name: 'Facebook',  handle: 'CiGa Raw Salon & Spa Bamenda', href: '#' },
  { name: 'WhatsApp',  handle: '+237 6 79 17 04 10', href: 'https://wa.me/237679170410' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-dark-950 border-t border-gold-500/10 pt-20 pb-10 overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      {/* Background watermark */}
      <div className="absolute bottom-10 right-8 pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[10vw] text-dark-800/20 tracking-widest">CIGARAW</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gold-500/10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-4 leading-none mb-6 group">
              <div className="w-14 h-14 rounded-full overflow-hidden p-0.5 border border-gold-400/50 group-hover:border-gold-300 shadow-[0_0_20px_rgba(232,168,32,0.3)] bg-dark-900 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="CiGa Raw Salon and Spa"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl text-white tracking-[0.18em] group-hover:text-gold-300 transition-colors">
                  CiGa Raw
                </span>
                <span className="text-[0.55rem] tracking-[0.45em] text-gold-400 uppercase font-sans mt-1">
                  Salon &amp; Spa &bull; VIP Spa Bamenda
                </span>
              </div>
            </Link>
            <div className="w-12 h-px bg-gold-500/50 mb-6" />
            <p className="font-serif text-dark-400 text-sm leading-relaxed max-w-sm">
              Where artistry meets luxury. Bamenda's premier destination for master barbering, luxury VIP spa therapies, and bespoke tattoo artistry. Beauty &bull; Relaxation &bull; Confidence. Commercial Avenue, Bamenda, Cameroon.
            </p>

            {/* Socials */}
            <div className="mt-8 space-y-3">
              {socials.map(({ name, handle, href }) => (
                <a
                  key={name}
                  href={href}
                  className="flex items-center gap-3 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}: ${handle}`}
                >
                  <span className={`w-8 h-8 border flex items-center justify-center transition-all duration-300 text-xs font-bold ${
                    name === 'WhatsApp'
                      ? 'border-[#25D366]/30 text-[#25D366] group-hover:border-[#25D366] group-hover:bg-[#25D366]/10'
                      : 'border-gold-500/20 text-gold-500 group-hover:border-gold-400 group-hover:bg-gold-500/10'
                  }`}>
                    {name === 'WhatsApp' ? (
                      <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
                    ) : (
                      name[0]
                    )}
                  </span>
                  <div>
                    <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">{name}</p>
                    <p className="font-serif text-dark-400 text-xs">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg text-white tracking-widest mb-6">Pages</h4>
            <ul className="space-y-3 list-none">
              {navLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="font-sans text-sm text-dark-400 hover:text-gold-400 tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gold-500/0 group-hover:bg-gold-400/60 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-white tracking-widest mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">Address</p>
                <p className="font-serif text-dark-400 text-sm mt-1">
                  Commercial Avenue,<br />
                  Bamenda, NW Region, Cameroon
                </p>
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">Phone &amp; WhatsApp</p>
                <a href="tel:+237679170410" className="font-serif text-dark-400 text-sm mt-1 hover:text-gold-400 transition-colors block">
                  +237 6 79 17 04 10
                </a>
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">Email</p>
                <a href="mailto:bookings@cigaraw.com" className="font-serif text-dark-400 text-sm mt-1 hover:text-gold-400 transition-colors block">
                  bookings@cigaraw.com
                </a>
              </div>
              <div>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">Operating Hours</p>
                <p className="font-serif text-dark-400 text-sm mt-1">
                  Mon–Sat: 8:00 AM – 7:00 PM<br />
                  Sunday: 10:00 AM – 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-serif text-dark-500 text-xs">
            &copy; {year} Cigaraw Saloon &amp; Spa. Bamenda, Cameroon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/booking" className="font-sans text-xs text-gold-400 hover:text-gold-300 tracking-widest uppercase transition-colors">
              Book Appointment &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
