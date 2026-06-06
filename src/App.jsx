
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Loader from './components/sections/Loader.jsx'
import Navbar from './components/layout/Navbar.jsx'

import Hero from './components/sections/Hero.jsx'
import Education from './components/sections/Education.jsx'
import MemoryReel from './components/sections/MemoryReel.jsx'
import Skills from './components/sections/Skills.jsx'
import JourneyTimeline from './components/sections/JourneyTimeline.jsx'
import About from './components/sections/About.jsx'
import PersonalStory from './components/sections/PersonalStory.jsx'
import Experience from './components/sections/Experience.jsx'
import Projects from './components/sections/Projects.jsx'
import OpenSource from './components/sections/OpenSource.jsx'
import Research from './components/sections/Research.jsx'
import CreativeProcess from './components/sections/CreativeProcess.jsx'
import Services from './components/sections/Services.jsx'
import Achievements from './components/sections/Achievements.jsx'
import Certifications from './components/sections/Certifications.jsx'
import MomentsStrip from './components/sections/MomentsStrip.jsx'
import Contact from './components/sections/Contact.jsx'

import Footer from './components/layout/Footer.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader
            key="loader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="bg-black text-white overflow-x-hidden">
          <Navbar />

          <main>
            <section id="hero">
              <Hero />
            </section>

            <section id="education">
              <Education />
            </section>

            <section id="memory-reel">
              <MemoryReel />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="journey">
              <JourneyTimeline />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="personal-story">
              <PersonalStory />
            </section>

            <section id="experience">
              <Experience />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="opensource">
              <OpenSource />
            </section>

            <section id="research">
              <Research />
            </section>

            <section id="creative-process">
              <CreativeProcess />
            </section>

            <section id="services">
              <Services />
            </section>

            <section id="achievements">
              <Achievements />
            </section>

            <section id="certifications">
              <Certifications />
            </section>

            <section id="moments">
              <MomentsStrip />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}

export default App
