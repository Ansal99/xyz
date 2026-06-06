import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader.jsx'

const paragraphs = [
  "I grew up in the hills of Himachal Pradesh with a football, a textbook, and eventually — a laptop.",
  "Most people who know me know two things: I defend hard on the pitch, and I don't let go of a problem until I understand it completely. Both came from the same place — a stubbornness that turned useful somewhere around college.",
  "The moment I ran my first real model on real data and it actually worked — something clicked. Not just 'this is interesting' clicked. More like 'this is what I want to spend my time on' clicked. That was the start.",
  "Right now I'm finishing my degree, building things that matter, and staying curious. The next chapter is still being written — but it's going to involve a lot of data, a few good problems, and hopefully some meaningful work.",
]

export default function PersonalStory() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-word').forEach((word) => {
        gsap.fromTo(word,
          { opacity: 0.1 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: word,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="personal-story" className="py-32 md:py-48 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
        <SectionHeader eyebrow="Personal" title="Beyond the Resume" />

        {/* Decorative quote mark */}
        <div
          className="absolute top-32 -left-8 font-display text-text/[0.03] select-none pointer-events-none leading-none"
          style={{ fontSize: '20rem' }}
          aria-hidden
        >
          "
        </div>

        <div className="space-y-8">
          {paragraphs.map((para, pi) => (
            <p
              key={pi}
              className="font-body leading-[1.9]"
              style={{ fontSize: pi === 0 ? '1.35rem' : '1.1rem', fontWeight: pi === 0 ? 600 : 400 }}
            >
              {para.split(' ').map((word, wi) => (
                <span key={wi} className="story-word" style={{ color: '#F8FAFC' }}>
                  {word}{' '}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
