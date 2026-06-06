import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { ButtonGhost } from '../../ui/Button.jsx'
import Card from '../../ui/Card.jsx'

const sections = [
  {
    title: 'The Problem',
    content: "India's legal system processes millions of cases annually. Predicting outcomes has traditionally required years of expertise and access to legal professionals. CourtX makes that predictive intelligence accessible — 9 case types, 34 states, one platform.",
  },
  {
    title: 'The Approach',
    content: 'Built a weighted ensemble of XGBoost and Random Forest models trained on historical Indian court data. Feature engineering focused on case type, state, hearing duration patterns, and legal arguments. SHAP values provide factor-level explanations for every prediction — making model decisions transparent enough to be meaningful.',
  },
  {
    title: 'Why Ensemble',
    content: 'A single model overfit to specific case types. The ensemble approach — combining XGBoost\'s gradient boosting with Random Forest\'s variance reduction — generalized significantly better across all 34 states and 9 case types.',
  },
  {
    title: 'Results & Metrics',
    content: 'Supports 9 case types across 34 Indian states. SHAP-based explainability for every prediction. Model accuracy metrics available in the GitHub repository — owner to update with final numbers.',
  },
  {
    title: 'Key Learnings',
    content: 'Legal data is messy and unstructured. Feature engineering was 70% of the work. SHAP explainability wasn\'t an afterthought — it shaped the model architecture. Ensemble over single model, always, for heterogeneous datasets.',
  },
]

export default function CourtXCaseStudy() {
  return (
    <div className="min-h-[100dvh] bg-bg">
      {/* Hero */}
      <section className="py-24 max-w-4xl mx-auto px-4 md:px-8">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted
          hover:text-accent mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="eyebrow-pill mb-5 inline-flex">Applied ML Research</span>
          <h1 className="font-display font-bold text-accent mb-3" style={{ fontSize: 'clamp(3rem,6vw,5rem)' }}>
            CourtX
          </h1>
          <p className="font-body text-muted mb-6" style={{ fontSize: '1.125rem' }}>
            AI that predicts Indian court outcomes — 9 case types, 34 states.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Python', 'XGBoost', 'Random Forest', 'SHAP', 'Scikit-learn'].map(t => (
              <span key={t} className="code-tag">{t}</span>
            ))}
          </div>
          <ButtonGhost href="https://github.com/Ansal99" target="_blank" rel="noopener">
            View Code on GitHub →
          </ButtonGhost>
        </motion.div>
      </section>

      {/* Architecture diagram */}
      <section className="py-12 max-w-4xl mx-auto px-4 md:px-8">
        <Card>
          <h3 className="font-display font-semibold text-text mb-6">System Architecture</h3>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {['Input Data', 'Feature Engineering', 'XGBoost + RF Ensemble', 'SHAP Explainer', 'Prediction + Explanation'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-xl bg-accent/10 border border-accent/20 text-center">
                  <span className="font-mono text-xs text-accent block mb-0.5">{String(i+1).padStart(2,'0')}</span>
                  <span className="font-body text-text text-xs">{step}</span>
                </div>
                {i < arr.length - 1 && <span className="text-muted font-mono text-lg">→</span>}
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-24 space-y-6">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Card>
              <h3 className="font-display font-semibold text-text mb-3" style={{ fontSize: '1.15rem' }}>
                {s.title}
              </h3>
              <p className="font-body text-muted leading-relaxed">{s.content}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
