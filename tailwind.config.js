export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#050505',
        surface:   '#0D0D0D',
        accent:    '#6EE7B7',
        'accent-2':'#818CF8',
        'accent-3':'#F59E0B',
        text:      '#F8FAFC',
        muted:     '#94A3B8',
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
        'float':         'float 6s ease-in-out infinite',
        'spin-slow':     'spin-slow 8s linear infinite',
        'shimmer':       'shimmer 5s linear infinite',
      },
      keyframes: {
        'marquee-left':  { '0%':{'transform':'translateX(0)'},    '100%':{'transform':'translateX(-50%)'} },
        'marquee-right': { '0%':{'transform':'translateX(-50%)'}, '100%':{'transform':'translateX(0)'} },
        'pulse-dot':     { '0%,100%':{'transform':'scale(1)','opacity':'1'}, '50%':{'transform':'scale(1.6)','opacity':'0.4'} },
        'float':         { '0%,100%':{'transform':'translateY(0px)'},'50%':{'transform':'translateY(-10px)'} },
        'spin-slow':     { 'from':{'transform':'rotateY(0deg)'},'to':{'transform':'rotateY(360deg)'} },
        'shimmer':       { '0%':{'background-position':'0% center'},'100%':{'background-position':'200% center'} },
      },
    },
  },
  plugins: [],
}