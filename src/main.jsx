import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RouterApp from './router.jsx'

import './styles/globals.css'
import './styles/animations.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// -----------------------------
// LENIS SMOOTH SCROLL SETUP
// -----------------------------
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
})

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

// GSAP ticker integration
const update = (time) => {
  lenis.raf(time * 1000)
}

gsap.ticker.add(update)

// Improve animation smoothness
gsap.ticker.lagSmoothing(0)

// Export globally if needed
export { lenis }

// -----------------------------
// REACT APP RENDER
// -----------------------------
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // StrictMode removed temporarily
  // because it can double-render
  // GSAP + Three.js scenes in dev mode

  <RouterApp />
)

// -----------------------------
// CLEANUP (Hot Reload Safe)
// -----------------------------
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    gsap.ticker.remove(update)
    lenis.destroy()
  })
}