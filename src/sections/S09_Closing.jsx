import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import ToolScatter from '../components/ToolScatter'

const AI_BALANCE = [
  { label: 'Product recommendations', pct: 71, prefer: 'AI', color: '#6366f1' },
  { label: 'Marketing messages', pct: 72, prefer: 'AI', color: '#8b5cf6' },
  { label: 'Product descriptions', pct: 79, prefer: 'AI', color: '#a78bfa' },
  { label: 'Complex customer service', pct: 82, prefer: 'Human', color: '#f59e0b' },
  { label: 'High-value purchases', pct: 59, prefer: 'Human', color: '#f97316' },
  { label: 'Troubleshooting', pct: 55, prefer: 'Human', color: '#ef4444' },
]

const S09_Closing = forwardRef(function S09_Closing({ isActive }, ref) {
  return (
    <Section ref={ref} id="closing" dark className="section--closing" isActive={isActive}>
      <FadeIn>
        <p className="section__label">The Context Economy</p>
        <p className="section__subtitle" style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Benchmark Takeaway #5: AI is great for recommendations — not for replacing humans
        </p>
        <h2 className="section__title section__title--large">
          Stop guessing.<br />
          <span className="text-glow">Start activating.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{ maxWidth: '560px', margin: '0 auto 24px', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#818cf8', marginBottom: '8px', textAlign: 'center' }}>
              Buyers prefer AI for
            </p>
            {AI_BALANCE.filter(a => a.prefer === 'AI').map((item, i) => (
              <motion.div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '12px' }}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span style={{ width: '24px', fontWeight: 700, color: item.color }}>{item.pct}%</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f59e0b', marginBottom: '8px', textAlign: 'center' }}>
              Buyers prefer humans for
            </p>
            {AI_BALANCE.filter(a => a.prefer === 'Human').map((item, i) => (
              <motion.div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '12px' }}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span style={{ width: '24px', fontWeight: 700, color: item.color }}>{item.pct}%</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <ToolScatter assembled={true} />
      </FadeIn>

      <FadeIn delay={0.5}>
        <p className="section__body section__body--center">
          Companies that get activation right see 50% lower CAC, 5–15% revenue lift,
          and 10–30% better marketing ROI. The key: use AI where buyers want it
          (recommendations, content, discovery) and humans where they need them
          (complex support, high-value decisions). Context-aware activation makes both better.
        </p>
      </FadeIn>

      <FadeIn delay={0.6}>
        <motion.div
          className="closing__formula"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          First-Party Data + C360 Identity + AI = <span className="text-glow">Activation</span>
          <span className="closing__formula-sub">
            Context is the new content. Activation is the new strategy.
          </span>
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.8}>

      </FadeIn>
    </Section>
  )
})

export default S09_Closing
