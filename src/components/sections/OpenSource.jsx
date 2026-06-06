import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { ButtonGhost } from '../ui/Button.jsx'
import { githubData } from '../../data/githubData.js'
import { GithubLogo } from '@phosphor-icons/react'

export default function OpenSource() {
  return (
    <section id="open-source" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Open Source" title="On GitHub" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Stats card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card>
            <h3 className="font-display font-semibold text-text mb-4">Language Breakdown</h3>
            <div className="space-y-3">
              {githubData.topLanguages.map(l => (
                <div key={l.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-body text-sm text-text">{l.name}</span>
                    <span className="font-mono text-xs text-muted">{l.percent}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/05 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${l.percent}%`, background: l.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Repos */}
        <div className="space-y-4">
          {githubData.featuredRepos.map((r, i) => (
            <motion.a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="block"
            >
              <Card className="hover:border-accent/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-text text-sm">{r.name}</h4>
                    <p className="font-body text-muted text-xs mt-1">{r.desc}</p>
                  </div>
                  <span className="code-tag shrink-0 ml-4">{r.lang}</span>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* CTA card */}
      <Card className="text-center">
        <p className="font-body text-muted mb-4 max-w-lg mx-auto">
          All my work is public. Every commit, every iteration, every failed attempt that
          eventually worked — it's all there on GitHub.
        </p>
        <ButtonGhost href={githubData.profileUrl} target="_blank" rel="noopener">
          <GithubLogo size={16} weight="fill" /> View GitHub Profile
        </ButtonGhost>
      </Card>
    </section>
  )
}
