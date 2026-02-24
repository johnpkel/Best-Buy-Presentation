const LABELS = [
  'Title',
  'Data Paradox',
  'The Trust Gap',
  '7 Pillars / C360',
  '1P Data Shift',
  'Architecture',
  'Identity',
  'Data Paralysis',
  '7 Pillars Roadmap',
  'Context Economy',
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
