import { useState, useEffect, useCallback, useContext } from 'react'
import { motion } from 'framer-motion'
import { SectionContext } from './Section'

const STEPS = [
  { label: 'Collect', sub: 'Events & Attributes', abbr: '📥', color: '#6366f1' },
  { label: 'Unify', sub: 'Identity Resolution', abbr: '🔗', color: '#3b82f6' },
  { label: 'Score', sub: 'AI Segmentation', abbr: '🧠', color: '#0d9488' },
  { label: 'Activate', sub: 'Real-Time Delivery', abbr: '⚡', color: '#059669' },
  { label: 'Personalize', sub: 'Adaptive Experiences', abbr: '🎯', color: '#22c55e' },
  { label: 'Measure', sub: 'Close the Loop', abbr: '📊', color: '#f59e0b' },
  { label: 'Learn', sub: 'Feed Back Insights', abbr: '🔄', color: '#7c3aed' },
]

// Total internal steps: 7 pipeline steps + 1 loop-back = 8
const TOTAL_STEPS = STEPS.length + 1

export default function CampaignLoop() {
  const { fullyRevealed } = useContext(SectionContext)
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    if (!fullyRevealed) setRevealedCount(0)
  }, [fullyRevealed])

  const advance = useCallback(() => {
    if (revealedCount < TOTAL_STEPS) {
      setRevealedCount(c => c + 1)
      return true
    }
    return false
  }, [revealedCount])

  const retreat = useCallback(() => {
    if (revealedCount > 0) {
      setRevealedCount(c => c - 1)
      return true
    }
    return false
  }, [revealedCount])

  useEffect(() => {
    if (!fullyRevealed) return

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

    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [fullyRevealed, advance, retreat])

  return (
    <div className="campaign-pipeline">
      {/* Steps row */}
      <div className="campaign-pipeline__row">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            className="campaign-pipeline__step"
            animate={
              i < revealedCount
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            initial={{ opacity: 0, y: 16 }}
            transition={
              i < revealedCount
                ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.2 }
            }
          >
            <div
              className="campaign-pipeline__icon"
              style={{ background: step.color }}
            >
              {step.abbr}
            </div>
            <span className="campaign-pipeline__label">{step.label}</span>
            <span className="campaign-pipeline__sub">{step.sub}</span>

            {i < STEPS.length - 1 && (
              <span
                className="campaign-pipeline__arrow"
                style={{ opacity: i + 1 < revealedCount ? 0.4 : 0 }}
              >
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* U-shaped loop-back — reveals as the last step */}
      <motion.div
        className="campaign-pipeline__loop"
        animate={
          revealedCount >= TOTAL_STEPS
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        initial={{ opacity: 0 }}
        transition={
          revealedCount >= TOTAL_STEPS
            ? { duration: 0.5, ease: 'easeOut' }
            : { duration: 0.2 }
        }
      >
        <svg
          className="campaign-pipeline__loop-svg"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <defs>
            <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="0"
              markerWidth="8" markerHeight="8" orient="0">
              <path d="M 0 10 L 5 0 L 10 10" fill="none" stroke="#818cf8" strokeWidth="2" />
            </marker>
          </defs>
          <line x1="965" y1="0" x2="965" y2="30"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <line x1="965" y1="30" x2="35" y2="30"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <line x1="35" y1="30" x2="35" y2="2"
            stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.5"
            markerEnd="url(#arrowUp)" />
        </svg>
        <span className="campaign-pipeline__loop-label">
          learnings feed back into collection — the activation loop
        </span>
      </motion.div>
    </div>
  )
}
