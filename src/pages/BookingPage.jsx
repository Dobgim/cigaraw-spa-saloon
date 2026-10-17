import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ease, easeOut, Reveal } from '../components/motion'
import { ADDRESS, EMAIL, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY, wa } from '../site'
import { MENU } from '../menu'

const serviceOptions = [
  ...MENU.flatMap(m => m.items.map(it => ({ group: m.group, name: /\d/.test(it.price) ? `${it.name} (${it.price} FCFA)` : `${it.name} (price on request)` }))),
  { group: 'Tattoo', name: 'Tattoo consultation (priced per design)' },
]

const groups = [...new Set(serviceOptions.map(s => s.group))]

const specialists = [
  'First available',
  'Barber',
  'Spa & beauty therapist',
  'Tattoo artist',
]

const timeSlots = ['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:15']

const empty = { name: '', phone: '', email: '', service: '', specialist: 'First available', date: '', time: '', notes: '' }

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label text-ink-500 block">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-ember-600 text-sm mt-2">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step({ n, title, children }) {
  return (
    <Reveal className="grid md:grid-cols-[8rem_1fr] gap-6 py-10 border-t border-ink/15">
      <div>
        <span className="label text-ember">Step {n}</span>
        <h3 className="text-2xl font-medium tracking-tight mt-1">{title}</h3>
      </div>
      <div className="space-y-8">{children}</div>
    </Reveal>
  )
}

export default function BookingPage({ ready }) {
  const [params] = useSearchParams()
  const initial = params.get('service') || params.get('package') || ''
  const initialNotes = params.get('notes') || ''

  // Pre-fill from ?service= links; unmatched names go into the notes
  const [form, setForm] = useState(() => {
    if (!initial) return { ...empty, notes: initialNotes }
    const match = serviceOptions.find(s => s.name.toLowerCase().includes(initial.toLowerCase()))
    return { ...empty, service: match ? match.name : '', notes: initialNotes || (match ? '' : initial) }
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  const validate = () => {
    const err = {}
    if (!form.name.trim())  err.name  = 'Please tell us your name.'
    if (!form.phone.trim()) err.phone = 'We need a number to confirm (e.g. +237 679…).'
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) err.email = 'That email doesn’t look right.'
    if (!form.service)      err.service = 'Pick a service.'
    if (!form.date)         err.date    = 'Pick a date.'
    if (!form.time)         err.time    = 'Pick a time.'
    return err
  }

  const set = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }
  const onChange = (e) => set(e.target.name, e.target.value)

  const submit = (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    setDone({ ref: `CIG-${Math.floor(10000 + Math.random() * 90000)}`, ...form })
    window.scrollTo({ top: document.getElementById('booking-form').offsetTop - 100, behavior: 'smooth' })
  }

  const message = done && [
    'Hello CiGa Raw, I would like to confirm this booking:',
    '',
    `Reference: ${done.ref}`,
    `Name: ${done.name}`,
    `Service: ${done.service}`,
    `Specialist: ${done.specialist}`,
    `Date: ${done.date} at ${done.time}`,
    `Phone: ${done.phone}`,
    `Notes: ${done.notes || 'None'}`,
  ].join('\n')

  return (
    <>
      <PageHero
        ready={ready}
        index="07"
        kicker="Book"
        lines={[<>Pull up</>, <>a <span className="accent text-ember">chair.</span></>]}
        intro="Takes about a minute. We confirm every booking personally on WhatsApp or by phone."
      />

      <section id="booking-form" className="bg-paper pt-10 pb-24 lg:pb-36">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-16">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start order-2 lg:order-1">
            <div className="bg-ink text-paper p-8 rounded-[2px]">
              <p className="label text-paper/40 mb-3">Address</p>
              {ADDRESS.map(l => <p key={l} className="text-lg">{l}</p>)}
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-ember text-sm mt-2 inline-block link-draw">Open in Google Maps →</a>

              <p className="label text-paper/40 mb-3 mt-8">Hours</p>
              {HOURS.map(h => (
                <p key={h.days} className="flex justify-between text-lg"><span className="text-paper/60">{h.days}</span><span>{h.time}</span></p>
              ))}

              <p className="label text-paper/40 mb-3 mt-8">Contact</p>
              <a href={`tel:${PHONE_TEL}`} className="block text-lg link-draw">{PHONE_DISPLAY}</a>
              <p className="text-lg"><span className="text-paper/60">WhatsApp</span> {WHATSAPP_DISPLAY}</p>
              <a href={`mailto:${EMAIL}`} className="block text-lg link-draw">{EMAIL}</a>

              <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn bg-wa text-ink before:bg-paper w-full mt-8">
                <WhatsAppIcon className="w-4 h-4" /> Book on WhatsApp instead
              </a>
            </div>
            <div className="mt-5 p-8 bg-bone rounded-[2px]">
              <p className="text-xl font-medium tracking-tight">Our promise</p>
              <p className="text-ink-600 mt-2">If we keep you waiting more than 15 minutes past your time, your hot towel or conditioning treatment is on us.</p>
            </div>
          </aside>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  className="bg-ember text-ink p-8 lg:p-14 rounded-[2px]"
                >
                  <svg viewBox="0 0 52 52" className="w-16 h-16" aria-hidden="true">
                    <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
                    <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }} />
                  </svg>
                  <p className="label mt-8 opacity-70">Request received · {done.ref}</p>
                  <h2 className="display text-5xl lg:text-7xl mt-3">See you soon, {done.name.split(' ')[0]}.</h2>

                  <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 border-t border-ink/20">
                    {[
                      ['Service', done.service],
                      ['With', done.specialist],
                      ['When', `${done.date} · ${done.time}`],
                      ['Where', 'Logpom, Douala'],
                    ].map(([k, v]) => (
                      <div key={k} className="py-4 border-b border-ink/20">
                        <dt className="label opacity-60">{k}</dt>
                        <dd className="text-lg mt-1">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-8 max-w-lg text-ink/80">
                    To lock it in, send this booking to us on WhatsApp — we&rsquo;ll reply to confirm.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={wa(message)} target="_blank" rel="noopener noreferrer" className="btn-ink">
                      <WhatsAppIcon className="w-4 h-4 text-wa" /> Confirm on WhatsApp
                    </a>
                    <button onClick={() => { setDone(null); setForm(empty) }} className="btn-line">Book something else</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  <Step n="1" title="What">
                    <Field label="Service" htmlFor="service" error={errors.service}>
                      <select id="service" name="service" className="field" value={form.service} onChange={onChange}>
                        <option value="">Choose a service…</option>
                        {groups.map(g => (
                          <optgroup key={g} label={g}>
                            {serviceOptions.filter(s => s.group === g).map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                          </optgroup>
                        ))}
                      </select>
                    </Field>
                    <Field label="Who with" htmlFor="specialist">
                      <select id="specialist" name="specialist" className="field" value={form.specialist} onChange={onChange}>
                        {specialists.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </Step>

                  <Step n="2" title="When">
                    <Field label="Date" htmlFor="date" error={errors.date}>
                      <input id="date" name="date" type="date" min={new Date().toISOString().split('T')[0]} className="field" value={form.date} onChange={onChange} />
                    </Field>
                    <Field label="Time" error={errors.time}>
                      <div className="flex flex-wrap gap-2 mt-3" role="radiogroup" aria-label="Time slot">
                        {timeSlots.map(t => (
                          <button
                            type="button"
                            key={t}
                            role="radio"
                            aria-checked={form.time === t}
                            onClick={() => set('time', t)}
                            className={`chip font-mono text-sm tabular-nums ${form.time === t ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </Step>

                  <Step n="3" title="You">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <Field label="Full name" htmlFor="name" error={errors.name}>
                        <input id="name" name="name" type="text" autoComplete="name" placeholder="Your full name" className="field" value={form.name} onChange={onChange} />
                      </Field>
                      <Field label="Phone / WhatsApp" htmlFor="phone" error={errors.phone}>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+237 679 000 000" className="field" value={form.phone} onChange={onChange} />
                      </Field>
                    </div>
                    <Field label="Email (optional)" htmlFor="email" error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="field" value={form.email} onChange={onChange} />
                    </Field>
                    <Field label="Anything we should know?" htmlFor="notes">
                      <textarea id="notes" name="notes" rows="3" placeholder="Reference style, sensitivities, VIP requests…" className="field resize-none" value={form.notes} onChange={onChange} />
                    </Field>
                  </Step>

                  <div className="border-t border-ink/15 pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="text-ink-500 max-w-sm">VIP bookings carry a 10,000 FCFA reservation fee. We&rsquo;ll confirm every booking on WhatsApp or by phone.</p>
                    <button type="submit" className="btn-ember !px-10 !py-5 text-base">Request booking</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
