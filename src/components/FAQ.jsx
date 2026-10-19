import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ease, Label, Lines, Reveal } from './motion'
import { ADDRESS_SHORT, HOURS, WHATSAPP_DISPLAY } from '../site'

// Answers use only details already published on the site
const getFaqs = () => [
  {
    q: 'How do I book an appointment?',
    a: <>Use the <Link to="/booking" className="link-draw text-ember">booking form</Link> or message us on WhatsApp ({WHATSAPP_DISPLAY}). We confirm every booking personally on WhatsApp or by phone.</>,
  },
  {
    q: 'Can I walk in without booking?',
    a: 'Walk-ins are welcome. Bookings are served first, so booking ahead is the surest way to get your preferred time.',
  },
  {
    q: 'Where are you and when are you open?',
    a: <>We are in {ADDRESS_SHORT}, between Tradex Rhône Poulenc and Collège Charles de Gaulle. Hours: {HOURS.map(h => `${h.days} ${h.time}`).join(' · ')}.</>,
  },
  {
    q: 'Why do some prices show a range?',
    a: 'The final price depends on your hair, your skin and the products used. We tell you the exact price before we start.',
  },
  {
    q: 'Do you come to my home?',
    a: <>Yes. Most services can be done at your home, office or event. You pay the salon price plus a travel fee for your location, confirmed on WhatsApp before the visit. See the <Link to="/home-service" className="link-draw text-ember">home service menu</Link>.</>,
  },
  {
    q: 'How does the VIP suite work?',
    a: <>VIP bookings carry a 10,000 FCFA reservation fee, which secures the suite for your visit. See the <Link to="/vip" className="link-draw text-ember">VIP menu</Link>.</>,
  },
  {
    q: 'How does VIP teeth whitening work?',
    a: 'It is a course of three sessions: 50,000 FCFA for the first, 25,000 FCFA for the second, and the third session is free.',
  },
  {
    q: 'How much does a tattoo cost?',
    a: <>Every design in our <Link to="/tattoo" className="link-draw text-ember">tattoo portfolio</Link> shows its price. For a custom idea, send us references on WhatsApp and we will quote it.</>,
  },
]

function Item({ item, open, onToggle, i }) {
  return (
    <Reveal as="li" delay={(i % 4) * 0.04} className="border-b border-ink/15">
      <button onClick={onToggle} aria-expanded={open} className="group w-full flex items-center justify-between gap-6 py-6 text-left">
        <span className="text-xl lg:text-2xl font-medium tracking-tight transition-colors group-hover:text-ember">{item.q}</span>
        <span className={`shrink-0 w-10 h-10 rounded-full border border-ink/20 grid place-items-center transition-all duration-500 ${open ? 'bg-ink text-paper rotate-45' : ''}`}>
          <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" /></svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-14 text-lg text-ink-600 leading-relaxed max-w-3xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-bone py-24 lg:py-36">
      <div className="wrap grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Label num="?" className="text-ink-500 mb-6">Good to know</Label>
          <h2 className="h2"><Lines lines={[<>Questions,</>, <span key="a" className="accent text-ember">answered.</span>]} /></h2>
          <Reveal className="mt-6 text-ink-600 text-lg max-w-xs">Something else on your mind? Message us on WhatsApp — we reply fast.</Reveal>
        </div>
        <ul className="lg:col-span-8 border-t border-ink/15">
          {getFaqs().map((f, i) => (
            <Item key={f.q} item={f} i={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
