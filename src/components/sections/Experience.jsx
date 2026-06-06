import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SectionHeader from '../ui/SectionHeader.jsx'
import TimelineItem from '../ui/TimelineItem.jsx'
import { experienceData } from '../../data/experience.js'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const line = sectionRef.current.querySelector('.timeline-line')

      if (!line) return

      gsap.fromTo(
        line,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8"
    >
      <SectionHeader
        eyebrow="Experience"
        title="Where I've Built"
      />

      <div className="relative">
        <div
          className="
            hidden
            md:block
            absolute
            left-0
            top-0
            bottom-0
            w-[2px]
            bg-white/20
            timeline-line
          "
        />

        <div className="space-y-10">
          {experienceData.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              {...exp}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}