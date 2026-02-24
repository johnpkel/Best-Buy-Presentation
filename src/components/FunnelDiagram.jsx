import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { FUNNEL_STEPS, DECISION_TABLE } from '../data/sparkMoments'

export default function FunnelDiagram() {
  return (
    <div className="funnel-combo">
      {/* Part 1: The data activation pipeline steps */}
      <div className="funnel-mini">
        {FUNNEL_STEPS.map((step, i) => (
          <FadeIn key={step.label} delay={i * 0.08}>
            <div className={`funnel-mini__step ${step.active ? 'funnel-mini__step--active' : ''}`}>
              <span className="funnel-mini__num">{i + 1}</span>
              <span className="funnel-mini__label">{step.label}</span>
            </div>
          </FadeIn>
        ))}
        <FadeIn delay={0.5}>
          <div className="funnel-mini__bracket">
            <span className="funnel-mini__bracket-line" />
            <span className="funnel-mini__bracket-label">
              This is where most companies get stuck
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Transition */}
      <FadeIn delay={0.6}>
        <p className="funnel-combo__transition">
          Zoom into the questions teams are asking:
        </p>
      </FadeIn>

      {/* Part 2: The decision table */}
      <div className="decision-table">
        <div className="decision-table__header">
          <span>Question</span>
          <span>Who asks</span>
          <span className="decision-table__highlight-col">Current answer</span>
        </div>
        {DECISION_TABLE.map((row, i) => (
          <FadeIn key={row.decision} delay={0.7 + i * 0.1}>
            <div className="decision-table__row">
              <span className="decision-table__decision">{row.decision}</span>
              <span className="decision-table__who">{row.who}</span>
              <span className="decision-table__data">{row.data}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Punchline */}
      <FadeIn delay={1.3}>
        <div className="funnel-combo__punchline">
          <span className="funnel-combo__punchline-icon">◆</span>
          Real-time data activation bridges every one of these gaps.
        </div>
      </FadeIn>
    </div>
  )
}
