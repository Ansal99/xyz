import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { ButtonGhost } from '../../ui/Button.jsx'
import Card from '../../ui/Card.jsx'
import { lenis } from '../../../main.jsx'

const METRICS = [
  { model: 'XGBoost',       accuracy: '80.2%', f1: '85%', auc: '86.8%', color: '#818CF8' },
  { model: 'Random Forest', accuracy: '81.1%', f1: '86%', auc: '88.1%', color: '#6EE7B7' },
]

const STAT_CARDS = [
  { val: '9,66,329', label: 'Training rows',    color: '#6EE7B7' },
  { val: '81.1%',    label: 'Best accuracy',    color: '#818CF8' },
  { val: '88.1%',    label: 'Best AUC-ROC',     color: '#F59E0B' },
  { val: '34',       label: 'States covered',   color: '#EC4899' },
  { val: '9',        label: 'Case types',       color: '#6EE7B7' },
  { val: '80/20',    label: 'Train/test split', color: '#94A3B8' },
]

const SECTIONS = [
  { title: 'The Problem',                   content: "India's legal system processes millions of cases annually. Predicting outcomes has traditionally required years of expertise and expensive legal counsel. CourtX makes that predictive intelligence accessible — trained on 9,66,329 real court records across 9 case types and 34 states." },
  { title: 'The Approach',                  content: 'Built a weighted ensemble of XGBoost and Random Forest models. Feature engineering focused on case type, state, hearing duration patterns, and legal arguments. SHAP values provide factor-level explanations for every prediction — making model decisions transparent and legally meaningful, not just accurate.' },
  { title: 'Why Ensemble Over Single Model',content: 'A single model overfit to specific case types. XGBoost alone hit 80.2% accuracy. Random Forest alone hit 81.1%. The ensemble approach reduced variance across all 34 states and 9 case types — the goal was consistent generalization, not peak accuracy on any one category.' },
  { title: 'SHAP Explainability',           content: 'Accuracy without explanation is useless in legal contexts. Every prediction comes with SHAP-based factor breakdown — which features pushed the prediction toward Win or Loss, and by how much. This was not an afterthought; it shaped the model architecture from day one.' },
  { title: 'Key Learnings',                 content: 'Legal data is messy and heavily imbalanced — Win/Loss ratio was roughly 63/37. Feature engineering was 70% of the work. The model performs stronger on Win predictions (F1: 85-86%) than Loss predictions (F1: 71%) — a known limitation worth addressing in v2 with better class balancing.' },
]

export default function CourtXCaseStudy() {
  const navigate = useNavigate()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  function handleBack() {
    navigate('/')
    // Projects section pe scroll karo — DOM settle hone ka wait karo
    setTimeout(() => {
      const projectsEl = document.querySelector('#projects')
      if (projectsEl) {
        if (lenis) {
          lenis.scrollTo(projectsEl, { immediate: true, offset: -80 })
        } else {
          projectsEl.scrollIntoView({ behavior: 'instant' })
        }
      }
    }, 80)
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
          <span className="eyebrow-pill mb-5 inline-flex">Applied ML · Legal AI</span>
          <h1 className="font-display font-bold text-accent mb-3" style={{ fontSize: 'clamp(3rem,6vw,5rem)' }}>
            CourtX
          </h1>
          <p className="font-body text-muted mb-2" style={{ fontSize: '1.125rem' }}>
            Predicting Indian court outcomes with explainable AI.
          </p>
          <p className="font-mono text-white/30 text-sm mb-8">
            9,66,329 rows · 9 case types · 34 states · XGBoost + Random Forest + SHAP
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Python', 'XGBoost', 'Random Forest', 'SHAP', 'Scikit-learn', 'Pandas'].map(t => (
              <span key={t} className="code-tag">{t}</span>
            ))}
          </div>
          <ButtonGhost href="https://github.com/Ansal99/CourtX1" target="_blank" rel="noopener">
            View Code on GitHub →
          </ButtonGhost>
        </motion.div>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {STAT_CARDS.map((s, i) => (
            <motion.div key={s.label} className="card-bezel text-center"
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <div className="card-bezel-inner py-4 px-2">
                <p className="font-display font-bold leading-none mb-1" style={{ fontSize: '1.3rem', color: s.color }}>{s.val}</p>
                <p className="font-mono text-white/35" style={{ fontSize: '9px', lineHeight: 1.4 }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <Card>
          <h3 className="font-display font-semibold text-text mb-6" style={{ fontSize: '1.1rem' }}>Model Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {METRICS.map((m) => (
              <div key={m.model} className="rounded-2xl p-5"
                style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                <p className="font-display font-bold mb-4" style={{ fontSize: '1rem', color: m.color }}>{m.model}</p>
                <div className="space-y-3">
                  {[{ label: 'Accuracy', val: m.accuracy }, { label: 'F1 Score', val: m.f1 }, { label: 'AUC-ROC', val: m.auc }].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="font-body text-white/40 text-sm">{row.label}</span>
                      <span className="font-mono font-semibold text-sm" style={{ color: m.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: m.color }}
                    initial={{ width: 0 }} whileInView={{ width: m.accuracy }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl px-4 py-3" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <p className="font-mono text-[11px]" style={{ color: 'rgba(245,158,11,0.7)', lineHeight: 1.6 }}>
              <span style={{ color: '#F59E0B' }}>Note —</span> Win prediction F1 (85-86%) outperforms Loss prediction F1 (71%) due to class imbalance (63% Win / 37% Loss). Class balancing is a planned improvement for v2.
            </p>
          </div>
        </Card>
      </section>

      <section className="py-6 max-w-4xl mx-auto px-4 md:px-8">
        <Card>
          <h3 className="font-display font-semibold text-text mb-6">System Architecture</h3>
          <div className="flex items-center justify-between flex-wrap gap-3">
            {['9,66,329 rows', 'Feature Engineering', 'XGBoost + RF Ensemble', 'SHAP Explainer', 'Prediction + Reason'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-xl text-center" style={{ background: 'rgba(110,231,183,0.06)', border: '1px solid rgba(110,231,183,0.15)' }}>
                  <span className="font-mono text-[10px] text-accent block mb-0.5">{String(i+1).padStart(2,'0')}</span>
                  <span className="font-body text-text text-xs">{step}</span>
                </div>
                {i < arr.length - 1 && <span className="text-white/20 font-mono text-lg">→</span>}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-24 space-y-4 pt-4">
        {SECTIONS.map((s, i) => (
          <motion.div key={s.title} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}>
            <Card>
              <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.05rem' }}>{s.title}</h3>
              <p className="font-body text-muted leading-relaxed text-sm">{s.content}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
