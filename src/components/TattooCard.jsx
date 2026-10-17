import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fullPrice, shortPrice } from '../photos'
import { easeOut } from './motion'

// Price tag that stays visible on a tattoo photo
export function PriceTag({ price, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-ink/75 backdrop-blur-md text-paper pl-2 pr-3 py-1.5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)] ${className}`}>
      <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_0_3px_rgba(224,82,29,0.3)]" />
      <span className="display text-lg leading-none tabular-nums">{shortPrice(price)}</span>
      <span className="label text-[0.6rem] text-paper/60">FCFA</span>
    </span>
  )
}

export const isSignature = (price) => price >= 1_000_000

// Portfolio card: photo, price tag, and a booking panel that slides up on hover
export default function TattooCard({ work, index = 0 }) {
  const signature = isSignature(work.price)
  const bookHref = `/booking?service=${encodeURIComponent('Tattoo')}&notes=${encodeURIComponent(`Tattoo design: ${work.title} (${fullPrice(work.price)} FCFA)`)}`

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.8, ease: easeOut, delay: (index % 4) * 0.06 }}
      className="group relative overflow-hidden rounded-[2px] bg-ink break-inside-avoid mb-4 lg:mb-5"
    >
      <img
        src={work.src}
        alt={`${work.title} — ${work.style}, ${fullPrice(work.price)} FCFA`}
        loading="lazy"
        className="block w-full h-auto transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />

      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <PriceTag price={work.price} />
        {signature && (
          <span className="label text-[0.6rem] bg-ember text-ink rounded-full px-2.5 py-1.5">Signature</span>
        )}
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-ink via-ink/80 to-transparent text-paper">
        <span className="block font-medium text-lg leading-tight">{work.title}</span>
        <span className="label text-paper/60">{work.style}</span>
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="pt-4 mt-3 border-t border-paper/15 flex items-end justify-between gap-3">
              <span>
                <span className="block label text-paper/50">This design</span>
                <span className="display text-2xl tabular-nums">{fullPrice(work.price)}</span>
                <span className="label text-paper/60 ml-1">FCFA</span>
              </span>
              <Link to={bookHref} className="shrink-0 rounded-full bg-ember text-ink text-sm font-medium px-4 py-2 hover:bg-paper transition-colors">
                Book it →
              </Link>
            </div>
          </div>
        </div>
      </figcaption>
    </motion.figure>
  )
}
