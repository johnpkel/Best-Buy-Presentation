import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import ToolScatter from '../components/ToolScatter'

const STATS = [
  { value: '67%', label: 'say "secure & trustworthy" is the #1 requirement for personalization — Contentstack Benchmark' },
  { value: '66%', label: 'demand privacy respect as a precondition for sharing any data — Contentstack Benchmark' },
  { value: '64%', label: 'have experienced personalization that felt invasive or "creepy" — Contentstack Benchmark' },
]

const CREEPY_STATS = [
  { pct: 70, label: 'Saw ads for items they only discussed verbally' },
  { pct: 51, label: 'Overly frequent follow-ups after browsing' },
  { pct: 36, label: 'Hyper-targeted location-based ads' },
  { pct: 35, label: 'Brand knew information they never provided' },
]

const S02_BrokenPipeline = forwardRef(function S02_BrokenPipeline({ isActive }, ref) {
  return (
    <Section ref={ref} id="broken-pipeline" isActive={isActive}>
      <FadeIn>
        <p className="section__label">The Trust Gap</p>
        <p className="section__subtitle" style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Benchmark Takeaway #2: Privacy is critical 
        </p>
        <h2 className="section__title">
          The ROI is proven. But trust comes first.<br />
          <span className="text-muted">Getting personalization right is worth billions. Getting it wrong drives customers away.</span>
        </h2>
      </FadeIn>

      {/* Stats grid */}
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={0.1 + i * 0.1}>
            <div className="stat-card">
              <span className="stat-card__label">{stat.label}</span>
              <span className="stat-card__value">{stat.value}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Tool scatter — disconnected systems */}
      <FadeIn delay={0.5}>
        <ToolScatter assembled={false} />
      </FadeIn>

      {/* Punchline */}
      <FadeIn delay={0.6}>
        <blockquote className="section__quote">
          "Only <strong>14%</strong> of organizations have a 360° customer view.
          <strong> 73%</strong> of consumers distrust how brands handle their data.
          The gap between capability and trust is where revenue leaks."
          <cite>— Gartner Research + Contentstack Benchmark</cite>
        </blockquote>
      </FadeIn>
    </Section>
  )
})

export default S02_BrokenPipeline
