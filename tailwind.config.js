/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper tones for light sections
        paper: '#F6F0E6',
        bone:  '#ECE3D4',
        sand:  '#D9CBB4',
        // Espresso inks for type and dark sections
        ink: {
          DEFAULT: '#17110D',
          900: '#17110D',
          800: '#211813',
          700: '#2E231C',
          600: '#4A3B31',
          500: '#6E5C4F',
          400: '#93806F',
        },
        // Pulled from the logo's orange field
        ember: {
          DEFAULT: '#E0521D',
          300: '#F3A27F',
          400: '#EB7444',
          500: '#E0521D',
          600: '#BD3F12',
          700: '#8F2E0C',
        },
        brass: '#C49A45',
        wa: '#25D366',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans:    ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      animation: {
        marquee:         'marquee 38s linear infinite',
        'marquee-rev':   'marqueeRev 38s linear infinite',
        'spin-slow':     'spin 18s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
