export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-10 bg-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Availability line — top, prominent */}
        <div className="flex justify-center mb-8">
          <div
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(110,231,183,0.06)',
              border: '1px solid rgba(110,231,183,0.2)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#6EE7B7' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#6EE7B7' }}
              />
            </span>
            <span className="font-mono text-xs" style={{ color: '#6EE7B7' }}>
              B.Tech CSE — finishing May 2026 · Available from June 2026 · Open to full-time roles
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-white/25 text-xs">
            Ansal © {year}
          </span>

          <nav className="flex items-center gap-5">
            {['Work', 'Skills', 'About', 'Contact'].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-body text-sm text-white/30 hover:text-accent transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </nav>

          <span className="font-mono text-white/20 text-xs">
            Designed & Built by Ansal
          </span>
        </div>
      </div>
    </footer>
  )
}