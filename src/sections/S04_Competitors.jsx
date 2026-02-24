import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import CompetitorGrid from '../components/CompetitorGrid'

const DATA_SHARING = [
  { type: 'Purchase history', pct: 59, willing: true },
  { type: 'Hobbies & interests', pct: 53, willing: true },
  { type: 'Browsing history', pct: 37, willing: true },
  { type: 'Social profiles', pct: 6, willing: false },
  { type: 'Biometric data', pct: 5, willing: false },
]

const S04_ArchitectureGap = forwardRef(function S04_ArchitectureGap({ isActive }, ref) {
  return (
    <Section ref={ref} id="architecture-gap" isActive={isActive}>
      <FadeIn>
        <p className="section__label">The First-Party Data Shift</p>
        <p className="section__subtitle" style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Benchmark Takeaway #4: Buyers are very picky about the data they share
        </p>
        <h2 className="section__title">
          Third-party cookies are dead. 
        </h2>
        <p className="section__subtitle">
          <strong>95%</strong> of consumers want control over what data brands collect.
          <strong> 81%</strong> would show more loyalty if given that control.
          The question isn't whether to use first-party data — it's earning the
          right to collect it.
        </p>
      </FadeIn>

      {/* Data sharing willingness */}
      <FadeIn delay={0.1}>
        <p className="section__body" style={{ marginBottom: '12px' }}>
          What buyers will and won't share:
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
          {DATA_SHARING.map((item, i) => (
            <motion.div
              key={item.type}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: item.willing ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${item.willing ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                fontSize: '13px',
                color: 'var(--text-primary)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <strong>{item.pct}%</strong> {item.type}
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="section__body">
          Five symptoms of first-party data paralysis:
        </p>
      </FadeIn>

      <CompetitorGrid />

      <FadeIn delay={0.5}>
        <div className="insight-box">
          <p className="insight-box__text">
            Your website doesn't know that the person browsing right now
            spent $500 in-store yesterday — because first-party data flows one way.
            And <strong>only 11%</strong> of consumers are "very willing" to share more data,
            while Baby Boomers are 74% more resistant than average.
          </p>
          <p className="insight-box__punchline">
            Without a <strong>Data Activation Layer</strong> that maximizes the value of
            the data customers do share, every interaction is a wasted opportunity.
          </p>
        </div>
      </FadeIn>
    </Section>
  )
})

export default S04_ArchitectureGap
