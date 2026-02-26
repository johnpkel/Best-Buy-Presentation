import { useState, useEffect, useCallback, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionContext } from './Section'

/*
  8-step animated architecture walkthrough over the base image.
  Right-arrow advances steps 1→8, then lets the section advance.
  Left-arrow reverses. Step 1 = center box, steps 2-5 = arrows, steps 6-8 = boxes.

  viewBox coordinates are mapped to the base image layout
  (Contentstack Data & Insights pipeline diagram, ~1560×850 aspect).

  1  Box:    Center overview box (middle of diagram)
  2  Arrow:  Streaming sources   →  Event Collection API  (diagonal ↘)
  3  Arrow:  Cloud Connect       →  Data Warehouse (AWS)  (diagonal ↘)
  4  Arrow:  Attribute Coll. API →  Identity Resolution   (straight ↓)
  5  Arrow:  Identity Resolution →  through to Activation (long →)
  6  Box:    Personalize   (DXP column)
  7  Box:    Flows          (DXP column)
  8  Box:    Recommendations (DXP column)
*/

const STEP_LABELS = [
  'The Contentstack Data & Insights architecture — a unified pipeline from ingestion to activation',
  'Streaming data sources (SDKs, webhooks, APIs) feed the Event Collection API in real-time',
  'Cloud Connect syncs data bidirectionally with your Data Warehouse',
  'The Attribute Collection API routes enrichment data into Identity Resolution',
  'Identity Resolution powers AI Scoring, Segmentation, and Activation across the full pipeline',
  'Personalize: real-time experience variants delivered to every channel',
  'Flows: Journey Orchestration for automated, multi-step customer journeys',
  'Recommendations: AI-powered content and product suggestions',
]

// ── Coordinate definitions ──────────────────────────────────────
// viewBox = "0 0 1000 528" (matches image aspect ratio 3500×1847)
// preserveAspectRatio = "none" so SVG stretches to fill the <img>
//
// Key landmarks (viewBox coords, converted from pixel positions):
//   Streaming box center:  x≈66,  y≈129
//   Event Collection API:  x≈164, y≈186
//   Streams:               x≈233, y≈186
//   Event Mapping:         x≈297, y≈186
//   Identity Resolution:   x≈366, y≈186
//   AI Scoring Engine:     x≈434, y≈186
//   Segmentation:          x≈497, y≈186
//   Activation:            x≈571, y≈186
//   Attribute Coll. API:   x≈366, y≈97
//   Cloud Connect:         x≈366, y≈260
//   Data Warehouse:        x≈466, y≈369
//   DXP Personalize:       x≈677, y≈130
//   DXP Flows:             x≈677, y≈163
//   DXP Recommendations:   x≈677, y≈193
//   DXP Triggers:          x≈677, y≈219

const STEPS = [
  // 1: Center overview box (middle of diagram)
  {
    type: 'box',
    rect: [410, 215, 55, 55],
    numPos: [400, 280],
  },
  // 2: Streaming sources (left) → Event Collection API (diagonal ↘)
  {
    type: 'arrow',
    from: [120, 130],
    to: [400, 220],
    numPos: [130, 100],
  },
  // 3: Cloud Connect → Data Warehouse (diagonal ↘)
  {
    type: 'arrow',
    from: [520, 430],
    to: [465, 285],
    numPos: [485, 415],
  },
  // 4: Attribute Collection API → Identity Resolution (straight ↓)
  {
    type: 'arrow',
    from: [510, 70],
    to: [460, 200],
    numPos: [540, 70],
  },
  // 5: Identity Resolution → AI Scoring → Activation (long →)
  {
    type: 'arrow',
    from: [470, 220],
    to: [700, 205],
    numPos: [660, 145],
  },
  // 6: Box around "Personalize" in DXP column
  {
    type: 'box',
    rect: [760, 165, 95, 30],
    numPos: [740, 175],
  },
  // 7: Box around "Flows (Journey Orchestration)"
  {
    type: 'box',
    rect: [760, 201, 95, 30],
    numPos: [740, 215],
  },
  // 8: Box around "Recommendations"
  {
    type: 'box',
    rect: [760, 235, 95, 30],
    numPos: [740, 250],
  },
]

// ── Sub-components ──────────────────────────────────────────────

function ArrowOverlay({ step, index }) {
  const [sx, sy] = step.from
  const [ex, ey] = step.to
  const [nx, ny] = step.numPos

  // Arrowhead geometry
  const angle = Math.atan2(ey - sy, ex - sx)
  const hl = 10 // head length in viewBox units
  const ax1 = ex - hl * Math.cos(angle - Math.PI / 6)
  const ay1 = ey - hl * Math.sin(angle - Math.PI / 6)
  const ax2 = ex - hl * Math.cos(angle + Math.PI / 6)
  const ay2 = ey - hl * Math.sin(angle + Math.PI / 6)

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow line */}
      <motion.line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke="#e11d48" strokeWidth="6" strokeLinecap="round" opacity="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      {/* Main shaft */}
      <motion.line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      {/* Arrowhead */}
      <motion.polygon
        points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`}
        fill="#e11d48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.12 }}
      />
      {/* Number badge */}
      <motion.circle
        cx={nx} cy={ny} r="12"
        fill="#e11d48"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 400, damping: 14 }}
      />
      <motion.text
        x={nx} y={ny + 1}
        textAnchor="middle" dominantBaseline="central"
        fill="white" fontSize="16" fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        {index + 1}.
      </motion.text>
    </motion.g>
  )
}

function BoxOverlay({ step, index }) {
  const [rx, ry, rw, rh] = step.rect
  const [nx, ny] = step.numPos

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer glow */}
      <motion.rect
        x={rx - 3} y={ry - 3} width={rw + 6} height={rh + 6}
        fill="none" stroke="#e11d48" strokeWidth="6" rx="8" opacity="0.15"
        initial={{ opacity: 0 }} animate={{ opacity: 0.15 }}
        transition={{ duration: 0.25 }}
      />
      {/* Main box */}
      <motion.rect
        x={rx} y={ry} width={rw} height={rh}
        fill="rgba(225,29,72,0.06)" stroke="#e11d48" strokeWidth="2.5" rx="5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Number badge */}
      <motion.circle
        cx={nx} cy={ny} r="12"
        fill="#e11d48"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 400, damping: 14 }}
      />
      <motion.text
        x={nx} y={ny + 1}
        textAnchor="middle" dominantBaseline="central"
        fill="white" fontSize="16" fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        {index + 1}.
      </motion.text>
    </motion.g>
  )
}

// ── Main component ──────────────────────────────────────────────

export default function ArchitectureSlide({ isActive }) {
  const { fullyRevealed } = useContext(SectionContext)
  const [currentStep, setCurrentStep] = useState(0) // 0 = clean, 1-8 = visible

  // Reset when leaving slide or when section un-reveals this child
  useEffect(() => {
    if (!isActive || !fullyRevealed) setCurrentStep(0)
  }, [isActive, fullyRevealed])

  const advance = useCallback(() => {
    if (currentStep < 8) {
      setCurrentStep((s) => s + 1)
      return true           // consumed — block section advance
    }
    return false             // done — let the section advance
  }, [currentStep])

  const retreat = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      return true
    }
    return false
  }, [currentStep])

  // Capture-phase listener fires BEFORE the global scroll handler
  // Only active after Section has fully revealed all children
  useEffect(() => {
    if (!isActive || !fullyRevealed) return

    const handleKey = (e) => {
      const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
      const prevKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']

      if (nextKeys.includes(e.key)) {
        if (advance()) {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
        }
      } else if (prevKeys.includes(e.key)) {
        if (retreat()) {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
        }
      }
    }

    window.addEventListener('keydown', handleKey, true)   // true = capture
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [isActive, fullyRevealed, advance, retreat])

  return (
    <div className="arch-slide">
      <div className="arch-slide__image-wrapper">
        <img
          src="/architecture.png"
          alt="Contentstack Data & Insights Architecture"
          className="arch-slide__image"
          draggable={false}
        />

        <svg
          className="arch-slide__overlay"
          viewBox="0 0 1000 528"
          preserveAspectRatio="none"
        >
          <AnimatePresence>
            {STEPS.slice(0, currentStep).map((step, i) =>
              step.type === 'arrow'
                ? <ArrowOverlay key={`s${i}`} step={step} index={i} />
                : <BoxOverlay   key={`s${i}`} step={step} index={i} />
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Step indicator bar */}
      <div className="arch-slide__controls">
        <div className="arch-slide__step-dots">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`arch-slide__dot${
                i < currentStep ? ' arch-slide__dot--done' : ''
              }${i === currentStep ? ' arch-slide__dot--next' : ''}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentStep > 0 && currentStep <= 8 ? (
            <motion.p
              key={currentStep}
              className="arch-slide__label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="arch-slide__label-num">{currentStep}.</span>{' '}
              {STEP_LABELS[currentStep - 1]}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              className="arch-slide__hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Press <kbd>→</kbd> to walk through the architecture
            </motion.p>
          )}
        </AnimatePresence>

        <p className="arch-slide__counter">{currentStep} / 8</p>
      </div>
    </div>
  )
}
