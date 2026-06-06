import { motion } from 'framer-motion'
import Card from './Card.jsx'

export default function TimelineItem({ role, company, duration, location, tags, points, index }) {
  return (
    <motion.div
      className="relative pl-8 md:pl-12"
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Dot */}
      <span className="absolute left-[-5px] top-8 w-3 h-3 rounded-full bg-accent animate-pulse-dot" />

      <Card>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-display font-semibold text-text" style={{ fontSize: '1.25rem' }}>{role}</h3>
            <p className="font-body text-accent text-sm mt-0.5">{company}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="font-mono text-muted text-xs">{duration}</span>
            <span className="font-mono text-muted text-xs">· {location}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t} className="code-tag">{t}</span>
            ))}
          </div>
          <ul className="list-none space-y-2 mt-1">
            {points.map((p, i) => (
              <li key={i} className="font-body text-muted text-sm leading-relaxed flex gap-2">
                <span className="text-accent mt-1 shrink-0">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}
