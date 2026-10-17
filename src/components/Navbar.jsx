import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SHOP, tattoo } from '../photos'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ease, easeOut } from './motion'
import WhatsAppIcon from './WhatsAppIcon'
import { ADDRESS, HOURS, NAV, PHONE_DISPLAY, PHONE_TEL, wa } from '../site'

const previews = {
  '/':         SHOP.team1,
  '/about':    SHOP.vipChairs,
  '/services': SHOP.facial,
  '/barbing':  SHOP.mainFloor,
  '/vip':      SHOP.vipLounge,
  '/tattoo':   tattoo('golden-crown-back'),
  '/gallery':  tattoo('jesus-rosary-realism'),
  '/home-service': SHOP.facial,
  '/booking':  SHOP.frontNight,
}

const inline = NAV.filter(n => ['/services', '/home-service', '/barbing', '/vip', '/tattoo', '/gallery'].includes(n.path))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hovered, setHovered] = useState(null)
  const location = useLocation()
  const { scrollY } = useScroll()

  // Hide while scrolling down, return when scrolling up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
    setSolid(y > 40)
  })

  useEffect(() => { setOpen(false) }, [location.pathname])

  // Light text while floating over the dark photo hero on the home page
  const light = open || (location.pathname === '/' && !solid)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[990] transition-colors duration-500 ${
          solid && !open ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10' : 'border-b border-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="wrap flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3 group" aria-label="CiGa Raw home">
            <img src="/logo.png" alt="" className="w-10 h-10 rounded-full object-cover transition-transform duration-700 group-hover:rotate-[360deg]" />
            <span className={`display text-2xl transition-colors ${light ? 'text-paper' : 'text-ink'}`}>
              CiGa Raw
            </span>
          </Link>

          <nav className={`hidden lg:flex items-center gap-8 text-[0.95rem] transition-opacity ${open ? 'opacity-0 pointer-events-none' : ''}`} aria-label="Primary">
            {inline.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `link-draw transition-colors ${isActive ? 'text-ember' : light ? 'text-paper' : 'text-ink'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/booking" className={`hidden sm:inline-flex ${open ? 'btn-line-light' : 'btn-ember'} !py-2.5`}>
              Book a chair
            </Link>
            <button
              onClick={() => setOpen(o => !o)}
              className={`relative w-12 h-12 rounded-full grid place-items-center transition-colors duration-300 ${
                light ? 'bg-paper text-ink' : 'bg-ink text-paper'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[985] bg-ink text-paper overflow-y-auto"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            transition={{ duration: 0.8, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="wrap min-h-full pt-28 pb-10 grid lg:grid-cols-12 gap-10">
              <ul className="lg:col-span-7 flex flex-col" onMouseLeave={() => setHovered(null)}>
                {NAV.map(({ label, path }, i) => {
                  const active = location.pathname === path
                  return (
                    <li key={path} className="overflow-hidden border-b border-paper/10">
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.8, ease: easeOut, delay: 0.15 + i * 0.05 }}
                      >
                        <Link
                          to={path}
                          onMouseEnter={() => setHovered(path)}
                          className="group flex items-baseline gap-4 py-2 sm:py-3"
                        >
                          <span className="label text-paper/40 w-8">0{i + 1}</span>
                          <span
                            className={`display text-5xl sm:text-6xl lg:text-7xl transition-all duration-500 group-hover:translate-x-4 ${
                              active ? 'text-ember' : hovered && hovered !== path ? 'text-paper/30' : 'text-paper'
                            }`}
                          >
                            {label}
                          </span>
                          {active && <span className="accent text-xl text-ember">— you are here</span>}
                        </Link>
                      </motion.div>
                    </li>
                  )
                })}
              </ul>

              <motion.aside
                className="lg:col-span-5 flex flex-col gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.45 }}
              >
                <div className="relative hidden lg:block aspect-[4/3] rounded-[2px] overflow-hidden bg-ink-800">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={hovered || location.pathname}
                      src={previews[hovered || location.pathname] || previews['/']}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: easeOut }}
                    />
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 gap-6 text-paper/80">
                  <div>
                    <p className="label text-paper/40 mb-2">Find us</p>
                    {ADDRESS.map(l => <p key={l}>{l}</p>)}
                  </div>
                  <div>
                    <p className="label text-paper/40 mb-2">Open</p>
                    {HOURS.map(h => <p key={h.days}>{h.days} · {h.time}</p>)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${PHONE_TEL}`} className="btn-line-light">{PHONE_DISPLAY}</a>
                  <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn bg-wa text-ink before:bg-paper">
                    <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
