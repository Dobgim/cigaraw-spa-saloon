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
  { name: 'Facebook',  handle: 'Cigaraw Saloon Bamenda', href: '#' },
  { name: 'WhatsApp',  handle: '+237 677 123 456', href: 'https://wa.me/237677123456' },
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
            <Link to="/" className="inline-flex flex-col leading-none mb-6 group">
              <span className="font-display text-4xl text-white tracking-[0.2em] group-hover:text-gold-400 transition-colors">
                CIGARAW
              </span>
              <span className="text-[0.55rem] tracking-[0.5em] text-gold-500 uppercase font-sans mt-1">
                Saloon &amp; Spa &bull; Bamenda
              </span>
            </Link>
            <div className="w-12 h-px bg-gold-500/50 mb-6" />
            <p className="font-serif text-dark-400 text-sm leading-relaxed max-w-sm">
              Where artistry meets luxury. Bamenda's premier destination for master barbering, luxury spa therapies, and bespoke tattoo artistry. Commercial Avenue, Bamenda, Cameroon.
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
                <a href="tel:+237677123456" className="font-serif text-dark-400 text-sm mt-1 hover:text-gold-400 transition-colors block">
                  +237 677 123 456
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
