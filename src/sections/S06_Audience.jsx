import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import AudienceBars from '../components/AudienceBars'

const INDUSTRY_DATA = [
  { industry: 'Food / Restaurants', pct: 54, color: '#22c55e' },
  { industry: 'Retail / E-commerce', pct: 41, color: '#3b82f6' },
  { industry: 'Media / Streaming', pct: 41, color: '#8b5cf6' },
  { industry: 'Travel / Hospitality', pct: 37, color: '#f59e0b' },
  { industry: 'Healthcare / Wellness', pct: 31, color: '#06b6d4' },
  { industry: 'Banking / Insurance', pct: 22, color: '#6366f1' },
  { industry: 'B2B / SaaS', pct: 8, color: '#94a3b8' },
]

const S06_IdentityCrisis = forwardRef(function S06_IdentityCrisis(_, ref) {
  return (
    <Section ref={ref} id="identity-crisis">
      <FadeIn>
        <p className="section__label">Pillar #2: Identity Resolution</p>
        <p className="section__subtitle" style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Benchmark Takeaway #3: Food and retail top consumer wish lists for personalization
        </p>
        <h2 className="section__title">
          90% of your visitors are ghosts.<br />
          You can't personalize what you can't identify.
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <AudienceBars />
      </FadeIn>

      {/* Industry receptiveness */}
      <FadeIn delay={0.35}>
        <p className="section__body section__body--center" style={{ marginTop: '24px', marginBottom: '16px' }}>
          Where consumers want personalization most:
        </p>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          {INDUSTRY_DATA.map((item, i) => (
            <motion.div
              key={item.industry}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '6px',
                fontSize: '13px',
              }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.06 }}
            >
              <span style={{ width: '140px', textAlign: 'right', color: 'var(--text-secondary)', flexShrink: 0 }}>
                {item.industry}
              </span>
              <div style={{ flex: 1, height: '18px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: item.color, borderRadius: '4px', opacity: 0.8 }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span style={{ width: '36px', fontWeight: 600, color: item.color }}>{item.pct}%</span>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.7}>
        <p className="section__body section__body--center" style={{ marginTop: '20px' }}>
          Identity resolution combines deterministic identifiers (hashed emails,
          CRM IDs) with probabilistic signals (cookies, device IDs) to create a
          unified C360 profile. The industries where consumers want personalization most
          are the same ones generating the richest first-party data — if you can connect it.
        </p>
      </FadeIn>
    </Section>
  )
})

export default S06_IdentityCrisis
