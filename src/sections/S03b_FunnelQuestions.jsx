import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import { DECISION_TABLE } from '../data/sparkMoments'

const S03b_FunnelQuestions = forwardRef(function S03b_FunnelQuestions({ isActive }, ref) {
  return (
    <Section ref={ref} id="funnel-questions" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">the activation gap</p>
        <h2 className="section__title">
          Let's zoom into some questions teams are asking
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="funnel-combo">
          <div className="decision-table">
            <div className="decision-table__header">
              <span>Question</span>
              <span>Who asks</span>
              <span className="decision-table__highlight-col">Current answer</span>
            </div>
            {DECISION_TABLE.map((row, i) => (
              <FadeIn key={row.decision} delay={0.3 + i * 0.1}>
                <div className="decision-table__row">
                  <span className="decision-table__decision">{row.decision}</span>
                  <span className="decision-table__who">{row.who}</span>
                  <span className="decision-table__data">{row.data}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.9}>
            <div className="funnel-combo__punchline">
              <span className="funnel-combo__punchline-icon">◆</span>
              Real-time data activation bridges every one of these gaps.
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    </Section>
  )
})

export default S03b_FunnelQuestions
