import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDot, easeOut } from '../components/motion'

const links = [
  { label: 'Services & prices', path: '/services' },
  { label: 'Home service', path: '/home-service' },
  { label: 'Tattoo portfolio', path: '/tattoo' },
  { label: 'Book an appointment', path: '/booking' },
]

export default function NotFoundPage() {
  return (
    <section className="bg-paper min-h-[90vh] pt-36 pb-24 flex items-center">
      <div className="wrap">
        <p className="label text-ink-500 mb-6">(404) Page not found</p>
        <h1 className="display text-[22vw] lg:text-[14vw] leading-[0.85] flex">
          {'404'.split('').map((d, i) => (
            <motion.span
              key={i}
              className={i === 1 ? 'accent text-ember' : ''}
              initial={{ y: '60%', opacity: 0, rotate: i === 1 ? -20 : 0 }}
              animate={{ y: '0%', opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.4 + i * 0.1 }}
            >
              {d}
            </motion.span>
          ))}
        </h1>
        <p className="text-2xl lg:text-3xl font-medium tracking-tight mt-6 max-w-xl">This chair is empty — the page you were looking for isn&rsquo;t here.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-ink group !pr-2">Back to home <ArrowDot className="bg-paper/15" /></Link>
          {links.map(l => <Link key={l.path} to={l.path} className="btn-line">{l.label}</Link>)}
        </div>
      </div>
    </section>
  )
}
