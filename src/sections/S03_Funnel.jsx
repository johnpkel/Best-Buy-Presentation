import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import FunnelDiagram from '../components/FunnelDiagram'

const S03_FourBarriers = forwardRef(function S03_FourBarriers({ isActive }, ref) {
  return (
    <Section ref={ref} id="four-barriers" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">The 7 Pillars of C360</p>
        <h2 className="section__title">
          From zero to a complete customer view.
        </h2>
        <p className="section__subtitle">
          A comprehensive data strategy requires seven pillars — from governance
          to portability. Most companies get stuck between pillar 2 (identity)
          and pillar 6 (portability). That's the activation gap.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <FunnelDiagram />
      </FadeIn>
    </Section>
  )
})

export default S03_FourBarriers
