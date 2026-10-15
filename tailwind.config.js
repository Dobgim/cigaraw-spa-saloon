/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ec',
          100: '#faefc9',
          200: '#f5db8f',
          300: '#efc255',
          400: '#e8a820',
          500: '#c98a10',
          600: '#a06b0c',
          700: '#7a4f0d',
          800: '#653f12',
          900: '#563514',
        },
        ruby: {
          50:  '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#4c0d0d',
          950: '#2a0606',
        },
        dark: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#c5c5c5',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#3d3d3d',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        serif:   ['Lora', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'scroll-line':  'scrollLine 2s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'fade-in-up':   'fadeInUp 0.8s ease forwards',
        'fade-in':      'fadeIn 1s ease forwards',
        'slide-in-left':'slideInLeft 0.8s ease forwards',
        'counter':      'counter 2s ease-out forwards',
        'shimmer':      'shimmer 2.5s infinite',
        'ken-burns':    'kenBurns 24s ease-in-out infinite alternate',
        'zoom-pulse':   'zoomPulse 4s ease-in-out infinite',
        'zoom-in-out':  'zoomInOut 6s ease-in-out infinite',
        'aura-pulse':   'auraPulse 3.5s ease-in-out infinite',
        'spin-slow':    'spinSlow 35s linear infinite',
        'spin-reverse': 'spinReverse 45s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        kenBurns: {
          '0%':   { transform: 'scale(1.0)' },
          '50%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1.0)' },
        },
        zoomPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.06)' },
        },
        zoomInOut: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%':      { transform: 'scale(1.07) translateY(-8px)' },
        },
        auraPulse: {
          '0%, 100%': {
            boxShadow: '0 0 25px rgba(232, 168, 32, 0.35), 0 0 60px rgba(185, 28, 28, 0.25)',
          },
          '50%': {
            boxShadow: '0 0 45px rgba(232, 168, 32, 0.7), 0 0 95px rgba(185, 28, 28, 0.5)',
          },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #e8a820, 0 0 20px #e8a820' },
          to:   { textShadow: '0 0 20px #e8a820, 0 0 40px #e8a820, 0 0 60px #c98a10' },
        },
        scrollLine: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%':  { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(232,168,32,0.3) 50%, transparent 100%)',
        'logo-gradient': 'radial-gradient(circle, #8b1515 0%, #360707 55%, #120907 100%)',
      },
      boxShadow: {
        'gold':     '0 0 30px rgba(232, 168, 32, 0.3)',
        'gold-lg':  '0 0 60px rgba(232, 168, 32, 0.4)',
        'ruby-gold':'0 0 40px rgba(232, 168, 32, 0.35), 0 0 80px rgba(185, 28, 28, 0.3)',
        'dark-lg':  '0 25px 80px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
