import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import ToolScatter from '../components/ToolScatter'

const IMPACT_STATS = [
  { value: '50%', label: 'Lower CAC', color: '#34d399' },
  { value: '5–15%', label: 'Revenue Lift', color: '#6366f1' },
  { value: '80%', label: 'Likelihood to Purchase', color: '#f59e0b' },
]

const S09_Closing = forwardRef(function S09_Closing({ isActive }, ref) {
  return (
    <Section ref={ref} id="closing" dark className="section--closing" isActive={isActive}>
      <FadeIn>
        <p className="section__label">The Closing Argument</p>
        <h2 className="section__title section__title--large">
          Stop guessing.<br />
          <span className="text-glow">Start activating.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <ToolScatter assembled={true} />
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="closing__impact">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="closing__impact-stat"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
            >
              <span className="closing__impact-value" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="closing__impact-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <motion.div
          className="closing__formula"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          First-Party Data + 3rd party signals + Identity + AI = <span className="text-glow">Activation</span>
          <span className="closing__formula-sub">
            The data exists. The psychology works. The architecture is ready.<br />
            Now it's about the decision to activate.
          </span>
        </motion.div>
      </FadeIn>
    </Section>
  )
})

export default S09_Closing
