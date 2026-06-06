import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import { achievementsData } from '../../data/achievements.js'
import { Trophy, Medal } from '@phosphor-icons/react'

const iconMap = { Trophy, Medal }

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Achievements" title="Milestones" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsData.map((a, i) => {
          const Icon = iconMap[a.icon] || Trophy
          return (
            <motion.div
              key={a.id}
              className="card-bezel min-h-[220px]"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="card-bezel-inner relative overflow-hidden">
                {/* Decorative */}
                <span
                  className="absolute top-0 right-4 font-display font-bold select-none pointer-events-none leading-none"
                  style={{ fontSize: '7rem', color: a.decorativeColor }}
                >
                  {a.decorative}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={32} weight="light" style={{ color: a.iconColor }} />
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-full border"
                      style={{ color: a.badgeColor, borderColor: `${a.badgeColor}40`, background: `${a.badgeColor}15` }}
                    >
                      {a.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.1rem' }}>
                    {a.title}
                  </h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
