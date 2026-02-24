import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'

const S01_DataParadox = forwardRef(function S01_DataParadox(_, ref) {
  return (
    <Section ref={ref} id="data-paradox" dark>
      <FadeIn>
        <p className="section__label">The Data Paradox</p>
        <p className="section__subtitle" style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Benchmark Takeaway #1: Buyers have a positive view of personalization
        </p>
      </FadeIn>

      <div className="split">
        {/* What Buyers Want */}
        <FadeIn delay={0.1} className="split__panel split__panel--before">
          <h3 className="split__heading">What Buyers Want</h3>
          <p className="split__text">
            <strong>45%</strong> of consumers actively seek brands that offer personalized
            experiences. <strong>67%</strong> say personalization has helped them discover
            relevant new products. And <strong>75%</strong> believe their favorite brands
            already understand their preferences.
          </p>
          <div className="split__tools">
            {['CRM', 'ERP', 'Analytics', 'CDP', 'DW', 'Email'].map((t, i) => (
              <motion.span
                key={t}
                className="split__tool-chip split__tool-chip--dim"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
          <p className="split__text" style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
            Gen Z is 40% more likely than average to prioritize personalization.
            <span style={{ opacity: 0.6 }}> — Contentstack Benchmark Report</span>
          </p>
        </FadeIn>

        {/* What Companies Deliver */}
        <FadeIn delay={0.3} className="split__panel split__panel--after">
          <h3 className="split__heading split__heading--glow">What Companies Deliver</h3>
          <p className="split__text">
            Almost nothing in real-time. <strong>64%</strong> of shoppers have experienced
            "creepy" personalization. Data flows into the warehouse but never back to
            the experience layer — across an average of 976 disconnected apps.
            This is first-party data paralysis.
          </p>
          <motion.div
            className="split__formula"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Collection ≠ <span className="text-glow">Activation</span>
          </motion.div>
        </FadeIn>
      </div>
    </Section>
  )
})

export default S01_DataParadox
