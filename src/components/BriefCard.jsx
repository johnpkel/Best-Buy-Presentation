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

      <div className="brief-card__section">
        <span className="brief-card__label">The 7 Pillars</span>
        <div className="brief-card__channels">
          {CREATIVE_BRIEF.channels.map((ch) => (
            <div key={ch.name} className="brief-card__channel">
              <div className="brief-card__channel-bar">
                <motion.div
                  className="brief-card__channel-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${ch.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="brief-card__channel-name">{ch.name}</span>
              <span className="brief-card__channel-budget">{ch.budget}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="brief-card__section">
        <span className="brief-card__label">The Outcome</span>
        <p className="brief-card__theme">"{CREATIVE_BRIEF.theme}"</p>
        <p className="brief-card__tone">{CREATIVE_BRIEF.tone}</p>
      </div>
    </motion.div>
  )
}
