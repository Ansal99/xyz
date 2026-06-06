import { motion } from 'framer-motion'
import * as Ph from '@phosphor-icons/react'
import Card from './Card.jsx'

const iconMap = {
  ChartBar: Ph.ChartBar,
  Code: Ph.Code,
  Brain: Ph.Brain,
}

export default function ServiceCard({ icon, iconColor, title, desc, tags }) {
  const Icon = iconMap[icon] || Ph.Star
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      <Card className="h-full">
        <Icon size={32} weight="light" style={{ color: iconColor }} className="mb-4" />
        <h3 className="font-display font-semibold text-text mb-2" style={{ fontSize: '1.1rem' }}>{title}</h3>
        <p className="font-body text-muted text-sm leading-relaxed mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => <span key={t} className="code-tag">{t}</span>)}
        </div>
      </Card>
    </motion.div>
  )
}
