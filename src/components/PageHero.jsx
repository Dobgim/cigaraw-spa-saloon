import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { easeOut, Lines } from './motion'

// Editorial page opener: index number, big stacked title, intro copy, full-bleed image
export default function PageHero({ index, kicker, lines, intro, image, imageAlt = '', imagePosition = 'center', aside, ready = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section ref={ref} className="relative bg-paper pt-32 lg:pt-40">
      <div className="wrap">
        <div className="flex items-center justify-between label text-ink-500 mb-8 lg:mb-12">
          <span>({index}) {kicker}</span>
          <span className="hidden sm:inline">Logpom, Douala</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <h1 className="lg:col-span-8 display text-[15vw] sm:text-[11vw] lg:text-[8.2vw]">
            <Lines lines={lines} delay={0.4} when={ready} />
          </h1>
          <motion.div
            className="lg:col-span-4 lg:pb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: easeOut, delay: 0.8 }}
          >
            <p className="text-lg lg:text-xl leading-snug text-ink-600 max-w-md">{intro}</p>
            {aside && <div className="mt-6">{aside}</div>}
          </motion.div>
        </div>
      </div>

      {image && (
        <motion.div
          className="relative mt-12 lg:mt-16 h-[55vh] lg:h-[78vh] overflow-hidden mx-5 sm:mx-8 lg:mx-12"
          initial={{ clipPath: 'inset(30% 12% 0% 12%)' }}
          animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.6 }}
        >
          <motion.img
            src={image}
            alt={imageAlt}
            style={{ y: imgY, scale: imgScale, objectPosition: imagePosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      )}
    </section>
  )
}
