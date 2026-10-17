import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { SHOP } from '../photos'
import { ADDRESS, MAPS_URL, SALON_COORDS } from '../site'

// Pin made from a photo of the storefront, with a pulsing ring and a name label
const pin = L.divIcon({
  className: '',
  iconSize: [84, 104],
  iconAnchor: [42, 104],
  popupAnchor: [0, -100],
  html: `
    <div class="salon-pin">
      <span class="salon-pin__pulse"></span>
      <span class="salon-pin__photo"><img src="${SHOP.frontNight}" alt="CiGa Raw storefront" /></span>
      <span class="salon-pin__tail"></span>
      <span class="salon-pin__label">CiGa Raw</span>
    </div>`,
})

// Map of Douala that flies in to the salon when it scrolls into view
export default function LocationMap({ className = '' }) {
  const el = useRef(null)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    const map = L.map(el.current, {
      center: [4.06, 9.73],
      zoom: 12,
      scrollWheelZoom: false,
      dragging: !touch,
      tap: false,
      zoomControl: false,
      attributionControl: true,
    })
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // OpenStreetMap's standard tiles (free with attribution); warmed up with CSS to match the site
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'warm-tiles',
    }).addTo(map)

    L.marker(SALON_COORDS, { icon: pin, title: 'CiGa Raw Salon and Spa' })
      .addTo(map)
      .bindPopup(`
        <div class="salon-popup">
          <img src="${SHOP.vipLounge}" alt="" />
          <strong>CiGa Raw Salon and Spa</strong>
          <span>${ADDRESS.join('<br/>')}</span>
          <a href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Directions in Google Maps →</a>
        </div>`)

    // Fly in once, the first time the map is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      map.flyTo(SALON_COORDS, 16, { duration: 2.2 })
      io.disconnect()
    }, { threshold: 0.4 })
    io.observe(el.current)

    return () => { io.disconnect(); map.remove() }
  }, [])

  return <div ref={el} className={`z-0 ${className}`} role="region" aria-label="Map showing CiGa Raw Salon and Spa on Avenue de Logpom, Douala" />
}
