import { motion } from 'framer-motion'
import * as Ph from '@phosphor-icons/react'

const iconMap = {
  MagnifyingGlass: Ph.MagnifyingGlass,
  Books: Ph.Books,
  Lightning: Ph.Lightning,
  ArrowsClockwise: Ph.ArrowsClockwise,
  RocketLaunch: Ph.RocketLaunch,
}

export default function ProcessStep({ step, title, desc, iconName, index }) {
  const Icon = iconMap[iconName] || Ph.Star
  return (
    <motion.div
      className="card-bezel flex-1 min-w-[200px]"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="card-bezel-inner relative overflow-hidden">
        {/* Decorative step number */}
        <span
          className="absolute top-2 right-3 font-display font-bold text-white/[0.04] select-none"
          style={{ fontSize: '5rem', lineHeight: 1 }}
        >
          {String(step).padStart(2, '0')}
        </span>
        <Icon size={28} weight="light" className="text-accent mb-4" />
        <h4 className="font-display font-semibold text-text mb-2" style={{ fontSize: '1.05rem' }}>{title}</h4>
        <p className="font-body text-muted text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}
