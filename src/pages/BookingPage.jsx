import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import WhatsAppIcon from '../components/WhatsAppIcon'

const serviceOptions = [
  // Barbering
  { group: 'Master Barbering', name: 'Classic Precision Cut (3,000 FCFA)' },
  { group: 'Master Barbering', name: 'Signature Skin Fade (4,500 FCFA)' },
  { group: 'Master Barbering', name: 'Beard Sculpt & Treatment (2,500 FCFA)' },
  { group: 'Master Barbering', name: 'Traditional Hot Towel Shave (4,000 FCFA)' },
  { group: 'Master Barbering', name: 'Hairline Shape-Up & Line (2,000 FCFA)' },
  { group: 'Master Barbering', name: 'Full Signature Hair & Beard Package (10,000 FCFA)' },
  { group: 'Master Barbering', name: 'Father & Son Duo Cut (7,000 FCFA)' },

  // Spa
  { group: 'Spa & Wellness', name: 'Gentleman’s Deep Cleanse Facial (10,000 FCFA)' },
  { group: 'Spa & Wellness', name: 'Royal Botanical Facial (15,000 FCFA)' },
  { group: 'Spa & Wellness', name: 'Full Body Deep Tissue Massage (10,000 FCFA)' },
  { group: 'Spa & Wellness', name: 'Heated Basalt Stone Therapy (12,000 FCFA)' },

  // VIP Suite
  { group: 'VIP Executive Suite', name: 'Executive Suite Day Pass (20,000 FCFA)' },
  { group: 'VIP Executive Suite', name: 'Royal VIP Rejuvenation Ritual (35,000 FCFA)' },

  // Tattoo
  { group: 'Tattoo Studio', name: 'Custom Tattoo Consultation (5,000 FCFA)' },
  { group: 'Tattoo Studio', name: 'Fine-Line Tattoo Session (From 15,000 FCFA)' },
  { group: 'Tattoo Studio', name: 'Afro-Centric Blackwork Session (From 30,000 FCFA)' },
]

const specialists = [
  'First Available Master Specialist',
  'Senior Fade Master',
  'Beard & Shave Specialist',
  'Lead Spa Therapist',
  'Resident Tattoo Artist',
]

const timeSlots = [
  '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
  '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
  '04:30 PM', '05:30 PM', '06:15 PM',
]

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('service') || searchParams.get('package') || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    specialist: 'First Available Master Specialist',
    date: '',
    time: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    if (initialService) {
      const match = serviceOptions.find(s => s.name.toLowerCase().includes(initialService.toLowerCase()))
      if (match) {
        setForm(prev => ({ ...prev, service: match.name }))
      } else {
        setForm(prev => ({ ...prev, service: initialService }))
      }
    }
  }, [initialService])

  const validate = () => {
    const err = {}
    if (!form.name.trim())  err.name  = 'Full name is required'
    if (!form.phone.trim()) err.phone = 'Cameroon phone number is required (e.g. +237 677...)'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Valid email address is required'
    if (!form.service)      err.service = 'Please select a service'
    if (!form.date)         err.date    = 'Please select your preferred date'
    if (!form.time)         err.time    = 'Please select a time slot'
    return err
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) {
      setErrors(err)
      return
    }

    const refCode = `CIG-${Math.floor(10000 + Math.random() * 90000)}`
    setConfirmation({
      ref: refCode,
      ...form,
    })
  }

  const whatsappMessage = confirmation
    ? encodeURIComponent(
        `Hello Cigaraw Bamenda, I have placed an appointment booking:\n\nReference: ${confirmation.ref}\nName: ${confirmation.name}\nService: ${confirmation.service}\nSpecialist: ${confirmation.specialist}\nDate: ${confirmation.date}\nTime: ${confirmation.time}\nPhone: ${confirmation.phone}\nNotes: ${confirmation.notes || 'None'}\n\nPlease confirm my reservation.`
      )
    : ''

  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Instant Reservation &bull; Commercial Avenue"
        title="Schedule Your"
        highlight="Appointment"
        subtitle="Book online in under 60 seconds. Our concierge team in Bamenda personally confirms every reservation via WhatsApp or phone."
        image="/images/vip_section.jpg"
        breadcrumb="Book Appointment"
      />

      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Salon Details & Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-gold-500/15 bg-dark-900/50 p-8">
              <span className="eyebrow block">Concierge &bull; Bamenda</span>
              <h2 className="font-display text-3xl text-white mb-4">Visit Our Salon</h2>
              <div className="gold-divider mb-6" />

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-sans tracking-widest text-gold-400 uppercase">Physical Address</p>
                  <p className="font-serif text-white text-base mt-1">
                    Commercial Avenue, Bamenda<br />
                    North West Region, Cameroon
                  </p>
                  <p className="font-serif text-xs text-dark-400 mt-1">
                    Directly accessible with secured street parking in front.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-sans tracking-widest text-gold-400 uppercase">Opening Hours</p>
                  <div className="font-serif text-sm text-dark-300 mt-1 space-y-1">
                    <p className="flex justify-between">
                      <span>Monday – Saturday:</span>
                      <strong className="text-white">8:00 AM – 7:00 PM</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Sunday:</span>
                      <strong className="text-white">10:00 AM – 4:00 PM</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-sans tracking-widest text-gold-400 uppercase">Direct Lines</p>
                  <p className="font-serif text-sm text-white mt-1">
                    Phone: <a href="tel:+237677123456" className="text-gold-400 hover:underline">+237 677 123 456</a>
                  </p>
                  <p className="font-serif text-sm text-white">
                    Email: <a href="mailto:bookings@cigaraw.com" className="text-gold-400 hover:underline">bookings@cigaraw.com</a>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gold-500/10">
                <a
                  href="https://wa.me/237677123456?text=Hello%20Cigaraw%20Saloon%2C%20I%20have%20an%20inquiry%20about%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-sans font-semibold tracking-widest uppercase transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
                  <span>Chat with Concierge on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* VIP Guarantee */}
            <div className="border border-gold-500/15 bg-dark-900/30 p-8">
              <h3 className="font-display text-xl text-white mb-2">The Cigaraw Promise</h3>
              <p className="font-serif text-dark-400 text-xs leading-relaxed">
                If your appointment starts more than 15 minutes past your reserved time due to our delay, your hot towel shave or conditioning treatment is completely on us.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form or Confirmation Card */}
          <div className="lg:col-span-7">
            {confirmation ? (
              <div className="border border-gold-400/40 bg-dark-900/80 p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full border border-gold-400/40 bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold-400 text-2xl">✓</span>
                </div>

                <span className="eyebrow block">Appointment Confirmed</span>
                <h3 className="font-display text-4xl text-white mb-2">We Expect You, {confirmation.name}</h3>
                <p className="font-mono text-sm text-gold-400 mb-6 tracking-widest">
                  BOOKING REFERENCE: {confirmation.ref}
                </p>
                <div className="gold-divider mx-auto mb-6" />

                <div className="bg-dark-950 p-6 border border-gold-500/15 max-w-md mx-auto text-left space-y-3 mb-8">
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-dark-400">Service:</span>
                    <strong className="text-white">{confirmation.service}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-dark-400">Specialist:</span>
                    <strong className="text-white">{confirmation.specialist}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-dark-400">Date &amp; Time:</span>
                    <strong className="text-gold-400">{confirmation.date} at {confirmation.time}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-dark-400">Location:</span>
                    <strong className="text-white">Commercial Ave, Bamenda</strong>
                  </div>
                  {confirmation.notes && (
                    <div className="pt-2 border-t border-gold-500/10 text-xs font-serif text-dark-300">
                      <span className="text-dark-400 block mb-0.5">Note:</span>
                      {confirmation.notes}
                    </div>
                  )}
                </div>

                <p className="font-serif text-dark-300 text-sm max-w-sm mx-auto mb-8">
                  A confirmation SMS has been dispatched. You can also send this reservation directly to our WhatsApp concierge for instant acknowledgement:
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={`https://wa.me/237677123456?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center justify-center gap-2.5 font-semibold"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current text-dark-950" />
                    <span>Confirm on WhatsApp &rarr;</span>
                  </a>
                  <button
                    onClick={() => { setConfirmation(null); setForm({ name:'',phone:'',email:'',service:'',specialist:'First Available Master Specialist',date:'',time:'',notes:'' }) }}
                    className="btn-outline-gold px-6 py-3.5 text-xs tracking-widest uppercase"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border border-gold-500/15 bg-dark-900/40 p-8 md:p-10 space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wide">Reservation Details</h3>
                  <p className="font-serif text-xs text-dark-400 mt-1">Please select your desired service and preferred timing.</p>
                </div>
                <div className="gold-divider" />

                {/* Service Selection */}
                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="service">
                    Select Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-input"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose a Grooming or Spa Service --</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        [{opt.group}] {opt.name}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Specialist & Date */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="specialist">
                      Preferred Specialist
                    </label>
                    <select
                      id="specialist"
                      name="specialist"
                      className="form-input"
                      value={form.specialist}
                      onChange={handleChange}
                    >
                      {specialists.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="date">
                      Appointment Date *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="form-input"
                      value={form.date}
                      onChange={handleChange}
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="time">
                    Preferred Time Slot *
                  </label>
                  <select
                    id="time"
                    name="time"
                    className="form-input"
                    value={form.time}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Time Slot --</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                </div>

                {/* Client Details */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gold-500/10">
                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Bertrand Nchinda"
                      className="form-input"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="phone">
                      Cameroon Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+237 677 000 000"
                      className="form-input"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="yourname@gmail.com"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-sans tracking-widest text-gold-400 uppercase block mb-2" htmlFor="notes">
                    Special Requests / Haircut Reference Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Mention any sensitivities, specific styling ideas, or VIP suite requests..."
                    className="form-input resize-none"
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-xs tracking-widest uppercase font-semibold"
                >
                  Confirm Appointment
                </button>

                <p className="text-center font-serif text-xs text-dark-400">
                  🔒 No deposit required for standard barbering. Immediate confirmation via WhatsApp &amp; SMS.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
