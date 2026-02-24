import { motion } from 'framer-motion'
import { CREATIVE_BRIEF } from '../data/sparkMoments'

export default function BriefCard() {
  return (
    <motion.div
      className="brief-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="brief-card__header">
        <span className="brief-card__icon">📋</span>
        <span className="brief-card__title">{CREATIVE_BRIEF.title}</span>
      </div>

      <div className="brief-card__section">
        <span className="brief-card__label">Objective</span>
        <p>{CREATIVE_BRIEF.objective}</p>
      </div>

      <div className="brief-card__section">
        <span className="brief-card__label">Target Audience</span>
        <p>{CREATIVE_BRIEF.audience}</p>
      </div>


    </motion.div>
  )
}
