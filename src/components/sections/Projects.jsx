import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import { ButtonPrimary, ButtonGhost } from '../ui/Button.jsx'
import { projectsData } from '../../data/projects.js'
import { useNavigate } from 'react-router-dom'
import { GithubLogo } from '@phosphor-icons/react'

function ProjectCard({ project, index }) {
  const navigate = useNavigate()

  function handleCaseStudy() {
    sessionStorage.setItem('portfolio_scroll', String(window.scrollY))
    navigate(project.caseStudy)
  }

  return (
    <motion.div
      className="card-bezel"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ y: -8 }}
    >
      <div
        className="card-bezel-inner relative overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: '320px',
          background: `linear-gradient(135deg, ${project.accentColor}12, #0D0D0D)`,
        }}
      >
        {/* Screenshot slot */}
        {project.image && (
          <div
            className="w-full rounded-xl overflow-hidden mb-5"
            style={{
              height: '180px',
              border: `1px solid ${project.accentColor}25`,
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top"
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        )}

        {/* Decorative bg text */}
        <span
          className="absolute top-2 right-4 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: '5rem', opacity: 0.05, color: project.accentColor, lineHeight: 1 }}
        >
          {project.name}
        </span>

        {project.badge && (
          <span
            className="absolute top-4 right-4 font-mono text-xs px-2.5 py-1 rounded-full border"
            style={{
              borderColor: `${project.accentColor}60`,
              color: project.accentColor,
              background: `${project.accentColor}15`,
            }}
          >
            {project.badge}
          </span>
        )}

        <div>
          <span className="font-mono text-xs text-muted mb-2 block">{project.type}</span>
          <h3
            className="font-display font-bold text-text mb-1"
            style={{ fontSize: '1.5rem', color: project.accentColor }}
          >
            {project.name}
          </h3>
          <p className="font-body text-text text-sm mb-3 font-medium">{project.tagline}</p>
          <p className="font-body text-muted text-sm leading-relaxed">{project.desc}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.stack.map(t => <span key={t} className="code-tag">{t}</span>)}
          </div>
          <div className="flex gap-3 flex-wrap">
            {project.caseStudy && (
              <ButtonPrimary onClick={handleCaseStudy}>
                View Case Study →
              </ButtonPrimary>
            )}
            <ButtonGhost href={project.github} target="_blank" rel="noopener">
              <GithubLogo size={16} weight="fill" /> GitHub
            </ButtonGhost>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Projects" title="What I've Built" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}