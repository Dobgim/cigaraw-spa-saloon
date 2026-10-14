import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const phone = '237677123456'
  const message = encodeURIComponent('Hello Cigaraw Saloon & Spa Bamenda, I would like to inquire about booking an appointment.')
  const url = `https://wa.me/${phone}?text=${message}`

  return (
    <aside
      className="fixed bottom-6 right-6 z-[950] flex items-center group pointer-events-auto select-none"
      aria-label="Direct WhatsApp Concierge"
    >
      {/* Tooltip badge on desktop */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-3 group focus:outline-none"
        aria-label="Chat with Cigaraw Saloon Concierge on WhatsApp"
      >
        <div
          className={`hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-dark-900/95 border border-[#25D366]/40 text-white shadow-xl backdrop-blur-md transition-all duration-300 ${
            hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-xs font-sans font-semibold tracking-wider text-dark-100 whitespace-nowrap">
            Chat on WhatsApp
          </span>
          <span className="text-[0.65rem] font-mono text-[#25D366] uppercase bg-[#25D366]/10 px-1.5 py-0.5 rounded">
            Online
          </span>
        </div>

        {/* Floating circular icon button */}
        <div className="relative flex items-center justify-center">
          {/* Subtle pulsating radar effect */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* Main button */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300">
            <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 fill-current text-white drop-shadow-sm" />
          </div>
        </div>
      </a>
    </aside>
  )
}
