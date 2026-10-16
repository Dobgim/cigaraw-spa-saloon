import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ease, easeOut } from './motion'

const letters = 'CiGa Raw'.split('')

// First-visit curtain: wordmark rises letter by letter, then the panel lifts away
export default function Intro({ onDone }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, 2300)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] bg-ink text-paper flex flex-col justify-between p-5 sm:p-8 lg:p-12"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease, delay: 1.4 }}
    >
      <div className="flex justify-between label text-paper/50">
        <span>Salon &amp; Spa</span>
        <span>Bamenda, CM</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <h1 className="display text-[19vw] lg:text-[15vw] flex overflow-hidden pb-[0.05em]">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              className={l === ' ' ? 'w-[0.25em]' : ''}
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.1 + i * 0.05 }}
            >
              {l}
            </motion.span>
          ))}
        </h1>
        <motion.span
          className="hidden sm:block font-serif italic text-3xl lg:text-5xl text-ember pb-[2vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          est. 2024
        </motion.span>
      </div>

      <motion.div
        className="h-px bg-ember origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease }}
      />
    </motion.div>
  )
}
