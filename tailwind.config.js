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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
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
      },
      boxShadow: {
        'gold':     '0 0 30px rgba(232, 168, 32, 0.3)',
        'gold-lg':  '0 0 60px rgba(232, 168, 32, 0.4)',
        'dark-lg':  '0 25px 80px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
