import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const galleryItems = [
  {
    id: 1,
    title: 'Precision Mid Skin Fade & Groomed Beard',
    category: 'Barbering & Fades',
    image: '/images/gallery_haircut.jpg',
    desc: 'Crisp hairline geometry, natural beard shape, and gradual skin blend.',
  },
  {
    id: 2,
    title: 'Master Barber in Action',
    category: 'Barbering & Fades',
    image: '/images/hero_barber.jpg',
    desc: 'Classic scissor over comb technique in our Bamenda flagship salon.',
  },
  {
    id: 3,
    title: 'Razor Fade Detailing Session',
    category: 'Barbering & Fades',
    image: '/images/barber_service.jpg',
    desc: 'Surgical focus on clipper transition and temple line perfection.',
  },
  {
    id: 4,
    title: 'Aromatherapy & Facial Massage Therapy',
    category: 'Luxury Spa',
    image: '/images/spa_service.jpg',
    desc: 'Certified therapist delivering balancing facial acupressure in our spa suite.',
  },
  {
    id: 5,
    title: 'Luxury Stone & Plant Spa Suite',
    category: 'Luxury Spa',
    image: '/images/spa_suite.jpg',
    desc: 'Natural stone walls, warm candlelight, and plush massage tables.',
  },
  {
    id: 6,
    title: 'VIP Private Grooming Sanctuary',
    category: 'VIP Suite',
    image: '/images/vip_section.jpg',
    desc: 'Single-client secluded lounge equipped with leather appointments and private bar.',
  },
  {
    id: 7,
    title: 'Resident Tattoo Artist Inking Session',
    category: 'Tattoo Studio',
    image: '/images/tattoo_section.jpg',
    desc: 'Sterile needlework, ambient LED lighting, and custom forearm script.',
  },
  {
    id: 8,
    title: 'Intricate Blackwork Tribal Detail',
    category: 'Tattoo Studio',
    image: '/images/tattoo_art.jpg',
    desc: 'High-density pigment saturation honoring Cameroonian cultural geometric patterns.',
  },
]

const categories = ['All Looks', 'Barbering & Fades', 'Luxury Spa', 'VIP Suite', 'Tattoo Studio']

const reviews = [
  {
    name: 'Nchinda Bertrand',
    role: 'Business Owner, Bamenda',
    text: 'Nothing in Bamenda touches Cigaraw. The attention to detail, the clean environment, the skilled hands — this place has completely changed how I think about grooming. I won\'t sit in any other barber chair.',
    service: 'Signature Skin Fade',
  },
  {
    name: 'Tabi Godwill',
    role: 'Creative Director',
    text: 'My skin fade was on point. These barbers actually know what they\'re doing — proper technique, clean tools, and they take their time. I\'ve brought three of my friends here. None of us have looked back.',
    service: 'Full Beard Sculpt',
  },
  {
    name: 'Fru Valerie',
    role: 'Entrepreneur',
    text: 'The spa service was unreal. I came in stressed and left completely renewed. The therapist was professional and really understood what my body needed. Cigaraw is a genuine gem in Bamenda.',
    service: 'Deep Tissue Massage',
  },
  {
    name: 'Che Kingsley',
    role: 'Civil Engineer',
    text: 'The VIP Suite is worth every franc. Having a haircut in total quiet with an espresso, no crowd, and pure VIP treatment made my Saturday morning perfect.',
    service: 'VIP Executive Suite',
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All Looks')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = activeTab === 'All Looks'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab)

  return (
    <div className="bg-dark-950">
      <PageHero
        eyebrow="Visual Portfolio &bull; Bamenda, Cameroon"
        title="The Cigaraw"
        highlight="Lookbook"
        subtitle="Step inside our studio through our visual gallery. Real clients, master artistry, and the authentic energy of Commercial Avenue."
        image="/images/gallery_haircut.jpg"
        breadcrumb="Lookbook & Gallery"
      />

      {/* Filter Tabs */}
      <section className="py-10 border-b border-gold-500/10 sticky top-[72px] z-30 bg-dark-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                activeTab === cat
                  ? 'btn-gold text-dark-950 font-semibold shadow-gold'
                  : 'border border-gold-500/20 text-dark-300 hover:text-white hover:border-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry / Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group cursor-pointer relative overflow-hidden border border-gold-500/15 bg-dark-900/60 aspect-[3/4] flex flex-col justify-end p-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="relative z-10">
                <span className="text-[0.6rem] font-sans tracking-[0.25em] text-gold-400 uppercase block mb-1">
                  {item.category}
                </span>
                <h3 className="font-display text-lg text-white group-hover:text-gold-300 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="font-serif text-dark-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {item.desc}
                </p>
                <span className="text-[0.65rem] font-sans tracking-widest text-gold-500 uppercase mt-3 inline-flex items-center gap-1 font-semibold">
                  Expand Photo &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[1000] bg-dark-950/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-4xl w-full border border-gold-500/30 bg-dark-900 p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 text-gold-400 hover:text-white text-2xl font-sans w-10 h-10 border border-gold-500/20 flex items-center justify-center"
              aria-label="Close photo preview"
            >
              &times;
            </button>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/5] overflow-hidden border border-gold-500/20">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="eyebrow block">{lightboxItem.category}</span>
                <h3 className="font-display text-3xl text-white mb-4">
                  {lightboxItem.title}
                </h3>
                <div className="gold-divider mb-4" />
                <p className="font-serif text-dark-300 text-base leading-relaxed mb-8">
                  {lightboxItem.desc}
                </p>
                <p className="text-xs font-sans tracking-widest text-gold-500 uppercase mb-6">
                  📍 Captured at Cigaraw Saloon, Commercial Avenue, Bamenda
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/booking"
                    onClick={() => setLightboxItem(null)}
                    className="btn-gold px-8 py-3 text-xs tracking-widest uppercase"
                  >
                    Book This Style
                  </Link>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="btn-outline-gold px-6 py-3 text-xs tracking-widest uppercase"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Reviews */}
      <section className="py-24 bg-dark-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className="eyebrow">Client Feedback</p>
            <h2 className="section-title">
              What Bamenda Says <em>About Us</em>
            </h2>
            <div className="gold-divider mx-auto my-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="p-6 border border-gold-500/15 bg-dark-950 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-gold-400 mb-3 text-sm">★★★★★</div>
                  <p className="font-serif text-dark-200 text-sm leading-relaxed italic mb-6">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-gold-500/10">
                  <p className="font-sans font-semibold text-white text-sm">{r.name}</p>
                  <p className="font-serif text-xs text-gold-500 mt-0.5">{r.role}</p>
                  <span className="text-[0.65rem] font-sans text-dark-400 uppercase tracking-wider block mt-2">
                    Service: {r.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/10 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Inspired by Our Work?</h2>
          <p className="font-serif text-dark-300 text-base mb-8">
            Experience the precision in person. Secure your chair with our master artists today.
          </p>
          <Link to="/booking" className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
            Schedule an Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
