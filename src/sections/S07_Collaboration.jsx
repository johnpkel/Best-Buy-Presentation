import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import SlackMessage from '../components/SlackMessage'

const S07_RealTimeShift = forwardRef(function S07_RealTimeShift(_, ref) {
  return (
    <Section ref={ref} id="real-time-shift" dark>
      <FadeIn>
        <p className="section__label">First-Party Data Paralysis</p>
        <h2 className="section__title">
          The teams know the problem.<br />
          Now they need the architecture to fix it.
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <SlackMessage />
      </FadeIn>

      <FadeIn delay={0.5}>
        <p className="section__body section__body--center">
          First-party data paralysis happens when converting data into personalized
          content feels complicated and costly. The fix isn't more data — it's the
          right architecture to activate the data you already have.
        </p>
      </FadeIn>
    </Section>
  )
})

export default S07_RealTimeShift
