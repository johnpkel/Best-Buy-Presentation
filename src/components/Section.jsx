import { forwardRef } from 'react'

const Section = forwardRef(function Section({ id, className = '', dark, children }, ref) {
  return (
    <section
      ref={ref}
      id={id}
      className={`section ${dark ? 'section--dark' : ''} ${className}`}
    >
      <div className="section__inner">
        {children}
      </div>
    </section>
  )
})

export default Section
