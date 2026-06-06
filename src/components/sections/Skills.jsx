import SectionHeader from '../ui/SectionHeader.jsx'
import SkillFolder from '../ui/SkillFolder.jsx'
import { skillsData } from '../../data/skills.js'

export default function Skills() {
  return (
    <section id="skills" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Technical Arsenal" title="Skills Universe" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoFlow: 'dense' }}>
        {skillsData.map(s => (
          <SkillFolder
            key={s.id}
            category={s.category}
            skills={s.skills}
            colSpan={s.colSpan}
            iconType={s.iconType}
            accentColor={s.accentColor}
          />
        ))}
      </div>
    </section>
  )
}
