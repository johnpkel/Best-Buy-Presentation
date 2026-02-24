import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import ArchitectureSlide from '../components/ArchitectureSlide'

const S05_DataArchitecture = forwardRef(function S05_DataArchitecture({ isActive }, ref) {
  return (
    <Section ref={ref} id="data-architecture" dark>
      <FadeIn>
        <p className="section__label">The Data Activation Layer</p>
        <h2 className="section__title">
          Contentstack Data & Insights Architecture
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ArchitectureSlide isActive={isActive} />
      </FadeIn>
    </Section>
  )
})

export default S05_DataArchitecture
