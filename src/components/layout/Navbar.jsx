import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { lenis } from '../../main.jsx'

const navItems = [
  { label: 'Work',     href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Journey',  href: '#journey' },
  { label: 'About',    href: '#about' },
  { label: 'Process',  href: '#creative-process' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
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

          {/* Desktop items */}
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

          {/* Gallery link */}
          <Link
            to="/gallery"
            className="hidden md:flex ml-1 px-4 py-1.5 rounded-full font-body text-sm
              text-accent border border-accent/30 hover:bg-accent/10 transition-all duration-200"
          >
            Gallery
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 ml-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-[1.5px] w-5 bg-text transition-transform duration-300
                  ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-text transition-transform duration-300
                  ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center gap-4"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={e => handleNav(e, item.href)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-2xl text-text hover:text-accent transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.08 }}
            >
              <Link to="/gallery" onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-accent">
                Gallery
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
