import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Intro          from './components/Intro'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { ease }       from './components/motion'
import { loadContent } from './content'

import HomePage     from './pages/HomePage'
import AboutPage    from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BarbingPage  from './pages/BarbingPage'
import VipPage      from './pages/VipPage'
import TattooPage   from './pages/TattooPage'
import GalleryPage  from './pages/GalleryPage'
import BookingPage  from './pages/BookingPage'
import HomeServicePage from './pages/HomeServicePage'
import NotFoundPage    from './pages/NotFoundPage'

// Wraps each route: content fades out, an ember panel sweeps over, new page comes in
function Page({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.35 } }}
        exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[980] bg-ember pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[980] bg-ember pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease } }}
        style={{ transformOrigin: 'bottom' }}
      />
    </>
  )
}

const BRAND = 'CiGa Raw Salon and Spa — Logpom, Douala'
const TITLES = {
  '/':             BRAND,
  '/about':        'About Ciga Raw',
  '/services':     'Services & Prices',
  '/barbing':      'Barbering',
  '/vip':          'VIP Suite & Teeth Whitening',
  '/tattoo':       'Tattoo Studio & Prices',
  '/gallery':      'Gallery',
  '/booking':      'Book an Appointment',
  '/home-service': 'Home Service',
}

function AnimatedRoutes({ firstLoad }) {
  const location = useLocation()

  // Give every page its own browser-tab / search-result title
  useEffect(() => {
    const t = TITLES[location.pathname]
    document.title = !t ? `Page not found | ${BRAND}` : t === BRAND ? t : `${t} | ${BRAND}`
  }, [location.pathname])

  const pages = {
    '/':         HomePage,
    '/about':    AboutPage,
    '/services': ServicesPage,
    '/barbing':  BarbingPage,
    '/vip':      VipPage,
    '/tattoo':   TattooPage,
    '/gallery':  GalleryPage,
    '/booking':  BookingPage,
    '/home-service': HomeServicePage,
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        {Object.entries(pages).map(([path, C]) => (
          <Route key={path} path={path} element={<Page><C ready={firstLoad} /></Page>} />
        ))}
        <Route path="*" element={<Page><NotFoundPage /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  // Bumped once live content from the admin dashboard has been applied, so every page re-renders with it
  const [, setContentVersion] = useState(0)

  useEffect(() => {
    loadContent().then(applied => applied && setContentVersion(v => v + 1))
  }, [])

  return (
    <BrowserRouter>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[99999] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="min-h-screen">
        <AnimatedRoutes firstLoad={introDone} />
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
