import { motion } from 'framer-motion'
import { TOOLS } from '../data/tools'

const SCATTERED = [
  { x: -280, y: -100, rotate: 0 },
  { x: 240, y: -120, rotate: 0 },
  { x: -160, y: 20, rotate: 0 },
  { x: 300, y: 10, rotate: 0 },
  { x: -320, y: 110, rotate: 0 },
  { x: 120, y: -60, rotate: 0 },
  { x: -80, y: 130, rotate: 0 },
  { x: 260, y: 120, rotate: 0 },
  { x: -30, y: -150, rotate: 0 },
]

const ORBIT = [
  { x: 0, y: -140, rotate: 0 },
  { x: 120, y: -80, rotate: 0 },
  { x: 140, y: 40, rotate: 0 },
  { x: 80, y: 130, rotate: 0 },
  { x: -80, y: 130, rotate: 0 },
  { x: -140, y: 40, rotate: 0 },
  { x: -120, y: -80, rotate: 0 },
  { x: 0, y: 160, rotate: 0 },
  { x: 160, y: -30, rotate: 0 },
]

export default function ToolScatter({ assembled = false }) {
  const positions = assembled ? ORBIT : SCATTERED

  return (
    <div className="tool-scatter">
      {assembled && (
        <motion.div
          className="tool-scatter__center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="tool-scatter__spark">◆</span>
          <span className="tool-scatter__label">Activation Layer</span>
        </motion.div>
      )}

      {TOOLS.map((tool, i) => {
        const pos = positions[i] || positions[0]
        return (
          <motion.div
            key={tool.name}
            className="tool-scatter__chip"
            style={{ color: tool.color }}
            initial={false}
            animate={{
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 15,
              delay: i * 0.05,
            }}
          >
            <span
              className="tool-scatter__abbr"
              style={{ background: tool.color }}
            >
              {tool.abbr}
            </span>
            <span>{tool.name}</span>
          </motion.div>
        )
      })}

      {assembled &&
        TOOLS.map((tool, i) => {
          const pos = ORBIT[i] || ORBIT[0]
          return (
            <motion.svg
              key={`line-${tool.name}`}
              className="tool-scatter__line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 1,
                height: 1,
                overflow: 'visible',
              }}
            >
              <motion.line
                x1={0}
                y1={0}
                x2={pos.x}
                y2={pos.y}
                stroke={tool.color}
                strokeWidth={2}
                strokeDasharray="6 4"
              />
            </motion.svg>
          )
        })}
    </div>
  )
}
