import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { certifications } from '../../data/certifications.js'
import { Certificate } from '@phosphor-icons/react'

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Certifications" title="Credentials" />

      {certifications.length === 0 ? (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto text-center"
        >
          <Card>
            <Certificate size={36} weight="light" className="text-muted mx-auto mb-4" />
            <p className="font-body text-text mb-1">Certifications coming soon.</p>
            <p className="font-body text-muted text-sm">
              Currently pursuing certifications in ML and cloud. Check back.
            </p>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <h4 className="font-display font-semibold text-text text-sm mb-1">{cert.name}</h4>
                <p className="font-mono text-muted text-xs">{cert.issuer} · {cert.date}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener"
                    className="font-body text-xs text-accent hover:underline mt-2 inline-block">
                    Verify →
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
