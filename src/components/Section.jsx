import { forwardRef, createContext, useState, useEffect, useCallback, Children } from 'react'
import { motion } from 'framer-motion'

export const SectionContext = createContext({ isActive: false, fullyRevealed: false })

const Section = forwardRef(function Section({ id, className = '', dark, isActive = false, children }, ref) {
  const childArray = Children.toArray(children)
  const childCount = childArray.length
  const [revealedCount, setRevealedCount] = useState(0)
  const fullyRevealed = revealedCount >= childCount

  // Show first child immediately when entering; hide all when leaving
  useEffect(() => {
    setRevealedCount(isActive ? 1 : 0)
  }, [isActive])

  const advance = useCallback(() => {
    if (revealedCount < childCount) {
      setRevealedCount(c => c + 1)
      return true
    }
    return false
  }, [revealedCount, childCount])

  const retreat = useCallback(() => {
    if (revealedCount > 1) {
      setRevealedCount(c => c - 1)
      return true
    }
    return false
  }, [revealedCount])

  // Capture-phase listener intercepts before the global scroll handler
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

    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [isActive, advance, retreat])

  return (
    <section
      ref={ref}
      id={id}
      className={`section ${dark ? 'section--dark' : ''} ${className}`}
    >
      <SectionContext.Provider value={{ isActive, fullyRevealed }}>
        <div className="section__inner">
          {childArray.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={
                i < revealedCount
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={
                i < revealedCount
                  ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.3, ease: 'easeIn' }
              }
            >
              {child}
            </motion.div>
          ))}
        </div>
      </SectionContext.Provider>
    </section>
  )
})

export default Section
