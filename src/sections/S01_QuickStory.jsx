import { forwardRef, useState, useEffect, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Section, { SectionContext } from '../components/Section'

const MOCKS = [
  // 0 — Social Ad
  <div className="qs-mock qs-social">
    <div className="qs-social__header">
      <div className="qs-social__avatar">AB</div>
      <div>
        <span className="qs-social__brand">Big Box Store</span>
        <span className="qs-social__sponsored">Sponsored</span>
      </div>
    </div>
    <img className="qs-mock__img" src="/frame.jpg" alt="Product creative — social ad" />
    <button className="qs-mock__cta">Shop Now</button>
  </div>,

  // 1 — Product Detail Page
  <div className="qs-mock qs-pdp">
    <div className="qs-pdp__layout">
      <img className="qs-pdp__img" src="/frame.jpg" alt="Product image — PDP" />
      <div className="qs-pdp__info">
        <h3 className="qs-pdp__title">Samsung 65″ Frame TV</h3>
        <div className="qs-pdp__stars">★★★★★ <span className="qs-pdp__count">(2,847)</span></div>
        <p className="qs-pdp__price">$1,499.99</p>
        <button className="qs-mock__cta qs-mock__cta--cart">Add to Cart</button>
      </div>
    </div>
  </div>,

  // 2 — Checkout
  <div className="qs-mock qs-checkout">
    <h3 className="qs-checkout__heading">Order Summary</h3>
    <div className="qs-checkout__item">
      <img className="qs-checkout__thumb" src="/frame.jpg" alt="Product thumbnail — checkout" />
      <div className="qs-checkout__detail">
        <span className="qs-checkout__name">Samsung 65″ Frame TV</span>
        <span className="qs-checkout__qty">Qty: 1</span>
      </div>
      <span className="qs-checkout__price">$1,499.99</span>
    </div>
    <div className="qs-checkout__totals">
      <div className="qs-checkout__row"><span>Subtotal</span><span>$1,499.99</span></div>
      <div className="qs-checkout__row"><span>Tax</span><span>$127.50</span></div>
      <div className="qs-checkout__row qs-checkout__row--total"><span>Total</span><span>$1,627.49</span></div>
    </div>
    <button className="qs-mock__cta qs-mock__cta--order">Place Order</button>
  </div>,

  // 3 — Retargeting Ad
  <div className="qs-mock qs-social qs-social--retarget">
    <div className="qs-social__header">
      <div className="qs-social__avatar">AB</div>
      <div>
        <span className="qs-social__brand">Big Box Store</span>
        <span className="qs-social__sponsored">Sponsored</span>
      </div>
    </div>
    <img className="qs-mock__img" src="/frame.jpg" alt="Product creative — retargeting ad" />
    <button className="qs-mock__cta qs-mock__cta--amber">Shop Now</button>
    <p className="qs-social__loop-note">BUT I JUST BOUGHT THIS!!</p>
  </div>,
]

function QuickStoryMocks() {
  const { isActive, fullyRevealed } = useContext(SectionContext)
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)

  // Keep ref in sync with state (handler reads ref to avoid re-registering)
  useEffect(() => { stepRef.current = step }, [step])

  // Reset when the mock container is hidden or the section deactivates
  useEffect(() => {
    if (!isActive || !fullyRevealed) {
      setStep(0)
      stepRef.current = 0
    }
  }, [isActive, fullyRevealed])

  // Capture-phase keyboard handler — registered once per visibility change,
  // reads stepRef so it doesn't need to re-register on every step change.
  useEffect(() => {
    if (!isActive || !fullyRevealed) return

    const handleKey = (e) => {
      const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
      const prevKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']

      if (nextKeys.includes(e.key) && stepRef.current < 3) {
        stepRef.current += 1
        setStep(stepRef.current)
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      } else if (prevKeys.includes(e.key) && stepRef.current > 0) {
        stepRef.current -= 1
        setStep(stepRef.current)
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [isActive, fullyRevealed])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {MOCKS[step]}
      </motion.div>
    </AnimatePresence>
  )
}

const S01_QuickStory = forwardRef(function S01_QuickStory({ isActive }, ref) {
  return (
    <Section ref={ref} id="quick-story" dark isActive={isActive}>
      <FadeIn>
        <p className="section__label">Quick Story</p>
        <h2 className="section__title">My buying journey</h2>
        <p className="section__subtitle">
          What happens when data is captured but not activated.
        </p>
      </FadeIn>

      <QuickStoryMocks />
    </Section>
  )
})

export default S01_QuickStory
