import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Preloader   from './components/Preloader'
import Cursor      from './components/Cursor'
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'

import HomePage     from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import BarbingPage  from './pages/BarbingPage'
import VipPage      from './pages/VipPage'
import TattooPage   from './pages/TattooPage'
import GalleryPage  from './pages/GalleryPage'
import BookingPage  from './pages/BookingPage'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!loaded && <Preloader onDone={handleDone} />}
      <Cursor />
      <Navbar />

      <main className="min-h-screen bg-dark-950">
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/barbing"   element={<BarbingPage />} />
          <Route path="/vip"       element={<VipPage />} />
          <Route path="/tattoo"    element={<TattooPage />} />
          <Route path="/gallery"   element={<GalleryPage />} />
          <Route path="/booking"   element={<BookingPage />} />
          <Route path="*"          element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
