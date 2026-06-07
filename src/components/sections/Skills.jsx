import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'

/* ── Skills data with proficiency levels ─────────────────────── */
const SKILL_GROUPS = [
  {
    id: 'core-ml',
    label: 'Machine Learning',
    color: '#6EE7B7',
    description: 'Where most of my time goes. Real models, real data.',
    skills: [
      { name: 'Python',              level: 90, note: 'Daily driver' },
      { name: 'XGBoost',             level: 85, note: 'CourtX, SKYSYS' },
      { name: 'Scikit-learn',        level: 82, note: 'Pipelines, eval' },
      { name: 'SHAP',                level: 78, note: 'Explainability' },
      { name: 'Pandas / NumPy',      level: 85, note: 'Data wrangling' },
      { name: 'Feature Engineering', level: 80, note: 'Real datasets' },
      { name: 'Random Forest',       level: 75, note: 'Ensemble methods' },
      { name: 'Matplotlib',          level: 72, note: 'Visualization' },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    color: '#818CF8',
    description: 'End-to-end. From API to UI.',
    skills: [
      { name: 'ReactJS',    level: 78, note: 'CT-FARMA, portfolio' },
      { name: 'Flask',      level: 80, note: 'Backend APIs' },
      { name: 'NodeJS',     level: 65, note: 'REST APIs' },
      { name: 'MySQL',      level: 72, note: 'Novem Controls' },
      { name: 'MongoDB',    level: 65, note: 'NoSQL' },
      { name: 'HTML/CSS',   level: 80, note: 'Semantic, responsive' },
      { name: 'JavaScript', level: 72, note: 'ES6+' },
      { name: 'REST APIs',  level: 75, note: 'Design & consume' },
    ],
  },
  {
    id: 'tools',
    label: 'Dev Tools & AI',
    color: '#F59E0B',
    description: 'What I use to ship and integrate.',
    skills: [
      { name: 'Git / GitHub',  level: 82, note: 'Version control' },
      { name: 'Mistral AI',    level: 70, note: 'CT-FARMA' },
      { name: 'Postman',       level: 75, note: 'API testing' },
      { name: 'PlantNet API',  level: 65, note: 'Vision AI' },
      { name: 'OpenWeather',   level: 68, note: 'Live data' },
      { name: 'VS Code',       level: 88, note: 'Primary IDE' },
    ],
  },
]

/* ── Skill bar component ─────────────────────────────────────── */
function SkillBar({ name, level, note, color, index, visible }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -16 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-body text-white/80 text-sm">{name}</span>
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            {note}
          </span>
        </div>
        <span
          className="font-mono text-xs font-semibold"
          style={{ color }}
        >
          {level}%
        </span>
      </div>
      {/* Track */}
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
          initial={{ width: 0 }}
          animate={visible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
    </motion.div>
  )
}

/* ── Main Skills section ─────────────────────────────────────── */
export default function Skills() {
  const [active, setActive] = useState('core-ml')
  const [visible, setVisible] = useState(true)

  function switchGroup(id) {
    if (id === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(id)
      setVisible(true)
    }, 200)
  }

  const group = SKILL_GROUPS.find(g => g.id === active)

  return (
    <section id="skills" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Technical Arsenal" title="Skills" />

      {/* Tab switcher */}
      <div className="flex gap-2 flex-wrap mb-10">
        {SKILL_GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => switchGroup(g.id)}
            className="relative px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300"
            style={{
              background: active === g.id ? `${g.color}15` : 'rgba(255,255,255,0.03)',
              border: active === g.id ? `1px solid ${g.color}50` : '1px solid rgba(255,255,255,0.08)',
              color: active === g.id ? g.color : 'rgba(255,255,255,0.45)',
            }}
          >
            {g.label}
            {active === g.id && (
              <motion.span
                layoutId="skill-tab-dot"
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ background: g.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="rounded-[2rem] overflow-hidden"
        style={{
          padding: '1.5px',
          background: `linear-gradient(135deg, ${group.color}30, rgba(255,255,255,0.05), ${group.color}15)`,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="rounded-[calc(2rem-1.5px)]"
          style={{ background: '#0D0D0D', padding: '2rem' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3
                className="font-display font-bold mb-1"
                style={{ fontSize: '1.4rem', color: group.color }}
              >
                {group.label}
              </h3>
              <p className="font-body text-white/40 text-sm">{group.description}</p>
            </div>
            <div
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{
                background: `${group.color}12`,
                color: group.color,
                border: `1px solid ${group.color}30`,
              }}
            >
              {group.skills.length} skills
            </div>
          </div>

          {/* Skills list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {group.skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  {...s}
                  color={group.color}
                  index={i}
                  visible={visible}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom note — honest */}
      <motion.p
        className="font-mono text-white/25 text-xs text-center mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Percentages reflect practical experience, not self-rated perfection.
      </motion.p>
    </section>
  )
}