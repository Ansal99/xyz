import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { ButtonGhost } from '../../ui/Button.jsx'
import Card from '../../ui/Card.jsx'

const FEATURES = [
  { title: 'AI Farming Assistant',      color: '#6EE7B7', tag: 'Mistral AI',      desc: 'Farmers type or speak a question — Mistral AI answers in structured bullet points. Voice input via Web Speech API. Bilingual Hindi + English via Google Translate.' },
  { title: 'Plant Disease Detection',   color: '#818CF8', tag: 'PlantNet API',    desc: 'Upload a photo or capture from camera. PlantNet identifies plant species, common name, family, and confidence score. Built for field use — no expertise required.' },
  { title: 'Live Commodity Prices',     color: '#F59E0B', tag: 'Web Scraping',    desc: 'Real-time Himachal Pradesh mandi prices for 60+ commodities scraped by date. District, market, min/max/avg price in a responsive table.' },
  { title: 'Government Schemes',        color: '#EC4899', tag: 'BeautifulSoup',   desc: 'Live scraping of HP government agricultural schemes. Cards with title, image, and link — always current, no manual updates needed.' },
  { title: 'Agriculture News',          color: '#6EE7B7', tag: 'GNews API',       desc: 'Latest agriculture news with pagination — loads 5 at a time. Title, description, image, and source link.' },
  { title: '15 Agriculture Calculators',color: '#818CF8', tag: 'Built-in Tools',  desc: 'Seed Rate, Fertilizer, Soil pH, Irrigation, Crop Yield, Drip Irrigation, Rainwater Harvesting, Frost Prediction, Heat Stress, GDD, Harvest Timing, Cost of Cultivation, Loan EMI, Feed Requirement, Tractor Fuel Efficiency.' },
]

const STATS = [
  { val: '6',   label: 'API integrations',    color: '#6EE7B7' },
  { val: '15',  label: 'Calculators built',   color: '#818CF8' },
  { val: '60+', label: 'Commodities tracked', color: '#F59E0B' },
  { val: '2',   label: 'Languages supported', color: '#EC4899' },
]

const STACK = [
  { layer: 'Frontend', items: 'HTML · CSS · JavaScript (Vanilla)' },
  { layer: 'Backend',  items: 'Python · Flask · Gunicorn' },
  { layer: 'AI / ML',  items: 'Mistral AI (mistral-medium) · PlantNet Vision API' },
  { layer: 'Data',     items: 'BeautifulSoup · Requests · GNews API · OpenWeatherMap' },
  { layer: 'Deploy',   items: 'Procfile · Gunicorn (Heroku-ready)' },
]

export default function CTFarmaCaseStudy() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function handleBack() {
    navigate('/')
    setTimeout(() => {
      const el = document.querySelector('#projects')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  return (
    <div className="min-h-[100dvh] bg-bg">

      <section className="py-24 max-w-4xl mx-auto px-4 md:px-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="eyebrow-pill mb-5 inline-flex">Full Stack + AI · Agricultural Tech</span>
          <h1 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(3rem,6vw,5rem)', color: '#6EE7B7' }}>
            CT-FARMA
          </h1>
          <p className="font-body text-muted mb-2" style={{ fontSize: '1.125rem' }}>
            An AI-powered platform built for Indian farmers — not a demo, an actual working tool.
          </p>
          <p className="font-mono text-white/30 text-sm mb-8">
            Mistral AI · PlantNet · Web Scraping · 15 Calculators · Hindi + English
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Python', 'Flask', 'JavaScript', 'Mistral AI', 'PlantNet', 'BeautifulSoup', 'GNews API'].map(t => (
              <span key={t} className="code-tag">{t}</span>
            ))}
          </div>
          <ButtonGhost href="https://github.com/Ansal99" target="_blank" rel="noopener">
            View Code on GitHub →
          </ButtonGhost>
        </motion.div>
      </section>

      <section className="pb-6 max-w-4xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="card-bezel text-center"
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="card-bezel-inner py-5">
                <p className="font-display font-bold leading-none mb-1" style={{ fontSize: '2rem', color: s.color }}>{s.val}</p>
                <p className="font-mono text-white/35" style={{ fontSize: '10px' }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <Card>
          <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.1rem' }}>The Problem</h3>
          <p className="font-body text-muted leading-relaxed text-sm">
            Indian farmers — especially in Himachal Pradesh — need real-time crop prices, weather info, government scheme updates, and expert advice. These exist in silos across different portals, mostly English-only. CT-FARMA brings all of it into one bilingual platform with AI at the center.
          </p>
        </Card>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <h3 className="font-display font-semibold text-text mb-5" style={{ fontSize: '1.2rem' }}>What It Actually Does</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="card-bezel"
              initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
              <div className="card-bezel-inner" style={{ background: `linear-gradient(135deg, ${f.color}08, #0D0D0D)` }}>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide mb-3 inline-block"
                  style={{ color: f.color, background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  {f.tag}
                </span>
                <h4 className="font-display font-semibold mb-2" style={{ fontSize: '1rem', color: f.color }}>{f.title}</h4>
                <p className="font-body text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <Card>
          <h3 className="font-display font-semibold text-text mb-5" style={{ fontSize: '1.1rem' }}>Tech Stack</h3>
          <div className="space-y-3">
            {STACK.map((s) => (
              <div key={s.layer} className="flex items-start gap-4">
                <span className="font-mono text-xs shrink-0 pt-0.5 w-20" style={{ color: '#6EE7B7' }}>{s.layer}</span>
                <span className="font-body text-muted text-sm">{s.items}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8 pb-24">
        <Card>
          <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.1rem' }}>Key Learnings</h3>
          <ul className="space-y-2">
            {[
              'Scraping real government sites is harder than any tutorial — data is inconsistent, pagination breaks, servers timeout. Handled all three.',
              'Mistral API response formatting matters as much as the answer — structured the system prompt to force bullet-point output for readability.',
              'PlantNet confidence scores below 40% are unreliable — built a threshold filter so low-confidence results show a warning instead of false information.',
              'Building for rural users meant thinking about slow connections, small screens, and Hindi-first UX — Google Translate integration was non-negotiable.',
              'Deploying Flask with Gunicorn via Procfile taught me production vs development mindset — localhost is not enough.',
            ].map((point, i) => (
              <li key={i} className="flex gap-2 font-body text-muted text-sm leading-relaxed">
                <span className="text-accent shrink-0 mt-0.5">—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}