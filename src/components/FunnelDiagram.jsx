import { useState, useEffect, useCallback, useContext } from 'react'
import { motion } from 'framer-motion'
import { SectionContext } from './Section'
import { FUNNEL_STEPS } from '../data/sparkMoments'

export default function FunnelDiagram() {
  const { fullyRevealed } = useContext(SectionContext)
  const [highlighted, setHighlighted] = useState(false)

  // Reset when section un-reveals
  useEffect(() => {
    if (!fullyRevealed) setHighlighted(false)
  }, [fullyRevealed])

  const advance = useCallback(() => {
    if (!highlighted) {
      setHighlighted(true)
      return true
    }
    return false
  }, [highlighted])

  const retreat = useCallback(() => {
    if (highlighted) {
      setHighlighted(false)
      return true
    }
    return false
  }, [highlighted])

  // Capture-phase listener — only active after Section is fully revealed
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
    <div className="funnel-combo">
      {/* Part 1: The data activation pipeline steps */}
      <div className="funnel-mini">
        {FUNNEL_STEPS.map((step, i) => {
          // Wrap items 2 & 3 (index 1–2) in a "stuck" group
          if (i === 1) {
            return (
              <div
                key="stuck-group"
                className={`funnel-mini__stuck-group${highlighted ? ' funnel-mini__stuck-group--active' : ''}`}
              >
                <motion.span
                  className="funnel-mini__stuck-label"
                  animate={highlighted ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                  transition={highlighted ? { duration: 0.4, ease: 'easeOut' } : { duration: 0 }}
                >
                  This is where most companies get stuck
                </motion.span>
                {FUNNEL_STEPS.slice(1, 3).map((s, j) => (
                  <div
                    key={s.label}
                    className={`funnel-mini__step${highlighted ? ' funnel-mini__step--active' : ''}`}
                  >
                    <span className="funnel-mini__num">{j + 2}</span>
                    <span className="funnel-mini__label">{s.label}</span>
                  </div>
                ))}
              </div>
            )
          }
          if (i === 2) return null // already rendered inside the group
          return (
            <div key={step.label} className="funnel-mini__step">
              <span className="funnel-mini__num">{i + 1}</span>
              <span className="funnel-mini__label">{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
