import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Thin emerald line at very top of page.
 * On load: animates 0→100% as page loads, then stays as accent.
 * After load: driven by scroll progress.
 */
export default function PageProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    // Phase 1 — fake page load progress (0 → 85% over 1.2s)
    gsap.fromTo(bar,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 0.85, duration: 1.2, ease: 'power2.out' }
    )

    // Phase 2 — complete to 100% on window load
    function onLoad() {
      gsap.to(bar, {
        scaleX: 1, duration: 0.4, ease: 'power1.out',
        onComplete: () => {
          // Phase 3 — hand off to scroll progress
          gsap.set(bar, { scaleX: 0 })
          ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
              gsap.set(bar, { scaleX: self.progress, transformOrigin: 'left center' })
            },
          })
        },
      })
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{ background: 'linear-gradient(90deg, #6EE7B7, #818CF8)', scaleX: 0 }}
      aria-hidden
    />
  )
}