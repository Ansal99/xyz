import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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
        <meshBasicMaterial color="#6EE7B7" wireframe transparent opacity={0.06} />
      </mesh>
      <mesh ref={mesh2}>
        <torusGeometry args={[3, 0.012, 8, 80]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.1} />
      </mesh>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#6EE7B7" intensity={0.5} />
    </>
  )
}

/* ── Scene backgrounds (scroll-driven) ──────────────────────── */
const SCENES = [
  {
    id: 'code',
    label: 'Deep Work',
    emoji: '💻',
    bg: 'radial-gradient(ellipse at 20% 50%, rgba(110,231,183,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(129,140,248,0.07) 0%, transparent 55%), #050505',
    accent: '#6EE7B7',
    description: 'Writing ML models at 2am',
  },
  {
    id: 'gym',
    label: 'Gym',
    emoji: '🏋️',
    bg: 'radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(239,68,68,0.06) 0%, transparent 55%), #050505',
    accent: '#F59E0B',
    description: 'Pretending the next set isn\'t heavy',
  },
  {
    id: 'football',
    label: 'Football',
    emoji: '⚽',
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.1) 0%, transparent 55%), radial-gradient(ellipse at 30% 30%, rgba(110,231,183,0.06) 0%, transparent 55%), #050505',
    accent: '#22C55E',
    description: 'Holding the defensive line',
  },
  {
    id: 'swim',
    label: 'Swimming',
    emoji: '🏊',
    bg: 'radial-gradient(ellipse at 40% 50%, rgba(59,130,246,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(129,140,248,0.08) 0%, transparent 55%), #050505',
    accent: '#3B82F6',
    description: 'Cutting laps in the pool',
  },
]

/* ── Floating stat cards ─────────────────────────────────────── */
const FLOAT_CARDS = [
  { label: 'CourtX',   sub: '34 States · 9 Cases', color: '#818CF8', delay: 0,   pos: { top: '18%', left: '2%' } },
  { label: 'SIH',      sub: 'National · Team Cobra', color: '#6EE7B7', delay: 1.5, pos: { top: '16%', right: '2%' } },
  { label: 'XGBoost',  sub: '+ SHAP Explainability', color: '#F59E0B', delay: 0.8, pos: { bottom: '26%', left: '3%' } },
  { label: 'CT-FARMA', sub: 'Mistral AI · Bilingual', color: '#EC4899', delay: 2,   pos: { bottom: '24%', right: '2%' } },
]

/* ── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const heroRef      = useRef(null)
  const [scene, setScene]   = useState(0)
  const [chevron, setChevron] = useState(false)
  const { scrollY } = useScroll()
  const contentY  = useTransform(scrollY, [0, 500], [0, -50])
  const contentOp = useTransform(scrollY, [0, 400], [1, 0])

  /* Show chevron after 3s, hide on scroll */
  useEffect(() => {
    const t = setTimeout(() => setChevron(true), 3000)
    const onScroll = () => { if (window.scrollY > 80) setChevron(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  /* Cycle scenes on scroll inside hero */
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      const heroH = heroRef.current?.offsetHeight || window.innerHeight
      const pct = v / heroH
      if      (pct < 0.25) setScene(0)
      else if (pct < 0.5)  setScene(1)
      else if (pct < 0.75) setScene(2)
      else                 setScene(3)
    })
    return unsubscribe
  }, [scrollY])

  const currentScene = SCENES[scene]

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: currentScene.bg, transition: 'background 1.2s ease' }}
    >
      {/* 3D canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas dpr={[1,2]} camera={{ position:[0,0,7], fov:55 }}>
          <BackgroundMesh />
        </Canvas>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 39px,#6EE7B7 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#6EE7B7 40px)'}} />

      {/* Scene label — top right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          initial={{ opacity:0, x:20 }}
          animate={{ opacity:1, x:0 }}
          exit={{ opacity:0, x:-20 }}
          transition={{ duration:0.5 }}
          className="absolute top-24 right-6 z-20 hidden md:flex items-center gap-2
            px-4 py-2 rounded-full border font-mono text-xs"
          style={{ borderColor:`${currentScene.accent}40`, background:`${currentScene.accent}0D`, color:currentScene.accent }}
        >
          <span>{currentScene.emoji}</span>
          <span>{currentScene.description}</span>
        </motion.div>
      </AnimatePresence>

      {/* Floating cards — desktop only */}
      {FLOAT_CARDS.map((card) => (
        <motion.div
          key={card.label}
          className="absolute z-10 hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl
            backdrop-blur-xl border"
          style={{
            ...card.pos,
            background:'rgba(13,13,13,0.8)',
            borderColor:`${card.color}25`,
          }}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:[0,-8,0] }}
          transition={{
            opacity:{ duration:0.6, delay:card.delay+1.5 },
            y:{ duration:4, repeat:Infinity, ease:'easeInOut', delay:card.delay },
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background:card.color }} />
          <div>
            <p className="font-display font-semibold text-text text-xs leading-tight">{card.label}</p>
            <p className="font-mono text-[10px]" style={{ color:card.color+'99' }}>{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y:contentY, opacity:contentOp }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.3 }}
              className="mb-7"
            >
              <span className="eyebrow-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                Data Scientist &amp; Builder
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-display font-bold text-text leading-[1.04] mb-6"
              style={{ fontSize:'clamp(2.8rem,5.5vw,5.5rem)', letterSpacing:'-0.03em' }}
              initial={{ opacity:0, y:40 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, delay:0.45, ease:[0.32,0.72,0,1] }}
            >
              I turn raw data
              <br />
              <span
                style={{
                  background:'linear-gradient(135deg,#6EE7B7,#818CF8,#F59E0B,#6EE7B7)',
                  backgroundSize:'300% auto',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                  animation:'shimmer 6s linear infinite',
                }}
              >
                into decisions.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-body text-muted leading-[1.85] mb-10 max-w-lg"
              style={{ fontSize:'1.05rem' }}
              initial={{ opacity:0, y:25 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.65 }}
            >
              Full stack thinker. ML-first problem solver. Occasionally found
              defending goals, cutting laps, or lifting heavy things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.85 }}
            >
              <motion.button
                whileHover={{ y:-3 }}
                whileTap={{ scale:0.97 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior:'smooth' })}
                className="px-8 py-3.5 rounded-full font-body font-semibold text-sm text-bg
                  bg-accent hover:bg-accent/90 transition-colors duration-200
                  shadow-[0_8px_32px_rgba(110,231,183,0.3)]"
              >
                View My Work →
              </motion.button>
              <motion.a
                href="/assets/resume/ansal-resume.pdf"
                whileHover={{ y:-3 }}
                whileTap={{ scale:0.97 }}
                className="px-8 py-3.5 rounded-full font-body text-sm text-muted
                  border border-white/10 hover:border-accent/40 hover:text-accent
                  transition-all duration-200 backdrop-blur-sm"
              >
                Resume ↓
              </motion.a>
            </motion.div>

            {/* Scene indicator dots */}
            <motion.div
              className="flex items-center gap-3 mt-10"
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.5 }}
            >
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setScene(i)}
                  className="flex items-center gap-1.5 transition-all duration-300"
                  title={s.label}
                >
                  <div
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: scene === i ? '24px' : '6px',
                      height: '6px',
                      background: scene === i ? currentScene.accent : 'rgba(255,255,255,0.15)',
                    }}
                  />
                  {scene === i && (
                    <span className="font-mono text-[10px] text-muted">{s.label}</span>
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Photo */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2 relative"
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, delay:0.5, ease:[0.32,0.72,0,1] }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                width:'340px', height:'340px',
                background:`conic-gradient(from 0deg, ${currentScene.accent}40, transparent 40%, ${currentScene.accent}20, transparent 80%, ${currentScene.accent}40)`,
                animation:'spin-slow 8s linear infinite',
                transition:'background 1.2s ease',
              }}
            />

            {/* Photo container */}
            <motion.div
              className="relative z-10"
              style={{ animation:'photoGlow 3s ease-in-out infinite' }}
            >
              {/* Accent ring */}
              <div
                className="absolute -inset-1 rounded-[2.5rem] opacity-60"
                style={{
                  background:`linear-gradient(135deg, ${currentScene.accent}50, transparent 50%, ${currentScene.accent}30)`,
                  transition:'background 1.2s ease',
                }}
              />

              {/* The actual photo */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[420px] rounded-[2rem] overflow-hidden border border-white/10">
                <img
                  src="/assets/ansal-photo.jpg"
                  alt="Ansal Kumar"
                  className="w-full h-full object-cover object-top"
                  style={{ filter:'brightness(0.95) contrast(1.05)' }}
                />
                {/* Subtle gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Name badge overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="backdrop-blur-md bg-black/50 rounded-xl px-4 py-2.5 border border-white/10">
                    <p className="font-display font-bold text-text text-sm">Ansal Kumar</p>
                    <p className="font-mono text-[10px]" style={{ color:currentScene.accent }}>
                      {currentScene.emoji} {currentScene.label} Mode
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: currentScene.accent,
                    top: `${15 + i * 13}%`,
                    right: i % 2 === 0 ? '-20px' : 'auto',
                    left: i % 2 !== 0 ? '-20px' : 'auto',
                    opacity:0.4 + (i * 0.08),
                  }}
                  animate={{ y:[0, -6, 0], opacity:[0.3, 0.7, 0.3] }}
                  transition={{ duration:2+i*0.5, repeat:Infinity, delay:i*0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll chevron */}
      <AnimatePresence>
        {chevron && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="w-px h-12 block"
              style={{ background:`linear-gradient(to bottom, ${currentScene.accent}80, transparent)`, animation:'scrollp 2s ease-in-out infinite' }} />
            <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted">Scroll</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scrollp {
          0%,100%{opacity:0.6;transform:scaleY(1)}
          50%{opacity:0.2;transform:scaleY(0.5)}
        }
        @keyframes photoGlow {
          0%,100%{box-shadow:0 0 40px rgba(110,231,183,0.15),0 0 80px rgba(110,231,183,0.05)}
          50%{box-shadow:0 0 60px rgba(110,231,183,0.25),0 0 120px rgba(110,231,183,0.1)}
        }
      `}</style>
    </section>
  )
}