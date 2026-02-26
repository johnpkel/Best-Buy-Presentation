import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import ToolScatter from '../components/ToolScatter'

const BEHAVIORAL_SCORES = [
  { name: 'Propensity', desc: 'Likelihood to return', score: 82, color: '#6366f1' },
  { name: 'Intensity', desc: 'Depth of engagement per session', score: 74, color: '#818cf8' },
  { name: 'Momentum', desc: 'Rate of engagement change', score: 68, color: '#a78bfa' },
  { name: 'Recency', desc: 'How recently they engaged', score: 91, color: '#34d399' },
  { name: 'Frequency', desc: 'Consistency of interactions', score: 56, color: '#22c55e' },
  { name: 'Quantity', desc: 'Cumulative lifetime activity', score: 63, color: '#f59e0b' },
  { name: 'Maturity', desc: 'Customer relationship age', score: 45, color: '#fb923c' },
  { name: 'Volatility', desc: 'Stability of behavior patterns', score: 31, color: '#f472b6' },
  { name: 'Consistency', desc: 'Regularity of engagement', score: 58, color: '#38bdf8' },
]

const S06_IdentityCrisis = forwardRef(function S06_IdentityCrisis({ isActive }, ref) {
  return (
    <Section ref={ref} id="identity-crisis" isActive={isActive}>
      <FadeIn>
        <p className="section__label">Identity Resolution</p>
        <h2 className="section__title">
          Speaking of context...90% of your visitors are ghosts.
        </h2>
        <p className="section__subtitle">
          You can't personalize what you can't identify. And you can't identify
          what you can't connect.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ToolScatter assembled={false} />
      </FadeIn>

      {/* Behavioral scoring */}
      <FadeIn delay={0.35}>
        <p className="section__body section__body--center" style={{ marginTop: '24px', marginBottom: '16px' }}>
          You'll want some sort of behavioral scoring & lookalike modeling — computed
          continuously, normalized 0–100:
        </p>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {BEHAVIORAL_SCORES.map((item, i) => (
            <motion.div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '6px',
                fontSize: '19px',
              }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.04 }}
            >
              <span style={{ width: '100px', textAlign: 'right', color: item.color, fontWeight: 600, flexShrink: 0 }}>
                {item.name}
              </span>
              <div style={{ flex: 1, height: '18px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: item.color, borderRadius: '4px', opacity: 0.8 }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span style={{ width: '32px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}>{item.score}</span>
              <span style={{ width: '300px', color: 'var(--text-muted)', fontSize: '17px', flexShrink: 0 }}>
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.7}>

      </FadeIn>
    </Section>
  )
})

export default S06_IdentityCrisis
