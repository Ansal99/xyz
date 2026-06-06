import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import { ButtonPrimary, ButtonGhost } from '../ui/Button.jsx'
import { LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-[700px] h-[400px] rounded-full bg-accent/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <SectionHeader eyebrow="Get In Touch" className="items-center" />

        <motion.h2
          className="font-display font-bold text-text mb-5"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Build Something
        </motion.h2>

        <motion.p
          className="font-body text-muted mb-10 max-w-lg mx-auto"
          style={{ fontSize: '1.1rem' }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Open to opportunities, collaborations, and conversations about data, ML,
          and building things that matter.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ButtonPrimary href="mailto:ansalkumar10@gmail.com">
            Send a Message →
          </ButtonPrimary>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { href: 'https://linkedin.com/in/ansal-3701102b9', Icon: LinkedinLogo, label: 'LinkedIn' },
            { href: 'https://github.com/Ansal99',             Icon: GithubLogo,   label: 'GitHub' },
            { href: 'mailto:ansalkumar10@gmail.com',           Icon: Envelope,     label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 font-body text-sm text-muted
                hover:text-accent transition-colors duration-200"
            >
              <Icon size={20} weight="fill" />
              <span>{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
