import FadeIn from './FadeIn'
import { BUYER_BELIEFS } from '../data/competitors'

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
    </div>
  )
}
