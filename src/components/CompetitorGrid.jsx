import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { COMPETITOR_GRID, BUYER_BELIEFS } from '../data/competitors'

export default function CompetitorGrid() {
  return (
    <div className="comp-grid">
      {/* Buyer beliefs */}
      <div className="comp-grid__beliefs">
        {BUYER_BELIEFS.map((b, i) => (
          <FadeIn key={b.id} delay={i * 0.08}>
            <div className="comp-grid__belief">
              <div className="comp-grid__belief-num">{b.id}</div>
              <div className="comp-grid__belief-content">
                <span className="comp-grid__belief-text">"{b.belief}"</span>
                <span className="comp-grid__belief-vendor">{b.vendor}</span>
                <span className="comp-grid__belief-detail">{b.detail}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Grid */}
      <FadeIn delay={0.4}>
        <div className="comp-grid__table">
          <div className="comp-grid__row comp-grid__row--header">
            <span>Barrier</span>
            <span>Symptom</span>
            <span>Impact</span>
          </div>
          {COMPETITOR_GRID.map((c) => (
            <motion.div
              key={c.vendor}
              className="comp-grid__row"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="comp-grid__vendor">{c.vendor}</span>
              <span className="comp-grid__frame">{c.frame}</span>
              <span className="comp-grid__blind">{c.blindSpot}</span>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
