export default function FadeIn({ children, className = '' }) {
  return <div className={className || undefined}>{children}</div>
}
