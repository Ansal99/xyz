import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── 3D Floating Geometry (light theme) ───────────────────────────────────────
function LightMesh() {
  const meshRef = useRef()
  const mesh2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18
      meshRef.current.rotation.x = t * 0.07
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.y = -t * 0.12
      mesh2Ref.current.rotation.z = t * 0.09
      mesh2Ref.current.position.y = Math.sin(t * 0.4 + 1) * 0.1
    }
  })

  return (
    <>
      {/* Main icosahedron — subtle, glass-like */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshPhongMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={mesh2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 60]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.18} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.06} />
      </mesh>

      <ambientLight intensity={1.2} color="#f8f5ff" />
      <pointLight position={[4, 4, 4]} color="#a855f7" intensity={1.5} />
      <pointLight position={[-4, -2, 2]} color="#3b82f6" intensity={0.8} />
    </>
  )
}

// ─── Floating Stat Cards ───────────────────────────────────────────────────────
const floatCards = [
  {
    id: 1,
    emoji: '⚖️',
    title: 'CourtX',
    sub: '34 States · 9 Case Types',
    color: 'from-violet-100 to-purple-50',
    iconBg: 'bg-violet-100',
    pos: 'top-[22%] left-[3%]',
    delay: 0,
  },
  {
    id: 2,
    emoji: '🌾',
    title: 'CT-FARMA',
    sub: 'Mistral AI · Bilingual',
    color: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100',
    pos: 'top-[18%] right-[3%]',
    delay: 1.2,
  },
  {
    id: 3,
    emoji: '🏆',
    title: 'SIH National',
    sub: 'Team Cobra Tech',
    color: 'from-amber-50 to-yellow-50',
    iconBg: 'bg-amber-100',
    pos: 'bottom-[24%] left-[4%]',
    delay: 0.6,
  },
  {
    id: 4,
    emoji: '🧠',
    title: 'XGBoost + SHAP',
    sub: 'Explainable ML',
    color: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100',
    pos: 'bottom-[22%] right-[3%]',
    delay: 1.8,
  },
]

// ─── Main Hero Component ───────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const [chevronVisible, setChevronVisible] = useState(false)

  // Scroll-driven transforms
  const blobScale   = useTransform(scrollY, [0, 600], [1, 1.18])
  const blobOpacity = useTransform(scrollY, [0, 500], [1, 0.3])
  const contentY    = useTransform(scrollY, [0, 600], [0, -60])
  const contentOp   = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setChevronVisible(true), 3200)
    const onScroll = () => { if (window.scrollY > 80) setChevronVisible(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  function scrollToProjects(e) {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* ── FLUID GRADIENT BLOBS ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ scale: blobScale, opacity: blobOpacity }}
      >
        {/* Blob 1 — purple top-left */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full -top-40 -left-40"
          style={{
            background: 'radial-gradient(circle, rgba(192,132,252,0.45) 0%, rgba(167,139,250,0.25) 40%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'blobMove1 9s ease-in-out infinite alternate',
          }}
        />
        {/* Blob 2 — blue top-right */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full -top-20 -right-32"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'blobMove2 11s ease-in-out infinite alternate',
          }}
        />
        {/* Blob 3 — pink bottom-center */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full bottom-[-80px] left-[25%]"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.38) 0%, rgba(236,72,153,0.18) 40%, transparent 70%)',
            filter: 'blur(85px)',
            animation: 'blobMove3 10s ease-in-out infinite alternate',
          }}
        />
        {/* Blob 4 — violet center */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full top-[35%] left-[38%]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blobMove4 8s ease-in-out infinite alternate',
          }}
        />
        {/* Blob 5 — teal bottom-right */}
        <div
          className="absolute w-[380px] h-[380px] rounded-full bottom-[-40px] right-[-60px]"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)',
            filter: 'blur(75px)',
            animation: 'blobMove5 12s ease-in-out infinite alternate',
          }}
        />
      </motion.div>

      {/* ── SUBTLE MESH GRID OVERLAY ─────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(139,92,246,0.04) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(139,92,246,0.04) 40px)
          `,
        }}
      />

      {/* ── FROSTED OVERLAY (readable text) ─────────────────────── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.38)' }}
      />

      {/* ── THREE.JS CANVAS (3D mesh) ────────────────────────────── */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 55 }}
          style={{ width: '100%', height: '100%' }}
        >
          <LightMesh />
        </Canvas>
      </div>

      {/* ── FLOATING CARDS ───────────────────────────────────────── */}
      {floatCards.map((card) => (
        <motion.div
          key={card.id}
          className={`absolute z-[8] hidden lg:flex items-center gap-3
            px-4 py-3 rounded-2xl
            bg-white/70 backdrop-blur-xl
            border border-white/80
            shadow-[0_8px_32px_rgba(0,0,0,0.07)]
            ${card.pos}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: card.delay + 1.5 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: card.delay,
            },
          }}
        >
          <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center text-lg shrink-0`}>
            {card.emoji}
          </div>
          <div>
            <p className="font-semibold text-[13px] text-gray-800 leading-tight">{card.title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center mb-7"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full
              bg-white/75 backdrop-blur-lg
              border border-purple-100
              text-[10px] font-semibold tracking-[0.22em] uppercase text-violet-600
              shadow-[0_2px_16px_rgba(124,58,237,0.12)]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-violet-500"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
            Data Scientist &amp; Builder
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-display font-bold leading-[1.04] mb-6"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: '#0f0a1a', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          I turn raw data into
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #ec4899 60%, #3b82f6 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite',
            }}
          >
            decisions that matter.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body leading-[1.85] max-w-lg mx-auto mb-11"
          style={{ fontSize: '1.1rem', color: '#64748b' }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.32, 0.72, 0, 1] }}
        >
          Full stack thinker. ML-first problem solver. Occasionally found
          defending goals, cutting laps, or lifting heavy things.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {/* Primary button */}
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="px-8 py-4 rounded-full font-body font-semibold text-sm text-white
              shadow-[0_8px_32px_rgba(124,58,237,0.38)]
              hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)]
              transition-shadow duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #9333ea 100%)',
            }}
          >
            View My Work →
          </motion.button>

          {/* Ghost button */}
          <motion.a
            href="/assets/resume/ansal-resume.pdf"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="px-8 py-3.5 rounded-full font-body text-sm
              bg-white/80 backdrop-blur-md
              border border-gray-200 hover:border-violet-300
              text-gray-700 hover:text-violet-700
              shadow-[0_2px_12px_rgba(0,0,0,0.06)]
              transition-all duration-250"
          >
            Resume ↓
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── SCROLL CHEVRON ───────────────────────────────────────── */}
      <AnimatePresence>
        {chevronVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span
              className="w-px h-12 block"
              style={{
                background: 'linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)',
                animation: 'scrollPulse 2s ease-in-out infinite',
              }}
            />
            <span
              className="text-[9px] tracking-[0.28em] uppercase font-medium text-violet-400"
            >
              Scroll
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── KEYFRAMES (injected) ─────────────────────────────────── */}
      <style>{`
        @keyframes blobMove1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(70px,60px) scale(1.12); }
        }
        @keyframes blobMove2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-80px,70px) scale(1.08); }
        }
        @keyframes blobMove3 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(50px,-80px) scale(1.1); }
        }
        @keyframes blobMove4 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-40px,50px) scale(1.15); }
        }
        @keyframes blobMove5 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-60px,-40px) scale(1.07); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.6; transform: scaleY(1); }
          50%      { opacity: 0.2; transform: scaleY(0.6); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}