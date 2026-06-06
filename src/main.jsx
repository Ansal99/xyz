import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RouterApp from './router.jsx'
import './styles/globals.css'
import './styles/animations.css'

gsap.registerPlugin(ScrollTrigger)

export const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  syncTouch: false,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

ReactDOM.createRoot(document.getElementById('root')).render(<RouterApp />)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    gsap.ticker.remove((time) => lenis.raf(time * 1000))
    lenis.destroy()
  })
}