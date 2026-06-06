import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { MapPin, GraduationCap, Target, Briefcase, Envelope } from '@phosphor-icons/react'

const details = [
  { icon: MapPin,         label: 'Kangra, Himachal Pradesh' },
  { icon: GraduationCap,  label: 'B.Tech CSE — ABVGIET Shimla' },
  { icon: Target,         label: 'Focus: Data Science + ML' },
  { icon: Briefcase,      label: 'Open to opportunities' },
  { icon: Envelope,       label: 'ansalkumar10@gmail.com', href: 'mailto:ansalkumar10@gmail.com' },
]

export default function About() {
  return (
    <section id="about" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="About" title="The Story" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start">
        {/* Left — text */}
        <motion.div
          className="md:col-span-3 space-y-6"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <p className="font-body text-muted leading-[1.85]" style={{ fontSize: '1.1rem' }}>
            Data is just noise until someone asks the right question. I'm Ansal — a Computer Science
            engineer who spends most of his time making machine learning models do things that feel
            almost unfair. XGBoost ensembles, SHAP explainability, full-stack platforms — if it involves
            data and building, I'm probably already thinking about it.
          </p>
          <p className="font-body text-muted leading-[1.85]" style={{ fontSize: '1.1rem' }}>
            Outside of a terminal window, I'm either holding the defensive line on a football pitch,
            pushing laps in the pool, or at the gym pretending the next set isn't that heavy. Balance,
            apparently, applies to both gradients and goals.
          </p>
        </motion.div>

        {/* Right — detail cards */}
        <div className="md:col-span-2 space-y-3">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
            >
              {d.href ? (
                <a href={d.href}>
                  <Card>
                    <div className="flex items-center gap-3">
                      <d.icon size={18} weight="light" className="text-accent shrink-0" />
                      <span className="font-body text-sm text-text hover:text-accent transition-colors">{d.label}</span>
                    </div>
                  </Card>
                </a>
              ) : (
                <Card>
                  <div className="flex items-center gap-3">
                    <d.icon size={18} weight="light" className="text-accent shrink-0" />
                    <span className="font-body text-sm text-text">{d.label}</span>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
