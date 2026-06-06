import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getSimpleIconUrl(slug) {
  const known = ['python','pandas','numpy','scikitlearn','react','javascript','html5','css3','nodedotjs','flask','mysql','mongodb','git','github','postman','xgboost']
  if (known.includes(slug)) return `https://cdn.simpleicons.org/${slug}/ffffff`
  return null
}

export default function SkillFolder({ category, skills, colSpan, iconType, accentColor }) {
  const [open, setOpen] = useState(false)

  const Icon3D = {
    neural:   <NeuralIcon color={accentColor} />,
    browser:  <BrowserIcon color={accentColor} />,
    server:   <ServerIcon color={accentColor} />,
    cylinder: <CylinderIcon color={accentColor} />,
    gear:     <GearIcon color={accentColor} />,
  }[iconType] || null

  return (
    <motion.div
      className={`card-bezel ${colSpan === 2 ? 'md:col-span-2' : ''}`}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen(v => !v)}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{ '--accent-local': accentColor }}
    >
      <div className="card-bezel-inner cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div>{Icon3D}</div>
          <span className="font-mono text-xs px-2 py-1 rounded-full border border-white/10 text-muted">
            {skills.length} skills
          </span>
        </div>
        <h3 className="font-display font-semibold text-text mb-1" style={{ fontSize: '1.1rem' }}>
          {category}
        </h3>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((s, i) => (
                  <motion.span
                    key={s.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 font-body text-xs text-text"
                  >
                    {getSimpleIconUrl(s.icon) && (
                      <img src={getSimpleIconUrl(s.icon)} alt={s.name} className="w-3.5 h-3.5" />
                    )}
                    {s.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function NeuralIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin-slow 8s linear infinite' }}>
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1" opacity="0.25" />
      {[0,60,120,180,240,300].map((a,i) => {
        const x = 20 + 18 * Math.cos(a * Math.PI/180)
        const y = 20 + 18 * Math.sin(a * Math.PI/180)
        return <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity="0.7" />
      })}
    </svg>
  )
}
function BrowserIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="24" rx="3" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="4" y1="15" x2="36" y2="15" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="10" cy="11.5" r="1.5" fill={color} opacity="0.5" />
      <circle cx="16" cy="11.5" r="1.5" fill={color} opacity="0.5" />
    </svg>
  )
}
function ServerIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {[8,16,24].map(y => (
        <rect key={y} x="8" y={y} width="24" height="6" rx="1.5" stroke={color} strokeWidth="1.2" opacity="0.5" />
      ))}
      <circle cx="28" cy="11" r="1.5" fill={color} opacity="0.7" />
      <circle cx="28" cy="19" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}
function CylinderIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="10" rx="12" ry="4" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <line x1="8" y1="10" x2="8" y2="30" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="32" y1="10" x2="32" y2="30" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="20" cy="30" rx="12" ry="4" stroke={color} strokeWidth="1.2" opacity="0.6" />
    </svg>
  )
}
function GearIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin-slow 8s linear infinite' }}>
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
    </svg>
  )
}
