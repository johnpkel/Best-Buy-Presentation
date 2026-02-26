import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const line1 = 'Stop Guessing,'.split(' ')
const line2 = 'Start Activating.'.split(' ')

const S00_Hero = forwardRef(function S00_Hero(_, ref) {
  return (
    <section ref={ref} className="section section--hero">
      <div className="hero__content">
        <h1 className="hero__title">
          {line1.map((word, i) => (
            <motion.span
              key={`a-${i}`}
              className="hero__word"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
          <br />
          {line2.map((word, i) => (
            <motion.span
              key={`b-${i}`}
              className="hero__word text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </h1>
        <motion.p
          style={{
            fontSize: '26px',
            color: 'var(--text-secondary)',
            marginBottom: '48px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >

        </motion.p>
        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
})

export default S00_Hero
