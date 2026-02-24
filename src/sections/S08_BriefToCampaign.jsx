import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'
import BriefCard from '../components/BriefCard'
import CampaignLoop from '../components/CampaignLoop'

const S08_ActivationPlaybook = forwardRef(function S08_ActivationPlaybook({ isActive }, ref) {
  return (
    <Section ref={ref} id="activation-playbook" isActive={isActive}>
      <FadeIn>
        <p className="section__label">Your Roadmap</p>
        <h2 className="section__title">
          From dormant to activated
        </h2>
      </FadeIn>

      <div className="brief-campaign-layout">
        <FadeIn delay={0.1} className="brief-campaign-layout__brief">
          <BriefCard />
        </FadeIn>

        <FadeIn delay={0.3} className="brief-campaign-layout__loop">
          <CampaignLoop />
        </FadeIn>
      </div>
    </Section>
  )
})

export default S08_ActivationPlaybook
