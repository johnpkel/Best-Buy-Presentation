import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  7-step animated architecture walkthrough over the base image.
  Right-arrow advances steps 1→7, then lets the section advance.
  Left-arrow reverses. Steps 1-4 = arrows, steps 5-7 = boxes.

  viewBox coordinates are mapped to the base image layout
  (Contentstack Data & Insights pipeline diagram, ~1560×850 aspect).

  The annotations match the "end" reference image exactly:

  1  Arrow:  Streaming sources   →  Event Collection API  (diagonal ↘)
  2  Arrow:  Cloud Connect       →  Data Warehouse (AWS)  (diagonal ↘)
  3  Arrow:  Attribute Coll. API →  Identity Resolution   (straight ↓)
  4  Arrow:  Identity Resolution →  through to Activation (long →)
  5  Box:    Personalize   (DXP column)
  6  Box:    Flows          (DXP column)
  7  Box:    Recommendations (DXP column)
*/

const STEP_LABELS = [
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
  // 1: Streaming sources (left) → Event Collection API (diagonal ↘)
  {
    type: 'arrow',
    from: [96, 130],
    to: [152, 175],
    numPos: [75, 82],
  },
  // 2: Cloud Connect → Data Warehouse (diagonal ↘)
  {
    type: 'arrow',
    from: [375, 275],
    to: [445, 345],
    numPos: [430, 330],
  },
  // 3: Attribute Collection API → Identity Resolution (straight ↓)
  {
    type: 'arrow',
    from: [366, 115],
    to: [366, 170],
    numPos: [440, 70],
  },
  // 4: Identity Resolution → AI Scoring → Activation (long →)
  {
    type: 'arrow',
    from: [390, 186],
    to: [580, 186],
    numPos: [420, 155],
  },
  // 5: Box around "Personalize" in DXP column
  {
    type: 'box',
    rect: [632, 115, 95, 30],
    numPos: [740, 110],
  },
  // 6: Box around "Flows (Journey Orchestration)"
  {
    type: 'box',
    rect: [632, 150, 95, 30],
    numPos: [740, 145],
  },
  // 7: Box around "Recommendations"
  {
    type: 'box',
    rect: [632, 185, 95, 30],
    numPos: [740, 180],
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
        fill="white" fontSize="10" fontWeight="800"
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
        fill="white" fontSize="10" fontWeight="800"
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
  const [currentStep, setCurrentStep] = useState(0) // 0 = clean, 1-7 = visible

  // Reset on leaving the slide
  useEffect(() => {
    if (!isActive) setCurrentStep(0)
  }, [isActive])

  const advance = useCallback(() => {
    if (currentStep < 7) {
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
  useEffect(() => {
    if (!isActive) return

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
  }, [isActive, advance, retreat])

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
          {currentStep > 0 && currentStep <= 7 ? (
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

        <p className="arch-slide__counter">{currentStep} / 7</p>
      </div>
    </div>
  )
}
