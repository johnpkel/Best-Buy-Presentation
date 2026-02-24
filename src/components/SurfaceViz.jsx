import { motion } from 'framer-motion'

const CONTEXT_SOURCES = [
  { name: 'Event Collection', abbr: 'EC', color: '#6366f1', x: -320, y: -40 },
  { name: 'Cloud Connect', abbr: 'CC', color: '#0d9488', x: -320, y: 60 },
  { name: 'Personalize', abbr: 'PZ', color: '#ea580c', x: 320, y: -40 },
  { name: 'Recommendations', abbr: 'RC', color: '#059669', x: 320, y: 60 },
]

export default function SurfaceViz() {
  return (
    <div className="surface-viz">
      {/* Intent at top */}
      <motion.div
        className="surface-viz__intent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="surface-viz__intent-label">Contentstack Data & Insights</span>
        <span className="surface-viz__intent-text">
          "Activate first-party data in real-time across every touchpoint"
        </span>
      </motion.div>

      {/* Central activation engine card */}
      <motion.div
        className="surface-viz__surface"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="surface-viz__surface-header">
          <span className="surface-viz__spark">◆</span>
          Data Activation Layer (DAL)
        </div>
        <div className="surface-viz__surface-body">
          <div className="surface-viz__row">
            <span className="surface-viz__label">Event Pipeline</span>
            <span className="surface-viz__value">Streams → Event Mapping → Identity Resolution</span>
          </div>
          <div className="surface-viz__row">
            <span className="surface-viz__label">Profile Pipeline</span>
            <span className="surface-viz__value">AI Scoring → Segmentation → Activation</span>
          </div>
          <div className="surface-viz__row surface-viz__row--highlight">
            <span className="surface-viz__label">DXP Delivery</span>
            <span className="surface-viz__value">Personalize, Flows, Recommendations → Web, Mobile, All Channels</span>
          </div>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="surface-viz__lines" viewBox="-400 -100 800 200">
        {CONTEXT_SOURCES.map((src, i) => (
          <motion.line
            key={src.name}
            x1={src.x}
            y1={src.y}
            x2={src.x > 0 ? 240 : -240}
            y2={src.y}
            stroke={src.color}
            strokeWidth={1.5}
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* Context sources */}
      {CONTEXT_SOURCES.map((src, i) => (
        <motion.div
          key={src.name}
          className="surface-viz__source"
          style={{ color: src.color }}
          initial={{ opacity: 0, x: src.x * 1.3, y: src.y * 1.3 }}
          whileInView={{ opacity: 1, x: src.x, y: src.y }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 60 }}
        >
          <span className="surface-viz__source-abbr" style={{ background: src.color }}>
            {src.abbr}
          </span>
          <span>{src.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
