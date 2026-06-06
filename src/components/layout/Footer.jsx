export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 bg-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8
        flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-body text-muted text-sm">Ansal © 2025</span>
        <nav className="flex items-center gap-5">
          {['Work','Skills','About','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-body text-sm text-muted hover:text-accent transition-colors duration-200">
              {l}
            </a>
          ))}
        </nav>
        <span className="font-body text-muted text-sm">Designed & Built by Ansal</span>
      </div>
    </footer>
  )
}
