import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { ArrowDot, ease, easeOut, Label, Lines, Reveal } from '../components/motion'
import { wa } from '../site'

const categories = ['All', 'Barbering', 'Spa & Facial', 'VIP Suite', 'Tattoo']

const allServices = [
  { category: 'Barbering', name: 'Classic Precision Cut', duration: '40 min', price: '3,000',
    desc: 'Scissor and clipper work matched to your head shape, hair texture and routine.',
    perks: ['Consultation', 'Shampoo & conditioning', 'Hot towel finish'] },
  { category: 'Barbering', name: 'Signature Skin Fade', duration: '50 min', price: '4,500',
    desc: 'High, mid, low or drop fade, blended clean with a sharp natural line-up.',
    perks: ['Foil shaver gradient', 'Perimeter line-up', 'Styling balm'] },
  { category: 'Barbering', name: 'Beard Sculpt & Treatment', duration: '35 min', price: '2,500',
    desc: 'Beard wash, straight-razor cheek lines, trim and an oil to finish.',
    perks: ['Beard steam', 'Razor edging', 'Organic beard butter'] },
  { category: 'Barbering', name: 'Traditional Hot Towel Shave', duration: '45 min', price: '4,000',
    desc: 'Three hot towels, pre-shave lather, a two-pass straight razor and a cool balm.',
    perks: ['Eucalyptus towels', 'Double-pass razor', 'Cold towel close'] },
  { category: 'Barbering', name: 'Full Signature Hair & Beard', duration: '75 min', price: '10,000',
    desc: 'The full reset: fade or classic cut, beard sculpt and a hot towel facial cleanse.',
    perks: ['Cut + beard', 'Hot towel facial massage', 'Drink on the house'] },

  { category: 'Spa & Facial', name: 'Gentleman’s Deep Cleanse Facial', duration: '60 min', price: '10,000',
    desc: 'Ultrasonic pore cleanse, volcanic scrub, extraction and a balancing serum.',
    perks: ['Steam extraction', 'Clay mask', 'SPF massage'] },
  { category: 'Spa & Facial', name: 'Royal Botanical Facial', duration: '90 min', price: '15,000',
    desc: 'African botanical extracts, lymphatic drainage and a 24k gold essence.',
    perks: ['Gold leaf serum', 'Acupressure', 'Neck & shoulder relief'] },
  { category: 'Spa & Facial', name: 'Full Body Deep Tissue Massage', duration: '60 min', price: '10,000',
    desc: 'Firm, targeted pressure for knots, spine tension and post-training recovery.',
    perks: ['Warm aromatherapy oils', 'Myofascial release', 'Herbal tea after'] },
  { category: 'Spa & Facial', name: 'Heated Basalt Stone Therapy', duration: '75 min', price: '12,000',
    desc: 'Smooth volcanic stones, heated just right, worked along the back and shoulders.',
    perks: ['Volcanic stones', 'Full spine work', 'Deep relaxation'] },

  { category: 'VIP Suite', name: 'Executive Suite Day Pass', duration: '2 hrs', price: '20,000',
    desc: 'A private room for one, with drinks, entertainment and priority service.',
    perks: ['Personal attendant', 'Spirits & espresso', 'Cut + hot towel shave'] },
  { category: 'VIP Suite', name: 'Royal VIP Rejuvenation Ritual', duration: '3.5 hrs', price: '35,000',
    desc: 'Signature hair & beard, Royal Botanical Facial and a 60-minute deep tissue massage.',
    perks: ['Full suite privacy', 'Private rain shower', 'CiGa Raw gift pack'] },

  { category: 'Tattoo', name: 'Consultation & Sketch', duration: '45 min', price: '5,000',
    desc: 'Sit down with the lead artist to plan, size and stencil your design. Credited to the tattoo.',
    perks: ['Digital mock-ups', 'Skin tone matching', 'Hygiene walk-through'] },
  { category: 'Tattoo', name: 'Fine-Line & Script', duration: '1–2 hrs', price: 'from 15,000',
    desc: 'Fine needles for quotes, dates, small symbols and delicate outlines.',
    perks: ['Single-use needles', 'Vegan inks', 'Medical dermal film'] },
  { category: 'Tattoo', name: 'Afro-Centric & Tribal Blackwork', duration: 'Half day', price: 'from 30,000',
    desc: 'Bold African patterns and Grassfields geometry, saturated to last.',
    perks: ['Custom motifs', 'High-density pigment', 'Free touch-up'] },
]

const packages = [
  { title: 'The Groom', price: '25,000', note: 'For the morning of the wedding.',
    items: ['Master cut & razor line-up', 'Hot towel beard sculpt', 'Hydration mini-facial', 'Hand grooming', 'A glass of aged whisky'] },
  { title: 'Father & Son', price: '10,000', note: 'Two chairs, side by side.',
    items: ['Two signature cuts', 'Clean razor finish', 'Scalp refresh & styling', 'Soft drinks'] },
  { title: 'Monthly Member', price: '40,000', unit: '/ month', note: 'For people who never want to look unfinished.',
    items: ['4 cuts + beard trims', '1 deep tissue massage', 'VIP Suite on every visit', '15% off tattoo work'] },
]

function Row({ item, open, onToggle }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="border-b border-ink/15"
    >
      <button onClick={onToggle} className="group w-full grid grid-cols-[1fr_auto_auto] items-baseline gap-4 sm:gap-8 py-6 text-left" aria-expanded={open}>
        <span>
          <span className="label text-ink-500 block mb-1">{item.category}</span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight transition-colors group-hover:text-ember">{item.name}</span>
        </span>
        <span className="hidden sm:block label text-ink-500">{item.duration}</span>
        <span className="flex items-center gap-4">
          <span className="text-xl sm:text-2xl lg:text-3xl font-medium tabular-nums whitespace-nowrap">{item.price}</span>
          <span className={`w-9 h-9 rounded-full border border-ink/20 grid place-items-center transition-all duration-500 ${open ? 'bg-ink text-paper rotate-45' : ''}`}>
            <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" /></svg>
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="pb-8 grid md:grid-cols-[1.4fr_1fr_auto] gap-6 md:items-end">
              <p className="text-lg text-ink-600 max-w-lg">{item.desc}</p>
              <ul className="space-y-1 text-ink-600">
                {item.perks.map(p => <li key={p} className="flex gap-2"><span className="text-ember">—</span>{p}</li>)}
              </ul>
              <Link to={`/booking?service=${encodeURIComponent(item.name)}`} className="btn-ink group !pr-2 justify-self-start">
                Book this <ArrowDot className="bg-paper/15" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function ServicesPage({ ready }) {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = cat === 'All' ? allServices : allServices.filter(s => s.category === cat)

  return (
    <>
      <PageHero
        ready={ready}
        index="02"
        kicker="Services & prices"
        lines={[<>The whole</>, <><span className="accent text-ember">menu.</span></>]}
        intro="Every price in FCFA, every service done by a specialist. Tap a row for what is included."
      />

      <section className="bg-paper pt-12 pb-24 lg:pb-36">
        <div className="wrap">
          <LayoutGroup>
            <div className="sticky top-[72px] z-30 -mx-5 px-5 sm:mx-0 sm:px-0 py-4 bg-paper/90 backdrop-blur-md flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setOpen(null) }}
                  className={`relative isolate chip whitespace-nowrap ${cat === c ? 'text-paper border-ink' : 'border-ink/20 text-ink hover:border-ink'}`}
                >
                  {cat === c && (
                    <motion.span layoutId="chip" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>

            <motion.ul layout className="mt-6 border-t border-ink/15">
              <AnimatePresence mode="popLayout">
                {list.map(item => (
                  <Row key={item.name} item={item} open={open === item.name} onToggle={() => setOpen(open === item.name ? null : item.name)} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 lg:py-36">
        <div className="wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <Label num="+" className="text-paper/50 mb-6">Packages</Label>
              <h2 className="h2"><Lines lines={[<>Better</>, <span key="t" className="accent text-ember">together.</span>]} /></h2>
            </div>
            <Reveal className="max-w-sm text-paper/60 text-lg">Bundles for the big days and the regulars.</Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className={`h-full flex flex-col p-8 lg:p-10 rounded-[2px] ${i === 1 ? 'bg-ember text-ink' : 'bg-ink-800'}`}
                >
                  <p className="label opacity-60">0{i + 1}</p>
                  <h3 className="display text-5xl mt-6">{p.title}</h3>
                  <p className={`mt-2 ${i === 1 ? 'text-ink/70' : 'text-paper/60'}`}>{p.note}</p>
                  <p className="mt-10 text-4xl font-medium tabular-nums">
                    {p.price} <span className="text-base opacity-60">FCFA {p.unit}</span>
                  </p>
                  <ul className={`mt-8 pt-8 border-t space-y-2 flex-1 ${i === 1 ? 'border-ink/20' : 'border-paper/15'}`}>
                    {p.items.map(it => <li key={it}>{it}</li>)}
                  </ul>
                  <Link
                    to={`/booking?package=${encodeURIComponent(p.title)}`}
                    className={`mt-10 group !pr-2 self-start ${i === 1 ? 'btn-ink' : 'btn-line-light'}`}
                  >
                    Book package <ArrowDot className={i === 1 ? 'bg-paper/15' : ''} />
                  </Link>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p className="display text-4xl lg:text-6xl max-w-2xl">Not sure what to book?</p>
          <a href={wa('Hello CiGa Raw, I have a question about your services.')} target="_blank" rel="noopener noreferrer" className="btn-ink group !pr-2">
            Ask us on WhatsApp <ArrowDot className="bg-paper/15" />
          </a>
        </div>
      </section>
    </>
  )
}
