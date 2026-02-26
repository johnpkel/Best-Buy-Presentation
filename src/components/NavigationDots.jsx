const LABELS = [
  'Title',                  // 0  S00_Hero
  'Quick Story',            // 1  S01_QuickStory
  'Open Loops',             // 2  S01_DevTransform
  'Why Personalize',        // 3  S02b_WhyPersonalize
  'Context Economy',        // 4  S02c_ContextEconomy
  'Identity',               // 5  S06_Audience
  'Activation Gap',         // 6  S03_Funnel
  'Team Questions',         // 7  S03b_FunnelQuestions
  '1P Data Shift',          // 8  S04_Competitors
  'Architecture',           // 9  S05_Surface
  'Journey Orchestration',  // 10 S09b_JourneyOrchestration
  'Brief to Campaign',      // 11 S08_BriefToCampaign
  'Future Puck',            // 12 S10_FuturePuck
  'Closing',                // 13 S09_Closing
]

export default function NavigationDots({ current, total, onNavigate }) {
  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`nav-dot ${i === current ? 'nav-dot--active' : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={LABELS[i] || `Section ${i + 1}`}
          title={LABELS[i] || `Section ${i + 1}`}
        >
          <span className="nav-dot__pip" />
          <span className="nav-dot__label">{LABELS[i]}</span>
        </button>
      ))}
      <div className="nav-counter">{current + 1}/{total}</div>
    </nav>
  )
}
