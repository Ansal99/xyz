import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { lenis } from '../../main.jsx'
import { useKeyboardNav } from '../../hooks/useKeyboardNav.js'
import { siteConfig } from '../../data/siteConfig.js'

const navItems = [
  { label: 'Work',    href: '#projects' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'About',   href: '#about' },
  { label: 'Process', href: '#creative-process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useKeyboardNav(navigate)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(e, href) {
    e.preventDefault()
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el && lenis) lenis.scrollTo(el, { offset: -80 })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-max"
      >
        <div
          className={`flex items-center gap-1 px-2 py-2 rounded-full
            bg-[rgba(13,13,13,0.85)] backdrop-blur-xl
            border transition-all duration-300
            ${scrolled ? 'border-white/15 shadow-lg shadow-black/40' : 'border-white/08'}`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => handleNav(e, '#hero')}
            className="px-4 py-1.5 font-display font-bold text-sm text-accent mr-2"
          >
            A.K
          </a>

          {/* Open to Work badge */}
          {siteConfig.openToWork && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full mr-1
                border border-emerald-400/30 bg-emerald-400/08"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[0.65rem] text-emerald-400 tracking-wide">
                {siteConfig.openToWorkText}
              </span>
            </motion.div>
          )}

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={e => handleNav(e, item.href)}
                className="px-3.5 py-1.5 rounded-full font-body text-sm text-muted
                  hover:text-text hover:bg-white/05 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 ml-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block h-[1.5px] w-5 bg-text transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <span className={`block h-[1.5px] w-5 bg-text transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center gap-4"
            onClick={() => setMenuOpen(false)}
          >
            {siteConfig.openToWork && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-400/08 mb-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs text-emerald-400">{siteConfig.openToWorkText}</span>
              </motion.div>
            )}

            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={e => handleNav(e, item.href)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                className="font-display text-2xl text-text hover:text-accent transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 font-mono text-[10px] text-muted tracking-widest"
            >
              Press / for Contact
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}