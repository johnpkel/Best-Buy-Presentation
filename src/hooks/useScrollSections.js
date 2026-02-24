import { useState, useEffect, useCallback, useRef } from 'react'

export default function useScrollSections(sectionCount) {
  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = useRef([])
  const isSnapping = useRef(false)

  const registerRef = useCallback((index) => (el) => {
    sectionRefs.current[index] = el
  }, [])

  // Track which section is most visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const idx = sectionRefs.current.indexOf(entry.target)
            if (idx !== -1) setCurrentSection(idx)
          }
        })
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionCount])

  // Keyboard navigation
  const scrollTo = useCallback((index) => {
    const el = sectionRefs.current[index]
    if (!el || isSnapping.current) return
    isSnapping.current = true
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { isSnapping.current = false }, 800)
  }, [])

  useEffect(() => {
    const nextKeys = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
    const prevKeys = ['ArrowUp', 'ArrowLeft', 'PageUp', 'Backspace']

    const handleKey = (e) => {
      if (nextKeys.includes(e.key)) {
        e.preventDefault()
        const next = Math.min(currentSection + 1, sectionCount - 1)
        setCurrentSection(next)
        scrollTo(next)
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault()
        const prev = Math.max(currentSection - 1, 0)
        setCurrentSection(prev)
        scrollTo(prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSection, sectionCount, scrollTo])

  return { currentSection, registerRef, scrollTo }
}
