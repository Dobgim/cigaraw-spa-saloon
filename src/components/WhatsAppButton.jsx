import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import { wa } from '../site'

// Floating WhatsApp button that bobs gently, with a speech bubble above it
export default function WhatsAppButton() {
  const [bubble, setBubble] = useState(true)
  const href = wa('Hello CiGa Raw Salon and Spa, I would like to ask about booking an appointment.')

  return (
    <motion.div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[950] flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 2.6 }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            className="relative max-w-[230px] sm:max-w-[260px]"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 3.1 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl rounded-br-sm bg-paper text-ink pl-4 pr-9 py-3 shadow-[0_14px_40px_-12px_rgba(23,17,13,0.55)] border border-ink/10"
            >
              <span className="flex items-center gap-2 label text-[0.6rem] text-wa">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-wa opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-wa" />
                </span>
                WhatsApp
              </span>
              <span className="block mt-1 text-sm font-medium leading-snug">Contact us here for fast responses</span>
            </a>
            <button
              onClick={() => setBubble(false)}
              aria-label="Hide message"
              className="absolute top-1.5 right-1.5 w-6 h-6 grid place-items-center rounded-full text-ink/50 hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
            {/* bubble tail */}
            <span className="absolute -bottom-1.5 right-5 w-3 h-3 rotate-45 bg-paper border-r border-b border-ink/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact CiGa Raw on WhatsApp for fast responses"
        className="relative grid place-items-center w-16 h-16 rounded-full bg-wa text-ink shadow-[0_14px_34px_-10px_rgba(37,211,102,0.75)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="absolute inset-0 rounded-full bg-wa/50 animate-ping [animation-duration:2.2s]" aria-hidden="true" />
        <WhatsAppIcon className="relative w-8 h-8" />
      </motion.a>
    </motion.div>
  )
}
