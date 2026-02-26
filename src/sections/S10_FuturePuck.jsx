import { forwardRef, useState, useEffect, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section, { SectionContext } from '../components/Section'

/* ═══════════════════════════════════════════════════════════════
   Subsection 1 — Bandit Math
   ═══════════════════════════════════════════════════════════════ */
function BanditMath() {
  return (
    <div className="bandit">
      <div className="puck-sub">
        <span className="puck-sub__num">01</span>
        <h3 className="puck-sub__title">Bandit Math</h3>
      </div>

      <p className="bandit__intro">
        AI isn't great at defining goals — but it excels at using{' '}
        <strong className="text-glow">context</strong>. The multi-armed bandit
        is a gold-standard experimentation technique, but it assumes all
        profiles are the same. It's missing context.
      </p>

      {/* Two profiles */}
      <div className="bandit__profiles">
        <div className="bandit__profile">
          <div
            className="bandit__avatar"
            style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)' }}
          >
            S
          </div>
          <div className="bandit__profile-info">
            <span className="bandit__name">Sally</span>
            <span className="bandit__desc">
              25, single, healthy — no medical history
            </span>
          </div>
        </div>
        <div className="bandit__profile">
          <div
            className="bandit__avatar"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
          >
            J
          </div>
          <div className="bandit__profile-info">
            <span className="bandit__name">John</span>
            <span className="bandit__desc">
              60, married, grandchildren — chronic conditions
            </span>
          </div>
        </div>
      </div>

      {/* Comparison cards */}
      <div className="bandit__compare">
        <div className="bandit__card bandit__card--vanilla">
          <h4 className="bandit__card-title">Vanilla MAB</h4>
          <p>
            Learns <strong>one</strong> subject line that is "best for everyone"
          </p>
          <p>
            Sally and John are sent the <strong>same</strong> message, despite
            obvious differences
          </p>
          <span className="bandit__verdict bandit__verdict--warn">
            Missing context
          </span>
        </div>
        <div className="bandit__card bandit__card--cmab">
          <h4 className="bandit__card-title">Contextual MAB</h4>
          <p>
            Learns <strong>different</strong> optimal lines for different people
          </p>
          <p>
            Sally gets what's best for her, John gets what's best for him
          </p>
          <span className="bandit__verdict bandit__verdict--good">
            Profile-aware
          </span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Subsection 2 — Embed All The Things
   ═══════════════════════════════════════════════════════════════ */
const CLUSTERS = [
  {
    name: 'Products', color: '#818cf8', cx: 100, cy: 70,
    dots: [[82,52],[118,62],[92,82],[128,48],[72,68],[108,58],[88,78]],
  },
  {
    name: 'Behaviors', color: '#34d399', cx: 390, cy: 70,
    dots: [[378,52],[408,68],[388,85],[398,48],[368,72],[382,60],[402,78]],
  },
  {
    name: 'Content', color: '#f472b6', cx: 105, cy: 205,
    dots: [[88,192],[118,202],[98,218],[132,190],[78,208],[112,198],[94,214]],
  },
  {
    name: 'Profiles', color: '#f59e0b', cx: 385, cy: 205,
    dots: [[372,192],[402,202],[382,218],[392,190],[362,208],[388,198],[378,214]],
  },
]

const QUERY = { x: 245, y: 138 }
const NEIGHBORS = [
  { x: 128, y: 48, color: '#818cf8' },
  { x: 398, y: 48, color: '#34d399' },
  { x: 132, y: 190, color: '#f472b6' },
  { x: 392, y: 190, color: '#f59e0b' },
]

function EmbedVisual() {
  return (
    <div className="embed">
      <div className="puck-sub">
        <span className="puck-sub__num">02</span>
        <h3 className="puck-sub__title">
          Embed{' '}
          <span className="embed__meme">ALL THE THINGS</span>
        </h3>
      </div>

      <p className="embed__intro">
        Vector embeddings map every product, profile, behavior, and piece of
        content into a shared mathematical space — similar things cluster
        together, enabling real-time similarity search across any dimension.
      </p>

      <div className="embed__plot-wrap">
        <svg className="embed__plot" viewBox="0 0 490 265">
          {/* Cluster halos */}
          {CLUSTERS.map((c) => (
            <circle
              key={c.name + '-bg'}
              cx={c.cx} cy={c.cy} r={48}
              fill={c.color + '08'} stroke={c.color + '18'} strokeWidth="1"
            />
          ))}

          {/* Nearest-neighbor lines */}
          {NEIGHBORS.map((n, i) => (
            <line
              key={'nn' + i}
              x1={QUERY.x} y1={QUERY.y} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth="1" strokeDasharray="4 3"
              className="embed__nn-line"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}

          {/* Dots */}
          {CLUSTERS.map((c) =>
            c.dots.map((d, j) => (
              <circle
                key={c.name + j}
                cx={d[0]} cy={d[1]} r={4}
                fill={c.color} opacity={0.6}
                className="embed__dot"
                style={{ animationDelay: `${j * 0.35}s` }}
              />
            ))
          )}

          {/* Cluster labels */}
          {CLUSTERS.map((c) => (
            <text
              key={c.name + '-lbl'}
              x={c.cx} y={c.cy + 58}
              textAnchor="middle" fill={c.color}
              className="embed__cluster-label"
            >
              {c.name}
            </text>
          ))}

          {/* Query point */}
          <circle
            cx={QUERY.x} cy={QUERY.y} r={7}
            fill="none" stroke="#fff" strokeWidth="2"
            className="embed__query"
          />
          <circle cx={QUERY.x} cy={QUERY.y} r={3} fill="#fff" />
          <text
            x={QUERY.x} y={QUERY.y - 14}
            textAnchor="middle" fill="#fff"
            className="embed__query-label"
          >
            Similarity Search
          </text>
        </svg>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Subsection stepper (swaps between Bandit / Embed on arrow)
   ═══════════════════════════════════════════════════════════════ */
const SUBS = [<BanditMath />, <EmbedVisual />]

function SubsectionStepper() {
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

      if (nextKeys.includes(e.key) && stepRef.current < SUBS.length - 1) {
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
    <div className="puck-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {SUBS[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Section
   ═══════════════════════════════════════════════════════════════ */
const S10_FuturePuck = forwardRef(function S10_FuturePuck({ isActive }, ref) {
  return (
    <Section ref={ref} id="future-puck" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">what's next</p>
        <h2 className="section__title">Move to where the puck will be</h2>
        <p className="section__subtitle">
          Two capabilities that separate the next generation from the current one.
        </p>
      </FadeIn>

      <SubsectionStepper />
    </Section>
  )
})

export default S10_FuturePuck
