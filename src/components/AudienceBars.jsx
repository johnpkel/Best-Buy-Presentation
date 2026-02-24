import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AUDIENCE_TESTS } from '../data/sparkMoments'

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const raw = value.replace(/[^0-9.]/g, '')
    const suffix = value.replace(/[0-9.]/g, '')
    const target = parseFloat(raw)
    const steps = 20
    const stepTime = duration / steps
    let step = 0

    const counter = setInterval(() => {
      step++
      const val = (target * step) / steps
      setDisplay(
        val >= 100
          ? Math.round(val).toLocaleString() + suffix
          : val.toFixed(1) + suffix
      )
      if (step >= steps) {
        clearInterval(counter)
        setDisplay(value)
      }
    }, stepTime)

    return () => clearInterval(counter)
  }, [value, duration])

  return <span>{display}</span>
}

export default function AudienceBars() {
  return (
    <div className="audience-bars">
      <div className="audience-bars__header">
        <span className="audience-bars__tool-badge">
          👤 Identity Resolution
        </span>
        <span className="audience-bars__title">Visitor Identity Breakdown</span>
      </div>
      <div className="audience-bars__tests">
        {AUDIENCE_TESTS.map((test, i) => (
          <motion.div
            key={test.name}
            className="audience-bars__test"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <div className="audience-bars__test-name">{test.name}</div>
            <div className="audience-bars__bar-row">
              <div className="audience-bars__track">
                <motion.div
                  className={`audience-bars__fill audience-bars__fill--${test.status}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${test.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <motion.span
                className="audience-bars__size"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3 }}
              >
                <AnimatedNumber value={test.size} />
              </motion.span>
            </div>
            <div className="audience-bars__meta">
              <span>{test.metric}</span>
              {test.frequency && <span>Frequency: {test.frequency}</span>}
            </div>
            <div className={`audience-bars__note audience-bars__note--${test.status}`}>
              {test.status === 'success' ? '✓' : '⚠'} {test.note}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
