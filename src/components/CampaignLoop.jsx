import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Collect', sub: 'Events & Attributes', abbr: '📥', color: '#6366f1' },
  { label: 'Unify', sub: 'Identity Resolution', abbr: '🔗', color: '#3b82f6' },
  { label: 'Score', sub: 'AI Segmentation', abbr: '🧠', color: '#0d9488' },
  { label: 'Activate', sub: 'Real-Time Delivery', abbr: '⚡', color: '#059669' },
  { label: 'Personalize', sub: 'Adaptive Experiences', abbr: '🎯', color: '#22c55e' },
  { label: 'Measure', sub: 'Close the Loop', abbr: '📊', color: '#f59e0b' },
  { label: 'Learn', sub: 'Feed Back Insights', abbr: '🔄', color: '#7c3aed' },
]

export default function CampaignLoop() {
  return (
    <div className="campaign-pipeline">
      {/* Steps row */}
      <div className="campaign-pipeline__row">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            className="campaign-pipeline__step"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div
              className="campaign-pipeline__icon"
              style={{ background: step.color }}
            >
              {step.abbr}
            </div>
            <span className="campaign-pipeline__label">{step.label}</span>
            <span className="campaign-pipeline__sub">{step.sub}</span>

            {i < STEPS.length - 1 && (
              <motion.span
                className="campaign-pipeline__arrow"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                →
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* U-shaped loop-back */}
      <motion.div
        className="campaign-pipeline__loop"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <svg
          className="campaign-pipeline__loop-svg"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <defs>
            <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="0"
              markerWidth="8" markerHeight="8" orient="0">
              <path d="M 0 10 L 5 0 L 10 10" fill="none" stroke="#818cf8" strokeWidth="2" />
            </marker>
          </defs>
          <line x1="965" y1="0" x2="965" y2="30"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <line x1="965" y1="30" x2="35" y2="30"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <line x1="35" y1="30" x2="35" y2="2"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5"
            markerEnd="url(#arrowUp)" />
        </svg>
        <span className="campaign-pipeline__loop-label">
          learnings feed back into collection — the activation loop
        </span>
      </motion.div>
    </div>
  )
}
