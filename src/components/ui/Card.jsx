// Double-Bezel reusable card
export default function Card({ children, className = '', style = {}, onClick }) {
  return (
    <div
      className={`card-bezel ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="card-bezel-inner">{children}</div>
    </div>
  )
}
