import useScrollSections from './hooks/useScrollSections'
import NavigationDots from './components/NavigationDots'
import S00_Hero from './sections/S00_Hero'
import S01_QuickStory from './sections/S01_QuickStory'
import S01_DevTransform from './sections/S01_DevTransform'
import S02b_WhyPersonalize from './sections/S02b_WhyPersonalize'
import S02c_ContextEconomy from './sections/S02c_ContextEconomy'
// import S02_MarketingPain from './sections/S02_MarketingPain'
import S03_Funnel from './sections/S03_Funnel'
import S03b_FunnelQuestions from './sections/S03b_FunnelQuestions'
import S04_Competitors from './sections/S04_Competitors'
import S05_Surface from './sections/S05_Surface'
import S06_Audience from './sections/S06_Audience'
import S09b_JourneyOrchestration from './sections/S09b_JourneyOrchestration'
import S07_Collaboration from './sections/S07_Collaboration'
import S08_BriefToCampaign from './sections/S08_BriefToCampaign'
import S10_FuturePuck from './sections/S10_FuturePuck'
import S09_Closing from './sections/S09_Closing'

const SECTION_COUNT = 15

export default function App() {
  const { currentSection, registerRef, scrollTo } = useScrollSections(SECTION_COUNT)

  return (
    <div className="app">
      <S00_Hero ref={registerRef(0)} />
      <S01_QuickStory ref={registerRef(1)} isActive={currentSection === 1} />
      <S01_DevTransform ref={registerRef(2)} isActive={currentSection === 2} />
      <S02b_WhyPersonalize ref={registerRef(3)} isActive={currentSection === 3} />
      <S02c_ContextEconomy ref={registerRef(4)} isActive={currentSection === 4} />
      {/* <S02_MarketingPain ref={registerRef()} isActive={currentSection === } /> */}
      <S03_Funnel ref={registerRef(5)} isActive={currentSection === 5} />
      <S03b_FunnelQuestions ref={registerRef(6)} isActive={currentSection === 6} />
      <S04_Competitors ref={registerRef(7)} isActive={currentSection === 7} />
      <S05_Surface ref={registerRef(8)} isActive={currentSection === 8} />
      <S06_Audience ref={registerRef(9)} isActive={currentSection === 9} />
      <S09b_JourneyOrchestration ref={registerRef(10)} isActive={currentSection === 10} />
      <S07_Collaboration ref={registerRef(11)} isActive={currentSection === 11} />
      <S08_BriefToCampaign ref={registerRef(12)} isActive={currentSection === 12} />
      <S10_FuturePuck ref={registerRef(13)} isActive={currentSection === 13} />
      <S09_Closing ref={registerRef(14)} isActive={currentSection === 14} />

      <NavigationDots
        current={currentSection}
        total={SECTION_COUNT}
        onNavigate={scrollTo}
      />
    </div>
  )
}
