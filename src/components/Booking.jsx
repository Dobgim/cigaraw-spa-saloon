import { useState, useRef, useEffect } from 'react'

const services = [
  'Classic Cut',
  'Skin Fade',
  'Beard Sculpt',
  'Hot Towel Shave',
  'VIP Suite Experience',
  'Full Signature Package',
  'Spa Facial',
  'Massage Therapy',
  'Tattoo Consultation',
  'Tattoo Session',
]

const times = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM',
]

export default function Booking() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!revealEls) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.phone.trim())   e.phone   = 'Phone number is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.service)        e.service = 'Please select a service'
    if (!form.date)           e.date    = 'Please pick a date'
    if (!form.time)           e.time    = 'Please pick a time'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <section id="booking" ref={sectionRef} className="relative py-28 bg-dark-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img src="/images/vip_section.jpg" alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-dark-900/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left info panel */}
          <div className="lg:col-span-2">
            <p className="eyebrow reveal">Make a Reservation</p>
            <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
              Book Your <em>Experience</em>
            </h2>
            <div className="gold-divider reveal" style={{ transitionDelay: '0.2s' }} />
            <p className="font-serif text-dark-300 text-base leading-relaxed reveal" style={{ transitionDelay: '0.25s' }}>
              Reserve your appointment with Cigaraw's elite team. Every booking is personally confirmed within 2 hours during business hours.
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-6 reveal" style={{ transitionDelay: '0.3s' }}>
              {[
                { icon: '📍', label: 'Location', value: 'Commercial Avenue, Bamenda, NW Region, Cameroon' },
                { icon: '📞', label: 'Phone',    value: '+237 677 123 456' },
                { icon: '✉️', label: 'Email',    value: 'bookings@cigaraw.com' },
                { icon: '🕐', label: 'Hours',    value: 'Mon–Sat: 8am – 7pm | Sun: 10am – 4pm' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="text-xl w-8 flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-sans tracking-widest text-gold-500 uppercase">{label}</p>
                    <p className="font-serif text-dark-200 text-sm mt-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 reveal" style={{ transitionDelay: '0.4s' }}>
              <p className="text-xs font-sans tracking-widest text-dark-400 uppercase mb-4">Follow Us</p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Twitter'].map(soc => (
                  <button
                    key={soc}
                    className="px-4 py-2 border border-gold-500/20 text-gold-400 text-xs font-sans tracking-widest uppercase hover:border-gold-400/60 hover:bg-gold-500/5 transition-all duration-300"
                    aria-label={`Follow on ${soc}`}
                  >
                    {soc[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3 reveal-right">
            {submitted ? (
              <div className="border border-gold-400/30 bg-dark-800/60 backdrop-blur-sm p-12 text-center h-full flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 border border-gold-400/40 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8a820" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display text-4xl text-white tracking-widest">Booking Received</h3>
                <div className="gold-divider mx-auto" />
                <p className="font-serif text-dark-300 text-base leading-relaxed max-w-sm">
                  Thank you, <strong className="text-gold-400">{form.name}</strong>. Your appointment request has been received. We'll confirm via email or phone within 2 hours.
                </p>
                <button
                  className="btn-outline-gold px-8 py-3 text-xs tracking-widest mt-4"
                  onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',email:'',service:'',date:'',time:'',notes:'' }) }}
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border border-gold-500/15 bg-dark-800/40 backdrop-blur-sm p-8 md:p-10 space-y-6">
                <h3 className="font-display text-2xl text-white tracking-widest border-b border-gold-500/10 pb-4">
                  Appointment Details
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={handleChange} />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" className="form-input" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="service">Service *</label>
                  <select id="service" name="service" className="form-input" value={form.service} onChange={handleChange}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="date">Preferred Date *</label>
                    <input id="date" name="date" type="date" className="form-input" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={handleChange} />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="time">Preferred Time *</label>
                    <select id="time" name="time" className="form-input" value={form.time} onChange={handleChange}>
                      <option value="">Select time</option>
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-500 uppercase block mb-2" htmlFor="notes">Special Requests</label>
                  <textarea id="notes" name="notes" rows="3" className="form-input resize-none" placeholder="Any specific requirements or notes..." value={form.notes} onChange={handleChange} />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full font-semibold py-4 text-xs tracking-widest"
                  id="btn-submit-booking"
                >
                  Confirm Appointment
                </button>

                <p className="text-center text-xs font-serif text-dark-400">
                  We'll confirm your booking within 2 hours during business hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
