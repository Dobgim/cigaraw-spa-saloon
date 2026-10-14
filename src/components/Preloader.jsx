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
      <p className="preloader-text">CIGARAW</p>
      <p className="preloader-sub">Saloon &amp; Spa</p>
      <div className="preloader-bar-wrap">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="preloader-sub" style={{ marginTop: '1rem', fontSize: '0.55rem' }}>
        {Math.round(progress)}%
      </p>
    </div>
  )
}
