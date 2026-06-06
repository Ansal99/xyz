import { motion } from 'framer-motion'

export function ButtonPrimary({ children, href, onClick, className = '' }) {
  const Tag = href ? 'a' : 'button'
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
          bg-accent text-bg font-body font-semibold text-sm
          hover:bg-accent/90 transition-colors duration-200 ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

export function ButtonGhost({ children, href, onClick, className = '' }) {
  const Tag = href ? 'a' : 'button'
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
          border border-white/10 text-text font-body text-sm
          hover:border-accent/40 hover:text-accent transition-all duration-200 ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
