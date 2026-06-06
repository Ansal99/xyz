import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const counterRef = useRef()
  const lineRef    = useRef()
  const akRef      = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ onComplete })
    tl.from(akRef.current, { scale:1.08, opacity:0, duration:0.8, ease:'power2.out' })
    tl.from(lineRef.current, { width:0, duration:1.2, ease:'power1.inOut' }, '-=0.4')
    tl.to({ val:0 }, {
      val:100, duration:2, ease:'power2.inOut',
      onUpdate: function() {
        if (counterRef.current)
          counterRef.current.textContent = String(Math.floor(this.targets()[0].val)).padStart(2,'0')
      }
    }, '-=1.2')
    tl.to(akRef.current,   { scale:1.15, opacity:0, duration:0.5 }, '+=0.1')
    tl.to(lineRef.current, { opacity:0, duration:0.4 }, '-=0.4')
    return () => tl.kill()
  }, [])

  return (
    <motion.div
      exit={{ y:'-100%' }}
      transition={{ duration:0.8, ease:[0.76,0,0.24,1] }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
    >
      <div ref={akRef} className="text-center">
        <span className="font-display font-bold text-text block" style={{ fontSize:'8rem', lineHeight:1 }}>A.K</span>
        <div ref={lineRef} className="h-[1.5px] bg-accent mx-auto mt-4" style={{ width:'120px' }} />
      </div>
      <span ref={counterRef} className="font-mono text-muted absolute bottom-8 right-8" style={{ fontSize:'0.875rem' }}>00</span>
    </motion.div>
  )
}