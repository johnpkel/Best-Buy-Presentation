import { forwardRef, useState, useEffect, useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section, { SectionContext } from '../components/Section'

/* ── Tree data ──────────────────────────────────────────────── */
const TREE = [
  {
    type: 'node', id: 'trigger', icon: '⚡',
    label: 'Behavioral Trigger',
    detail: 'Cart abandonment · intent score 87 · 4 pages browsed',
    color: '#f59e0b',
  },
  {
    type: 'node', id: 'resolve', icon: '◆',
    label: 'Identity Resolution',
    detail: 'Unified profile from 12+ sources in <200ms',
    color: '#818cf8',
  },
  {
    type: 'fork', id: 'fork1',
    decision: 'Email known?', color: '#a78bfa',
    left: {
      cond: 'YES', sub: 'Known customer',
      items: [
        { name: 'Email', detail: 'Personalized offer · +1h', color: '#818cf8' },
        { name: 'SMS', detail: 'Cart reminder · +4h', color: '#fbbf24' },
      ],
    },
    right: {
      cond: 'NO', sub: 'Anonymous visitor',
      items: [
        { name: 'Web', detail: 'Exit-intent modal · Instant', color: '#34d399' },
        { name: 'Ads', detail: 'Retarget · Real-time', color: '#38bdf8' },
      ],
    },
  },
  {
    type: 'node', id: 'signal', icon: '↻',
    label: 'Signal Feedback',
    detail: 'Engagement captured → profile updates instantly',
    color: '#34d399', feedback: true,
  },
  {
    type: 'fork', id: 'fork2',
    decision: 'Converted?', color: '#a78bfa',
    left: {
      cond: 'YES', sub: 'Purchase detected',
      items: [
        { name: 'Suppress ads', detail: 'Stop retargeting', color: '#22c55e' },
        { name: 'Loyalty flow', detail: 'Post-purchase nurture', color: '#22c55e' },
      ],
    },
    right: {
      cond: 'NO', sub: 'Still browsing',
      items: [
        { name: 'SMS', detail: 'Free mounting offer', color: '#f472b6' },
        { name: 'Push', detail: 'Low-stock alert · +24h', color: '#f59e0b' },
      ],
    },
  },
  {
    type: 'node', id: 'continue', icon: '→',
    label: 'Journey Continues',
    detail: 'Loop restarts — every signal sharpens the next action',
    color: '#818cf8',
  },
]

/* ── SVG fork connectors ────────────────────────────────────── */
const SVG_STROKE = 'rgba(255,255,255,0.06)'
const SVG_STROKE_ACTIVE = 'rgba(99,102,241,0.35)'

function ForkDown({ active }) {
  return (
    <svg className="jo-tree-svg" viewBox="0 0 100 14" preserveAspectRatio="none">
      <path
        d="M50 0 V5 M25 5 H75 M25 5 V14 M75 5 V14"
        stroke={active ? SVG_STROKE_ACTIVE : SVG_STROKE}
        strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none"
      />
    </svg>
  )
}

function MergeUp({ active }) {
  return (
    <svg className="jo-tree-svg" viewBox="0 0 100 14" preserveAspectRatio="none">
      <path
        d="M25 0 V9 M75 0 V9 M25 9 H75 M50 9 V14"
        stroke={active ? SVG_STROKE_ACTIVE : SVG_STROKE}
        strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none"
      />
    </svg>
  )
}

/* ── Interactive journey flow ───────────────────────────────── */
function JourneyFlow() {
  const { isActive, fullyRevealed } = useContext(SectionContext)
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)

  useEffect(() => { stepRef.current = step }, [step])

  useEffect(() => {
    if (!isActive || !fullyRevealed) {
      setStep(0)
      stepRef.current = 0
    }
  }, [isActive, fullyRevealed])

  useEffect(() => {
    if (!isActive || !fullyRevealed) return

    const handleKey = (e) => {
      const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
      const prevKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']

      if (nextKeys.includes(e.key) && stepRef.current < TREE.length - 1) {
        stepRef.current += 1
        setStep(stepRef.current)
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      } else if (prevKeys.includes(e.key) && stepRef.current > 0) {
        stepRef.current -= 1
        setStep(stepRef.current)
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [isActive, fullyRevealed])

  return (
    <div className="jo-flow jo-flow--tree">
      {TREE.map((item, i) => {
        const reached = i <= step
        const isCurrent = i === step
        const cls =
          'jo-tree-item' +
          (reached ? ' jo-tree-item--reached' : '') +
          (isCurrent ? ' jo-tree-item--active' : '')

        return (
          <div key={item.id}>
            <div className={cls}>
              {item.type === 'node' ? (
                /* ── Linear node (centered) ─────────────── */
                <>
                  <div className="jo-node">
                    <div
                      className="jo-node__dot"
                      style={{
                        borderColor: item.color,
                        ...(isCurrent && {
                          background: item.color + '26',
                          boxShadow: '0 0 20px ' + item.color + '4D',
                        }),
                        ...(i < step && { background: item.color + '1A' }),
                      }}
                    >
                      {item.icon}
                    </div>
                    <span className="jo-node__label">{item.label}</span>
                    <span className="jo-node__detail">{item.detail}</span>
                  </div>
                  {item.feedback && (
                    <motion.div
                      className="jo-feedback-badge"
                      animate={reached ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="jo-feedback-badge__icon">↻</span>
                      Signals feed back into decision engine
                    </motion.div>
                  )}
                </>
              ) : (
                /* ── Fork (decision + branches) ─────────── */
                <>
                  <div className="jo-decision">
                    <div
                      className="jo-decision__shape"
                      style={{
                        borderColor: item.color,
                        ...(isCurrent && {
                          background: item.color + '26',
                          boxShadow: '0 0 20px ' + item.color + '4D',
                        }),
                        ...(i < step && { background: item.color + '1A' }),
                      }}
                    >
                      <span>◇</span>
                    </div>
                    <span className="jo-decision__label">{item.decision}</span>
                  </div>

                  <ForkDown active={reached} />

                  <div className="jo-branches">
                    {[item.left, item.right].map((branch, bi) => (
                      <motion.div
                        key={branch.cond}
                        className="jo-branch"
                        animate={reached ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 6 }}
                        transition={{ delay: reached ? bi * 0.1 : 0, duration: 0.35 }}
                      >
                        <span
                          className={
                            'jo-branch__cond' +
                            (branch.cond === 'YES'
                              ? ' jo-branch__cond--yes'
                              : ' jo-branch__cond--no')
                          }
                        >
                          {branch.cond}
                        </span>
                        <span className="jo-branch__sub">{branch.sub}</span>
                        {branch.items.map((ch) => (
                          <div
                            key={ch.name}
                            className="jo-branch__chip"
                            style={{
                              background: ch.color + '14',
                              borderColor: ch.color + '40',
                            }}
                          >
                            <span style={{ color: ch.color }}>{ch.name}</span>
                            <span className="jo-branch__chip-detail">
                              {ch.detail}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>

                  <MergeUp active={reached} />
                </>
              )}
            </div>

            {/* Connector between tree items */}
            {i < TREE.length - 1 && (
              <div className="jo-tree-conn-wrap">
                <div
                  className={
                    'jo-tree-conn' +
                    (i < step ? ' jo-tree-conn--active' : '')
                  }
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
const S09b_JourneyOrchestration = forwardRef(
  function S09b_JourneyOrchestration({ isActive }, ref) {
    return (
      <Section ref={ref} id="journey-orchestration" dark isActive={isActive}>
        <FadeIn>
          <p className="section__label">Contentstack Flows</p>
          <h2 className="section__title">
            Omni-Channel Journey Orchestration
          </h2>
          <p className="section__subtitle">
            Real-time customer journeys that adapt across every touchpoint —
            powered by unified profiles and cross-channel behavioral signals.
          </p>
        </FadeIn>

        <JourneyFlow />
      </Section>
    )
  }
)

export default S09b_JourneyOrchestration
