import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import FunnelDiagram from '../components/FunnelDiagram'

const S03_FourBarriers = forwardRef(function S03_FourBarriers({ isActive }, ref) {
  return (
    <Section ref={ref} id="four-barriers" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">the activation gap</p>
        <h2 className="section__title">
          From zero to 360.
        </h2>
        <p className="section__subtitle">
          The seven pillars of a comprehensive data strategy.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <FunnelDiagram />
      </FadeIn>
    </Section>
  )
})

export default S03_FourBarriers
