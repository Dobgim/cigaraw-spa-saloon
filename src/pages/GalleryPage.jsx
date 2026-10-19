import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { fullPrice, SALON, TATTOOS } from '../photos'
import { PriceTag } from '../components/TattooCard'
import { GOOGLE_RATING, MAPS_URL } from '../site'
import { ArrowDot, ease, easeOut, Label, Lines, Reveal } from '../components/motion'

const getItems = () => [
  ...SALON.map((p, i) => ({ id: `s${i}-${p.src}`, title: p.title, category: 'Salon', image: p.src, desc: p.desc })),
  ...TATTOOS.map((w, i) => ({ id: `t${i}-${w.src}`, title: w.title, category: 'Tattoo', image: w.src, desc: w.style, price: w.price })),
]

const categories = ['All', 'Salon', 'Tattoo']

// Real reviews from the Google Maps listing
const reviews = [
  { name: 'IDP Board Members', text: 'They offer premium services' },
  { name: 'Young k', text: 'Fully' },
]

export default function GalleryPage({ ready }) {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = getItems()
  const list = cat === 'All' ? items : items.filter(i => i.category === cat)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <PageHero
        ready={ready}
        index="06"
        kicker="Gallery"
        lines={[<>Real chairs,</>, <><span className="accent text-ember">real people.</span></>]}
        intro="No stock photos of strangers. This is our salon, our clients and the work that leaves our studio."
      />

      <section className="bg-paper pt-10 pb-24 lg:pb-36">
        <div className="wrap">
          <LayoutGroup>
            <div className="flex items-center justify-between gap-4 mb-10">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`relative isolate chip whitespace-nowrap ${cat === c ? 'text-paper border-ink' : 'border-ink/20 hover:border-ink'}`}
                  >
                    {cat === c && <motion.span layoutId="gchip" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    {c}
                  </button>
                ))}
              </div>
              <span className="label text-ink-500 hidden sm:block tabular-nums">{String(list.length).padStart(2, '0')} photos</span>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 lg:gap-5">
              <AnimatePresence>
                {list.map((it, i) => (
                  <motion.button
                    key={it.id}
                    onClick={() => setOpen(it)}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.6, ease: easeOut, delay: Math.min(i, 8) * 0.04 }}
                    className="group relative block w-full overflow-hidden text-left mb-4 lg:mb-5 break-inside-avoid rounded-[2px] bg-ink"
                  >
                    <motion.img layoutId={`img-${it.id}`} src={it.image} alt={`${it.title} — ${it.desc}`} loading="lazy" className="block w-full h-auto transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                    {it.price && <PriceTag price={it.price} className="absolute top-3 left-3" />}
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute left-5 right-5 bottom-5 flex items-end justify-between text-paper translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span>
                        <span className="label text-paper/70 block mb-1">{it.category}</span>
                        <span className="text-xl lg:text-2xl font-medium tracking-tight">{it.title}</span>
                      </span>
                      <span className="w-10 h-10 rounded-full bg-paper text-ink grid place-items-center scale-0 group-hover:scale-100 transition-transform duration-500">
                        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" /></svg>
                      </span>
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  className="fixed inset-0 z-[1000] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-5 lg:p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={open.title}
                >
                  <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 items-end" onClick={e => e.stopPropagation()}>
                    <div className="lg:col-span-8 flex justify-center">
                      <motion.img layoutId={`img-${open.id}`} src={open.image} alt={open.title} className="block max-w-full max-h-[62vh] lg:max-h-[82vh] w-auto h-auto" transition={{ duration: 0.7, ease }} />
                    </div>
                    <motion.div
                      className="lg:col-span-4 text-paper"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="label text-ember">{open.category}</p>
                      <h3 className="display text-4xl lg:text-5xl mt-3">{open.title}</h3>
                      <p className="text-paper/60 text-lg mt-4">{open.desc}</p>
                      {open.price && (
                        <p className="mt-6">
                          <span className="block label text-paper/50">This design</span>
                          <span className="display text-5xl tabular-nums">{fullPrice(open.price)}</span>
                          <span className="label text-paper/60 ml-2">FCFA</span>
                        </p>
                      )}
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          to={open.price
                            ? `/booking?service=Tattoo&notes=${encodeURIComponent(`Tattoo design: ${open.title} (${fullPrice(open.price)} FCFA)`)}`
                            : '/booking'}
                          className="btn-ember"
                        >
                          {open.price ? 'Book this design' : 'Book a visit'}
                        </Link>
                        <button onClick={() => setOpen(null)} className="btn-line-light">Close</button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-36">
        <div className="wrap">
          <Label num="A" className="text-ink-500 mb-6">What clients say</Label>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <h2 className="h2"><Lines lines={[<>Rated 5.0</>, <span key="a" className="accent text-ember">on Google.</span>]} /></h2>
            <Reveal className="text-ink-600 text-lg">{GOOGLE_RATING.count} reviews · Google Maps</Reveal>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 0.1} className="border-t border-ink/15 py-10">
                <p className="text-ember text-xl" aria-label="5 out of 5 stars">★★★★★</p>
                <p className="font-serif text-3xl lg:text-4xl leading-[1.15] mt-4">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-6 flex flex-wrap gap-x-3 text-ink-600">
                  <span className="text-ink font-medium">{r.name}</span>
                  <span>Google review</span>
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-3">
            <Link to="/booking" className="btn-ink group !pr-2">Book your appointment <ArrowDot className="bg-paper/15" /></Link>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-line">Leave a review on Google</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
