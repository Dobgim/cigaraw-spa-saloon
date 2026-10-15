import { useEffect, useRef, useState } from 'react'

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading]     = useState(false)
  const interval = useRef(null)

  useEffect(() => {
    let pct = 0
    interval.current = setInterval(() => {
      pct += Math.random() * 18 + 6
      if (pct >= 100) {
        pct = 100
        clearInterval(interval.current)
        setTimeout(() => {
          setFading(true)
          setTimeout(() => onDone(), 700)
        }, 400)
      }
      setProgress(Math.min(pct, 100))
    }, 120)
    return () => clearInterval(interval.current)
  }, [onDone])

  return (
    <div
      id="preloader"
      className={fading ? 'fade-out' : ''}
      aria-hidden="true"
    >
      {/* Medallion with animated ring & zoom pulse */}
      <div className="relative flex items-center justify-center mb-2">
        <div className="absolute -inset-3 rounded-full border border-gold-400/40 animate-spin-slow pointer-events-none" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-gold-500/20 via-ruby-600/30 to-gold-400/20 animate-aura-pulse pointer-events-none" />
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-1 border-2 border-gold-400 shadow-[0_0_35px_rgba(232,168,32,0.45)] bg-dark-950 animate-zoom-pulse">
          <img
            src="/logo.png"
            alt="CiGa Raw Salon and Spa"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <p className="preloader-text tracking-[0.2em] mt-3">CiGa Raw</p>
      <p className="preloader-sub tracking-[0.45em]">VIP SPA &bull; SALON &bull; BAMENDA</p>
      <div className="preloader-bar-wrap mt-4">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="preloader-sub" style={{ marginTop: '0.75rem', fontSize: '0.6rem' }}>
        {Math.round(progress)}%
      </p>
    </div>
  )
}
