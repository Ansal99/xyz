import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ICON_BASE = 'https://cdn.simpleicons.org'

const iconSlugs = {
  python: 'python', pandas: 'pandas', numpy: 'numpy',
  scikitlearn: 'scikitlearn', react: 'react', javascript: 'javascript',
  html5: 'html5', css3: 'css3', nodedotjs: 'nodedotjs', flask: 'flask',
  mysql: 'mysql', mongodb: 'mongodb', git: 'git', github: 'github',
  postman: 'postman',
}

function SkillPill({ name, icon, accentColor, index }) {
  const slug = iconSlugs[icon]
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        font-body text-xs text-text border border-white/08
        hover:border-white/20 transition-colors duration-200"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {slug && (
        <img
          src={`${ICON_BASE}/${slug}/ffffff`}
          alt=""
          className="w-3 h-3 opacity-70"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}
      {name}
    </motion.span>
  )
}

/* ── Category icon — simple SVG, no CSS 3D tricks ── */
function CategoryIcon({ type, color }) {
  const s = { stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }
  const icons = {
    neural: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...{ xmlns: 'http://www.w3.org/2000/svg' }}>
        <circle cx="12" cy="12" r="3" {...s} />
        <circle cx="4"  cy="6"  r="2" {...s} />
        <circle cx="20" cy="6"  r="2" {...s} />
        <circle cx="4"  cy="18" r="2" {...s} />
        <circle cx="20" cy="18" r="2" {...s} />
        <line x1="6"  y1="7"  x2="10" y2="11" {...s} opacity="0.5" />
        <line x1="18" y1="7"  x2="14" y2="11" {...s} opacity="0.5" />
        <line x1="6"  y1="17" x2="10" y2="13" {...s} opacity="0.5" />
        <line x1="18" y1="17" x2="14" y2="13" {...s} opacity="0.5" />
      </svg>
    ),
    browser: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" {...s} />
        <line x1="3" y1="10" x2="21" y2="10" {...s} opacity="0.5" />
        <circle cx="7" cy="7.5" r="1" fill={color} opacity="0.6" />
        <circle cx="10.5" cy="7.5" r="1" fill={color} opacity="0.6" />
      </svg>
    ),
    server: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="4" y="4"  width="16" height="5" rx="1" {...s} />
        <rect x="4" y="11" width="16" height="5" rx="1" {...s} />
        <circle cx="19" cy="6.5"  r="1" fill={color} opacity="0.7" />
        <circle cx="19" cy="13.5" r="1" fill={color} opacity="0.7" />
      </svg>
    ),
    cylinder: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <ellipse cx="12" cy="6"  rx="8" ry="3" {...s} />
        <ellipse cx="12" cy="18" rx="8" ry="3" {...s} />
        <line x1="4"  y1="6" x2="4"  y2="18" {...s} opacity="0.4" />
        <line x1="20" y1="6" x2="20" y2="18" {...s} opacity="0.4" />
      </svg>
    ),
    gear: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" {...s} />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" {...s} opacity="0.5" />
      </svg>
    ),
  }
  return icons[type] || null
}

export default function SkillFolder({ category, skills, colSpan, iconType, accentColor }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`card-bezel cursor-pointer select-none ${colSpan === 2 ? 'md:col-span-2' : ''}`}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen(v => !v)}
    >
      <div className="card-bezel-inner">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <CategoryIcon type={iconType} color={accentColor} />
            <h3 className="font-display font-semibold text-text" style={{ fontSize: '1rem' }}>
              {category}
            </h3>
          </div>

          {/* Count + chevron */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}35`,
                background: `${accentColor}10`,
              }}
            >
              {skills.length}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="text-muted"
              style={{ fontSize: '0.7rem', display: 'inline-block' }}
            >
              ▾
            </motion.span>
          </div>
        </div>

        {/* Closed state — preview first 4 skills as faded tags */}
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-1.5"
            >
              {skills.slice(0, colSpan === 2 ? 5 : 3).map((s) => (
                <span
                  key={s.name}
                  className="font-mono text-[10px] px-2 py-0.5 rounded text-muted"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {s.name}
                </span>
              ))}
              {skills.length > (colSpan === 2 ? 5 : 3) && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded text-muted"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  +{skills.length - (colSpan === 2 ? 5 : 3)} more
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              {/* Accent divider */}
              <div
                className="mb-3 h-px rounded-full"
                style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }}
              />
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <SkillPill
                    key={s.name}
                    name={s.name}
                    icon={s.icon}
                    accentColor={accentColor}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}