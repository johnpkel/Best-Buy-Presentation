import { forwardRef } from 'react'
import FadeIn from '../components/FadeIn'
import Section from '../components/Section'

/* ── Constellation data ─────────────────────────────────────── */
const CX = 300, CY = 160, R = 120

const SIGNALS = [
  { label: 'Behaviors', color: '#a78bfa' },
  { label: 'Purchases', color: '#f59e0b' },
  { label: 'Interactions', color: '#34d399' },
  { label: 'Preferences', color: '#f472b6' },
  { label: 'Content', color: '#fb923c' },
  { label: 'Demographics', color: '#38bdf8' },
  { label: 'Browsing', color: '#818cf8' },
  { label: 'Devices', color: '#22d3ee' },
]

const LABEL_OFFSETS = [
  { dx: 0, dy: -16, anchor: 'middle' },
  { dx: 14, dy: -12, anchor: 'start' },
  { dx: 16, dy: 4, anchor: 'start' },
  { dx: 14, dy: 16, anchor: 'start' },
  { dx: 0, dy: 18, anchor: 'middle' },
  { dx: -14, dy: 16, anchor: 'end' },
  { dx: -16, dy: 4, anchor: 'end' },
  { dx: -14, dy: -12, anchor: 'end' },
]

const POSITIONED = SIGNALS.map((s, i) => {
  const angle = (i * 360 / SIGNALS.length - 90) * Math.PI / 180
  const o = LABEL_OFFSETS[i]
  return {
    ...s,
    x: CX + R * Math.cos(angle),
    y: CY + R * Math.sin(angle),
    lx: CX + R * Math.cos(angle) + o.dx,
    ly: CY + R * Math.sin(angle) + o.dy,
    anchor: o.anchor,
  }
})

/* ── Currency properties ────────────────────────────────────── */
const CURRENCY = [
  {
    title: 'It has value',
    desc: 'Contextual marketing drives 43% higher purchase intent',
    color: '#f59e0b',
  },
  {
    title: "It\u2019s fungible",
    desc: 'Works across every channel \u2014 email, web, ads, SMS, app',
    color: '#818cf8',
  },
  {
    title: "It\u2019s exchangeable",
    desc: 'Shared across teams and systems in real-time',
    color: '#34d399',
  },
  {
    title: 'It buys you things',
    desc: 'Like more customers 🙂',
    color: '#f472b6',
  },
]

/* ── Constellation visual ───────────────────────────────────── */
function ContextConstellation() {
  return (
    <div className="ctx-constellation-wrap">
      <svg className="ctx-constellation" viewBox="0 0 600 320">
        {/* Connecting lines */}
        {POSITIONED.map((s, i) => (
          <line
            key={'l' + i}
            x1={CX} y1={CY} x2={s.x} y2={s.y}
            stroke={s.color} strokeWidth="1" strokeDasharray="4 3"
            className="ctx-constellation__line"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Center rings */}
        <circle cx={CX} cy={CY} r={48}
          fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.15)" strokeWidth="1"
        />
        <circle cx={CX} cy={CY} r={32}
          fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.25)" strokeWidth="1"
          className="ctx-constellation__core"
        />

        {/* Center labels */}
        <text x={CX} y={CY - 4} textAnchor="middle" fill="#818cf8"
          className="ctx-constellation__center-label">
          CONTEXT
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="rgba(129,140,248,0.6)"
          className="ctx-constellation__center-sub">
          unified profile
        </text>

        {/* Signal dots + labels */}
        {POSITIONED.map((s, i) => (
          <g key={'s' + i}>
            <circle cx={s.x} cy={s.y} r={5} fill={s.color} opacity={0.8}
              className="ctx-constellation__dot"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
            <text x={s.lx} y={s.ly} textAnchor={s.anchor} fill={s.color}
              className="ctx-constellation__label">
              {s.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
const S02c_ContextEconomy = forwardRef(function S02c_ContextEconomy({ isActive }, ref) {
  return (
    <Section ref={ref} id="context-economy" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">the foundation</p>
        <h2 className="section__title">The Context Economy</h2>
        <p className="section__subtitle">
          Context isn't a moment in time, or a flash in the pan. It's the
          sum total of an individual within your sphere of influence — and
          it's the most valuable currency you have.
        </p>
      </FadeIn>

      <ContextConstellation />

      {/* Currency properties */}
      <div className="ctx-currency">
        <p className="ctx-currency__heading">Context is currency</p>
        <div className="ctx-currency__grid">
          {CURRENCY.map((c) => (
            <div key={c.title} className="ctx-prop" style={{ borderTopColor: c.color }}>
              <h4 className="ctx-prop__title" style={{ color: c.color }}>{c.title}</h4>
              <p className="ctx-prop__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </Section>
  )
})

export default S02c_ContextEconomy
