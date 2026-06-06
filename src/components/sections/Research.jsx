import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { researchItems, researchProcess } from '../../data/research.js'

export default function Research() {
  return (
    <section id="research" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Research" title="Research & Thinking" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {researchItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="card-bezel"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
          >
            <div
              className="card-bezel-inner"
              style={{ background: `linear-gradient(135deg, ${item.accentColor}10, #0D0D0D)` }}
            >
              <span
                className="inline-block mb-3 px-2.5 py-1 rounded-full font-mono text-xs border"
                style={{ color: item.accentColor, borderColor: `${item.accentColor}40`, background: `${item.accentColor}10` }}
              >
                {item.type}
              </span>
              <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.1rem' }}>
                {item.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed mb-4">{item.content}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(t => <span key={t} className="code-tag">{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Methodology */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Card>
          <h3 className="font-display font-semibold text-text mb-4">How I Approach Research</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {researchProcess.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-accent text-xs shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-muted text-sm leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
