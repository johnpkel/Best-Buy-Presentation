import { motion } from 'framer-motion'
import { SLACK_OUTBOUND, SLACK_RESPONSE } from '../data/sparkMoments'

function SlackIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" style={{ flexShrink: 0 }}>
      <path d="M11.3 34.3a5.6 5.6 0 1 1-5.7-5.6h5.7v5.6zm2.9 0a5.6 5.6 0 1 1 11.2 0v14.1a5.6 5.6 0 1 1-11.2 0V34.3z" fill="#E01E5A"/>
      <path d="M19.7 11.3a5.6 5.6 0 1 1 5.7-5.7v5.7h-5.7zm0 2.9a5.6 5.6 0 1 1 0 11.2H5.6a5.6 5.6 0 1 1 0-11.2h14.1z" fill="#36C5F0"/>
      <path d="M42.7 19.7a5.6 5.6 0 1 1 5.7 5.7h-5.7v-5.7zm-2.9 0a5.6 5.6 0 1 1-11.2 0V5.6a5.6 5.6 0 1 1 11.2 0v14.1z" fill="#2EB67D"/>
      <path d="M34.3 42.7a5.6 5.6 0 1 1-5.6 5.7v-5.7h5.6zm0-2.9a5.6 5.6 0 1 1 0-11.2h14.1a5.6 5.6 0 1 1 0 11.2H34.3z" fill="#ECB22E"/>
    </svg>
  )
}

export default function SlackMessage() {
  return (
    <div className="slack-msg">
      {/* Outbound message */}
      <motion.div
        className="slack-msg__card slack-msg__card--outbound"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="slack-msg__header">
          <SlackIcon size={18} />
          <span className="slack-msg__channel">{SLACK_OUTBOUND.to}</span>
          <span className="slack-msg__mention">{SLACK_OUTBOUND.mention}</span>
        </div>
        <div className="slack-msg__sender">
          <span className="slack-msg__avatar slack-msg__avatar--bot">◆</span>
          <span className="slack-msg__name">{SLACK_OUTBOUND.from}</span>
          <span className="slack-msg__badge">BOT</span>
        </div>
        <div className="slack-msg__body">{SLACK_OUTBOUND.body}</div>
      </motion.div>

      {/* Waiting pulse */}
      <motion.div
        className="slack-msg__waiting"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="slack-msg__pulse" />
        Waiting for response...
      </motion.div>

      {/* Response */}
      <motion.div
        className="slack-msg__card slack-msg__card--response"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="slack-msg__sender">
          <span className="slack-msg__avatar slack-msg__avatar--human">SC</span>
          <span className="slack-msg__name">{SLACK_RESPONSE.from}</span>
          <span className="slack-msg__role">{SLACK_RESPONSE.role}</span>
        </div>
        <div className="slack-msg__body">{SLACK_RESPONSE.body}</div>
      </motion.div>
    </div>
  )
}
