import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { galleryImages } from '../../../data/galleryImages.js'

const categories = ['All', 'College Life', 'Events', 'Achievements', 'Projects', 'Personal Moments']

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? galleryImages : galleryImages.filter(g => g.category === active)

  function prev() {
    const i = filtered.findIndex(g => g.id === lightbox.id)
    setLightbox(filtered[(i - 1 + filtered.length) % filtered.length])
  }
  function next() {
    const i = filtered.findIndex(g => g.id === lightbox.id)
    setLightbox(filtered[(i + 1) % filtered.length])
  }

  return (
    <div className="min-h-[100dvh] bg-bg">
      {/* Hero */}
      <div className="py-24 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted
          hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="font-display font-bold text-text" style={{ fontSize: 'clamp(3rem,6vw,5rem)' }}>
          Gallery
        </h1>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 px-4">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-1.5 rounded-full font-body text-sm transition-all duration-200
              ${active === c
                ? 'bg-accent text-bg font-semibold'
                : 'border border-white/10 text-muted hover:border-accent/30 hover:text-text'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-24"
        style={{ columns: 'auto 280px', gap: '1rem' }}>
        {filtered.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="break-inside-avoid mb-4 cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setLightbox(img)}
            style={{ breakInside: 'avoid' }}
          >
            <img
              src={img.ph}
              alt={img.alt}
              className="w-full object-cover hover:scale-[1.02] hover:brightness-110 transition-all duration-500"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-muted hover:text-text">
              <X size={24} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-6 text-muted hover:text-text">
              <ArrowLeft size={24} />
            </button>
            <motion.img
              key={lightbox.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={lightbox.ph}
              alt={lightbox.alt}
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-6 text-muted hover:text-text">
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
