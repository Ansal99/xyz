export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#ffffff',
        surface:   '#faf9ff',
        accent:    '#7c3aed',
        'accent-2':'#a855f7',
        'accent-3':'#ec4899',
        'accent-4':'#3b82f6',
        text:      '#0f0a1a',
        muted:     '#64748b',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body:    ['Satoshi', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee-left':  'marquee-left 35s linear infinite',
        'marquee-right': 'marquee-right 45s linear infinite',
        'pulse-dot':     'pulse-dot 2s ease-in-out infinite',
        float:           'float 6s ease-in-out infinite',
        shimmer:         'shimmer 5s linear infinite',
      },
      keyframes: {
        'marquee-left':  { '0%': { transform: 'translateX(0)' },      '100%': { transform: 'translateX(-50%)' } },
        'marquee-right': { '0%': { transform: 'translateX(-50%)' },   '100%': { transform: 'translateX(0)' } },
        'pulse-dot':     { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.6)', opacity: '0.4' } },
        float:           { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer:         { '0%': { backgroundPosition: '0% center' }, '100%': { backgroundPosition: '200% center' } },
      },
    },
  },
  plugins: [],
}