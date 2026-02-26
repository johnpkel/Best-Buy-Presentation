import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'

/* ── Psychology principles ──────────────────────────────────── */
const PRINCIPLES = [
  {
    num: '01',
    title: 'The Endowment Effect',
    hook: '"It\'s already mine"',
    body: 'Tailored offers and loyalty rewards create psychological ownership — the product belongs to them before they even buy it. Loss aversion makes it 2\u2013\u00D73 harder to let go than to never have had it.',
    color: '#f59e0b',
  },
  {
    num: '02',
    title: 'Reciprocity',
    hook: '"Give value, get value back"',
    body: 'When customers receive genuine value — a relevant offer, useful content, a personalized experience — they reciprocate with time, money, positive reviews, word-of-mouth, and referrals.',
    color: '#818cf8',
  },
  {
    num: '03',
    title: 'Belonging',
    hook: '"They actually know me"',
    body: 'Personalized experiences make customers feel known — triggering identity-level loyalty that transcends price competition. They become advocates, not just buyers.',
    color: '#34d399',
  },
]

/* ── Bottom-line stats ──────────────────────────────────────── */
const STATS = [
  { value: '80%', label: 'more likely to purchase with personalized experiences', color: '#f59e0b' },
  { value: '50%', label: 'reduction in customer acquisition costs', color: '#818cf8' },
  { value: '5\u201315%', label: 'revenue lift from personalization', color: '#22c55e' },
]

/* ── Section ────────────────────────────────────────────────── */
const S02b_WhyPersonalize = forwardRef(function S02b_WhyPersonalize({ isActive }, ref) {
  return (
    <Section ref={ref} id="why-personalize" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">the psychology</p>
        <h2 className="section__title">Why Personalize?</h2>
        <p className="section__subtitle">
          Personalization isn't just good UX — it activates deep psychological
          drivers that turn browsers into buyers and buyers into advocates.
        </p>
      </FadeIn>

      {/* Three principle cards */}
      <div className="wp-principles">
        {PRINCIPLES.map((p) => (
          <div key={p.num} className="wp-card" style={{ borderTopColor: p.color }}>
            <div className="wp-card__header">
              <span className="wp-card__num" style={{ color: p.color }}>{p.num}</span>
              <h3 className="wp-card__title">{p.title}</h3>
            </div>
            <p className="wp-card__hook" style={{ color: p.color }}>{p.hook}</p>
            <p className="wp-card__body">{p.body}</p>
            <div className="wp-card__stat">
              <span className="wp-card__stat-value" style={{ color: p.color }}>{p.stat}</span>
              <span className="wp-card__stat-note">{p.statNote}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cycle note */}
      <div className="wp-cycle-note">
        <span className="wp-cycle-note__arrow">{'\u21BB'}</span>
        These create a self-reinforcing cycle — each interaction deepens the next
      </div>

      {/* Bottom stats */}
      <div className="wp-stats">
        {STATS.map((s) => (
          <div key={s.value} className="wp-stat">
            <span className="wp-stat__value" style={{ color: s.color }}>{s.value}</span>
            <span className="wp-stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  )
})

export default S02b_WhyPersonalize
