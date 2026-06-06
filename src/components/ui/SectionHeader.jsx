export default function SectionHeader({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <span className="eyebrow-pill mb-4 block w-fit">{eyebrow}</span>
      )}
      {title && (
        <h2
          className="font-display font-semibold text-text leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {title}
        </h2>
      )}
    </div>
  )
}
