import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const onEnter = () => ring.classList.add('hovered')
    const onLeave = () => ring.classList.remove('hovered')

    const animate = () => {
      ring.current = ring.current || { x: 0, y: 0 }
      const r = ringRef.current
      const speed = 0.12
      const rx = r._x || 0
      const ry = r._y || 0
      const nx = rx + (pos.current.x - rx) * speed
      const ny = ry + (pos.current.y - ry) * speed
      r._x = nx
      r._y = ny
      r.style.left = nx + 'px'
      r.style.top  = ny + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
