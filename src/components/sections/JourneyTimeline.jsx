import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader.jsx'
import JourneyMilestone from '../ui/JourneyMilestone.jsx'
import { journeyMilestones } from '../../data/journeyMilestones.js'

export default function JourneyTimeline() {
  const sectionRef = useRef()
  const trackRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const totalWidth = track.scrollWidth - window.innerWidth + 120

      gsap.to(track, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        x: -totalWidth,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="journey" className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
        <SectionHeader eyebrow="My Path" title="The Journey" />
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="hidden md:block">
        <div ref={trackRef} className="flex gap-6 px-8 md:px-24" style={{ width: 'max-content' }}>
          {journeyMilestones.map((m, i) => (
            <JourneyMilestone key={m.id} {...m} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden px-4 space-y-4">
        {journeyMilestones.map((m, i) => (
          <JourneyMilestone key={m.id} {...m} index={i} />
        ))}
      </div>
    </section>
  )
}
