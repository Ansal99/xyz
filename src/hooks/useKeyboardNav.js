import { useEffect } from 'react'

/**
 * Global keyboard shortcuts:
 *   G  → navigate to /gallery
 *   /  → scroll to #contact
 *   Esc → handled by individual overlays (lightbox, mobile menu)
 */
export function useKeyboardNav(navigate) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore if user is typing in an input/textarea
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return

      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault()
        navigate('/gallery')
      }

      if (e.key === '/') {
        e.preventDefault()
        const el = document.querySelector('#contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])
}