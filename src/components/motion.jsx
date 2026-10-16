import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

export const ease = [0.65, 0, 0.35, 1]
export const easeOut = [0.16, 1, 0.3, 1]

// Fade + rise when scrolled into view
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: easeOut, delay }}
    >
      {children}
    </Tag>
  )
}

// Each line slides up from behind a mask. `lines` is an array of nodes.
export function Lines({ lines, className = '', delay = 0, stagger = 0.09, when }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const show = when ?? inView
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '110%', rotate: 2 }}
            animate={show ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 1.1, ease: easeOut, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Image uncovered by a wiping panel, with a slow settle-in scale
export function ImageReveal({ src, alt, className = '', imgClassName = '', from = 'bottom', delay = 0, parallax = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-6%', '6%'] : ['0%', '0%'])

  const clip = {
    bottom: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    left:   ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    right:  ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
  }[from]

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: clip[0] }}
      animate={inView ? { clipPath: clip[1] } : {}}
      transition={{ duration: 1.4, ease, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={`absolute inset-0 w-full h-[116%] -top-[8%] object-cover ${imgClassName}`}
        initial={{ scale: 1.25 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.8, ease: easeOut, delay }}
      />
    </motion.div>
  )
}

// Element that leans toward the pointer
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Number that counts up once visible
export function Count({ to, duration = 1.8, suffix = '', when }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  const go = when ?? inView

  useEffect(() => {
    if (!go) return
    let raf, start
    const tick = (now) => {
      start ??= now
      const p = Math.min((now - start) / (duration * 1000), 1)
      setN(Math.round((1 - Math.pow(1 - p, 4)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [go, to, duration])

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

// Infinite horizontal ticker
export function Marquee({ children, reverse = false, className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

// Section label like "(02) Services"
export function Label({ num, children, className = '' }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      {num && <span className="opacity-60">({num})</span>}
      <span>{children}</span>
    </p>
  )
}

export function Arrow({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Arrow inside a circle that swaps on hover; parent needs `group`
export function ArrowDot({ className = '' }) {
  return (
    <span className={`relative grid place-items-center w-9 h-9 rounded-full overflow-hidden ${className}`}>
      <Arrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-8" />
      <Arrow className="w-4 h-4 absolute -translate-x-8 transition-transform duration-500 group-hover:translate-x-0" />
    </span>
  )
}

// Circular text that slowly rotates, with a mark in the middle
export function SpinBadge({ text = 'Book a chair · CiGa Raw · Bamenda · ', className = '', children }) {
  return (
    <div className={`relative w-32 h-32 ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="font-mono uppercase" style={{ fontSize: '8.4px', letterSpacing: '0.18em' }} fill="currentColor">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
