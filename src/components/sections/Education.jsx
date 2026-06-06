import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import { educationData } from '../../data/education.js'

export default function Education() {
  return (
    <section id="education" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Academic Foundation" title="Where It All Started" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((item, i) => (
          <motion.div
            key={item.id}
            className="card-bezel min-h-[420px]"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6 }}
          >
            <div className="card-bezel-inner relative overflow-hidden min-h-[420px] flex flex-col justify-end p-0">

              {/* Background photo */}
              <img
                src={item.photo}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.style.display = 'none'
                }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              {/* Logo badge — only if logo exists */}
              {item.logo && (
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full
                  bg-white/10 backdrop-blur-sm border border-white/15
                  flex items-center justify-center overflow-hidden">
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.parentElement.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-6">
                {item.cgpa && (
                  <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full
                    bg-accent/20 border border-accent/30 font-mono text-accent text-xs">
                    CGPA {item.cgpa}
                  </span>
                )}
                <p className="font-mono text-xs text-accent mb-1">{item.level}</p>
                <h3 className="font-display font-semibold text-text mb-1" style={{ fontSize: '1rem' }}>
                  {item.short || item.name}
                </h3>
                <p className="font-mono text-xs text-muted mb-3">
                  {item.board || item.affiliation} · {item.location}
                </p>
                <p className="font-body text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}