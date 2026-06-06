import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroCanvas from '../three/HeroCanvas.jsx'
import { ButtonPrimary, ButtonGhost } from '../ui/Button.jsx'
import { ArrowDown } from '@phosphor-icons/react'

export default function Hero() {
  const [showChevron, setShowChevron] = useState(false)
  const [chevronVisible, setChevronVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowChevron(true), 4000)
    const onScroll = () => {
      if (window.scrollY > 80) setChevronVisible(false)
    }
    window.addEventListener('scroll', onScroll)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [])

  function scrollToProjects(e) {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="hero-bg relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <HeroCanvas />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="eyebrow-pill mb-6 inline-flex">Data Scientist & Builder</span>
        </motion.div>

        <motion.h1
          className="font-display font-bold text-text leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
        >
          I turn raw data into
          <br />
          <span className="text-accent">decisions that matter.</span>
        </motion.h1>

        <motion.p
          className="font-body text-muted leading-relaxed max-w-xl mx-auto mb-10"
          style={{ fontSize: '1.125rem' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          Full stack thinker. ML-first problem solver. Occasionally found defending goals,
          cutting laps, or lifting heavy things.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <ButtonPrimary onClick={scrollToProjects}>
            View My Work <span aria-hidden>→</span>
          </ButtonPrimary>
          <ButtonGhost href="/assets/resume/ansal-resume.pdf" download>
            Download Resume <span aria-hidden>↓</span>
          </ButtonGhost>
        </motion.div>
      </div>

      {/* Scroll Chevron */}
      {showChevron && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: chevronVisible ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-y"
        >
          <ArrowDown size={20} className="text-muted" weight="light" />
        </motion.div>
      )}
    </section>
  )
}
