import { motion } from 'framer-motion'
import * as Ph from '@phosphor-icons/react'

const iconMap = {
  GraduationCap: Ph.GraduationCap,
  Books: Ph.Books,
  Laptop: Ph.Laptop,
  Code: Ph.Code,
  Trophy: Ph.Trophy,
  ChartBar: Ph.ChartBar,
  Scales: Ph.Scales,
  Buildings: Ph.Buildings,
  RocketLaunch: Ph.RocketLaunch,
}

export default function JourneyMilestone({ year, icon, title, org, desc, index, isActive }) {
  const Icon = iconMap[icon] || Ph.Star
  return (
    <motion.div
      className="flex-shrink-0 w-64 md:w-72"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div
        className={`card-bezel h-full transition-all duration-500
          ${isActive ? 'border-accent/40' : ''}`}
      >
        <div className="card-bezel-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-accent text-sm font-medium">{year}</span>
            <Icon size={20} weight="light" className="text-muted" />
          </div>
          <h4 className="font-display font-semibold text-text mb-1" style={{ fontSize: '1rem' }}>{title}</h4>
          <p className="font-mono text-xs text-muted mb-3">{org}</p>
          <p className="font-body text-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
