import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'

/* ── 3D Background Mesh ──────────────────────────────────────── */
function BackgroundMesh() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (mesh1.current) { mesh1.current.rotation.y = t * 0.12; mesh1.current.rotation.x = t * 0.05 }
    if (mesh2.current) { mesh2.current.rotation.y = -t * 0.08; mesh2.current.rotation.z = t * 0.06 }
  })
  return (
    <>
      <mesh ref={mesh1}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#6EE7B7" wireframe transparent opacity={0.05} />
      </mesh>
      <mesh ref={mesh2}>
        <torusGeometry args={[3, 0.012, 8, 80]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.08} />
      </mesh>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#6EE7B7" intensity={0.5} />
    </>
  )
}

/* ── Only 2 float cards — clean, not messy ───────────────────── */
const FLOAT_CARDS = [
  {
    id: 'courtx',
    name: 'CourtX',
    sub: 'Legal AI · 34 States',
    tag: 'XGBoost + SHAP',
    color: '#818CF8',
    side: 'left',
  },
  {
    id: 'ctfarma',
    name: 'CT-FARMA',
    sub: 'Farmer AI · Bilingual',
    tag: 'Mistral AI',
    color: '#6EE7B7',
    side: 'right',
  },
]

/* ── Typewriter — cycles through lines automatically ────────── */
const TYPEWRITER_LINES = [
  'Building ML systems that explain themselves.',
  'XGBoost, SHAP, and full-stack platforms.',
  'From Himachal Pradesh — working on real problems.',
  'Courts, farms, defence. Data solved all three.',
]

function TypewriterText() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = TYPEWRITER_LINES[idx]
    let i = 0
    setDisplayed('')
    setTyping(true)

    const interval = setInterval(() => {
      i++
      setDisplayed(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(interval)
        setTyping(false)
        setTimeout(() => {
          setIdx(prev => (prev + 1) % TYPEWRITER_LINES.length)
        }, 2600)
      }
    }, 36)

    return () => clearInterval(interval)
  }, [idx])

  return (
    <span>
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          marginLeft: '2px',
          verticalAlign: 'middle',
          background: '#6EE7B7',
          animation: typing ? 'none' : 'cursorblink 0.8s step-end infinite',
        }}
      />
    </span>
  )
}

/* ── Intro lines — staggered, cinematic ─────────────────────── */
const INTRO_LINES = [
  { text: 'This is Ansal.',         size: 'clamp(3rem, 5.5vw, 5.5rem)', color: '#F8FAFC',   weight: 700, delay: 0.1 },
  { text: 'Not the guy who',        size: 'clamp(1.4rem, 2.5vw, 2.2rem)', color: '#94A3B8', weight: 400, delay: 0.35 },
  { text: 'talks about data.',      size: 'clamp(1.4rem, 2.5vw, 2.2rem)', color: '#94A3B8', weight: 400, delay: 0.55 },
  { text: 'The one who does',       size: 'clamp(1.6rem, 3vw, 2.8rem)',   color: '#6EE7B7', weight: 600, delay: 0.8 },
  { text: 'something with it.',     size: 'clamp(1.6rem, 3vw, 2.8rem)',   color: '#6EE7B7', weight: 600, delay: 0.95 },
]

export default function Hero() {
  const heroRef = useRef(null)
  const [chevron, setChevron] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCardsVisible(true), 1800)
    const t2 = setTimeout(() => setChevron(true), 3800)
    const onScroll = () => { if (window.scrollY > 80) setChevron(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* 3D canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 55 }}>
          <BackgroundMesh />
        </Canvas>
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 39px,#6EE7B7 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#6EE7B7 40px)',
        }}
      />

      {/* ── FLOAT CARDS — only 2, vertically centered on sides ── */}
      {FLOAT_CARDS.map((card) => (
        <AnimatePresence key={card.id}>
          {cardsVisible && (
            <motion.div
              className="absolute z-20 hidden xl:block"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                ...(card.side === 'left' ? { left: '2%' } : { right: '2%' }),
              }}
              initial={{ opacity: 0, x: card.side === 'left' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0, y: ['-50%', 'calc(-50% - 8px)', '-50%'] }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Single clean border */}
              <div
                style={{
                  padding: '1px',
                  borderRadius: '18px',
                  background: `linear-gradient(160deg, ${card.color}40, transparent 60%)`,
                }}
              >
                <div
                  style={{
                    background: 'rgba(8,8,8,0.88)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '17px',
                    padding: '16px 20px',
                    minWidth: '170px',
                    maxWidth: '200px',
                  }}
                >
                  {/* Dot + tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: card.color }}
                    />
                    <span
                      className="font-mono uppercase tracking-widest"
                      style={{ fontSize: '9px', color: `${card.color}90` }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Name */}
                  <p
                    className="font-display font-bold text-white leading-none mb-1.5"
                    style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
                  >
                    {card.name}
                  </p>

                  {/* Sub */}
                  <p
                    className="font-mono"
                    style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}
                  >
                    {card.sub}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-3 h-px rounded-full"
                    style={{ background: `linear-gradient(90deg, ${card.color}50, transparent)` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">

          {/* LEFT — Intro text */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Eyebrow pill */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="eyebrow-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                Data Scientist &amp; Builder
              </span>
            </motion.div>

            {/* Staggered intro lines */}
            <div className="flex flex-col gap-1 mb-12" style={{ lineHeight: 1.1 }}>
              {INTRO_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className="font-display"
                  style={{
                    fontSize: line.size,
                    color: line.color,
                    fontWeight: line.weight,
                    letterSpacing: '-0.02em',
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: line.delay,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {/* Typewriter */}
            <motion.p
              className="font-mono mb-10"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.4)',
                minHeight: '1.6rem',
                lineHeight: 1.8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.15 }}
            >
              <TypewriterText />
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200"
                style={{
                  background: '#6EE7B7',
                  color: '#050505',
                  boxShadow: '0 8px 32px rgba(110,231,183,0.22)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(110,231,183,0.38)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(110,231,183,0.22)' }}
              >
                View My Work →
              </button>
              <a
                href="/assets/resume/ansal-resume.pdf"
                className="px-8 py-3.5 rounded-full font-body text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.55)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(110,231,183,0.35)'
                  e.currentTarget.style.color = '#6EE7B7'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                }}
              >
                Resume ↓
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Photo */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Rotating glow ring — subtle */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '340px',
                height: '340px',
                background: 'conic-gradient(from 0deg, rgba(110,231,183,0.12), transparent 40%, rgba(129,140,248,0.08), transparent 80%, rgba(110,231,183,0.12))',
                animation: 'spin-slow 12s linear infinite',
              }}
            />

            {/* Photo */}
            <div className="relative z-10">
              {/* Gradient border */}
              <div
                className="absolute -inset-[1px] rounded-[2.5rem]"
                style={{
                  background: 'linear-gradient(135deg, rgba(110,231,183,0.35), transparent 50%, rgba(129,140,248,0.2))',
                  borderRadius: '2.5rem',
                }}
              />

              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(240px, 22vw, 310px)',
                  height: 'clamp(300px, 28vw, 410px)',
                  borderRadius: '2.4rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <img
                  src="/assets/ansal-photo.jpg"
                  alt="Ansal"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.93) contrast(1.06)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Clean status badge */}
                <div
                  className="absolute bottom-4 left-4 right-4"
                  style={{
                    backdropFilter: 'blur(14px)',
                    background: 'rgba(5,5,5,0.7)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: '#6EE7B7',
                        boxShadow: '0 0 5px #6EE7B7',
                        animation: 'pulse-dot 2s ease-in-out infinite',
                      }}
                    />
                    <span
                      className="font-mono tracking-wide"
                      style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}
                    >
                      Open to Work
                    </span>
                  </div>
                  <p
                    className="font-display font-bold text-white leading-tight"
                    style={{ fontSize: '14px' }}
                  >
                    Ansal
                  </p>
                  <p
                    className="font-mono mt-0.5"
                    style={{ fontSize: '10px', color: 'rgba(110,231,183,0.7)' }}
                  >
                    B.Tech CSE · May 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll chevron */}
      <AnimatePresence>
        {chevron && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span
              className="w-px h-12 block"
              style={{
                background: 'linear-gradient(to bottom, rgba(110,231,183,0.6), transparent)',
                animation: 'scrollpulse 2s ease-in-out infinite',
              }}
            />
            <span
              className="font-mono uppercase tracking-[0.28em]"
              style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}
            >
              Scroll
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scrollpulse {
          0%,100%{opacity:0.6;transform:scaleY(1)}
          50%{opacity:0.15;transform:scaleY(0.5)}
        }
        @keyframes cursorblink {
          0%,100%{opacity:1}
          50%{opacity:0}
        }
      `}</style>
    </section>
  )
}