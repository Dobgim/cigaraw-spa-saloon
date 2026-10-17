import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SHOP } from '../photos'
import OpenStatus from './OpenStatus'
import { useRef } from 'react'
import { ArrowDot, Lines, Magnetic } from './motion'
import { ADDRESS, EMAIL, HOURS, NAV, PHONE_DISPLAY, PHONE_TEL, wa } from '../site'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '0%'])

  return (
    <footer ref={ref} className="relative bg-ink text-paper overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[720px] lg:h-[640px] overflow-hidden">
        <motion.img src={SHOP.team1} alt="" style={{ y: bgY }} className="w-full h-[130%] object-cover object-[center_20%] opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
      </div>
      <div className="wrap relative pt-24 lg:pt-36 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-paper/10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <p className="label text-paper/40">Your chair is waiting</p>
              <OpenStatus />
            </div>
            <h2 className="h2 text-paper">
              <Lines lines={[
                <>Sit down.</>,
                <>We&rsquo;ll take it <span className="accent text-ember">from here.</span></>,
              ]} />
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link to="/booking" className="btn-ember group !pr-2">
                  Book an appointment <ArrowDot className="bg-paper/15" />
                </Link>
              </Magnetic>
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-line-light">
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-paper/75 lg:pt-12">
            <div>
              <p className="label text-paper/40 mb-4">Visit</p>
              {ADDRESS.map(l => <p key={l}>{l}</p>)}
            </div>
            <div>
              <p className="label text-paper/40 mb-4">Hours</p>
              {HOURS.map(h => (
                <p key={h.days}><span className="text-paper/45">{h.days}</span><br />{h.time}</p>
              ))}
            </div>
            <div>
              <p className="label text-paper/40 mb-4">Talk to us</p>
              <a href={`tel:${PHONE_TEL}`} className="link-draw block">{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} className="link-draw">{EMAIL}</a>
            </div>
            <div>
              <p className="label text-paper/40 mb-4">Pages</p>
              <ul className="space-y-1">
                {NAV.slice(1).map(({ label, path }) => (
                  <li key={path}><Link to={path} className="link-draw">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-6 label text-paper/40">
          <span>&copy; {new Date().getFullYear()} CiGa Raw Salon &amp; Spa</span>
          <span>Beauty · Relaxation · Confidence</span>
        </div>
      </div>

      <motion.p
        style={{ y }}
        aria-hidden="true"
        className="relative display text-[23vw] leading-[0.75] text-center text-ember select-none -mb-[3vw] whitespace-nowrap"
      >
        CiGa Raw
      </motion.p>
    </footer>
  )
}
