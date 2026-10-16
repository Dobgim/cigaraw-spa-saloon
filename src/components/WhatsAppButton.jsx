import { motion } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import { wa } from '../site'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={wa('Hello CiGa Raw Salon and Spa, I would like to ask about booking an appointment.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CiGa Raw on WhatsApp"
      className="group fixed bottom-5 right-5 z-[950] flex items-center gap-0 hover:gap-3 rounded-full bg-wa text-ink pl-3.5 pr-3.5 hover:pr-5 py-3.5 shadow-[0_10px_30px_-10px_rgba(23,17,13,0.5)] transition-all duration-500"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 2.6 }}
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="max-w-0 group-hover:max-w-[8rem] overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500">
        Chat with us
      </span>
    </motion.a>
  )
}
