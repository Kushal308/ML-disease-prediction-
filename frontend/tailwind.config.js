/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mediblue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a6f6',
          500: '#0c87eb',
          600: '#026bc9',
          700: '#0355a2',
          800: '#074884',
          900: '#0b3d6e',
          950: '#07264a',
        },
        mediteal: {
          50: '#ecfdf7',
          100: '#d1faea',
          200: '#a7f3d8',
          300: '#6ee6c2',
          400: '#34d1a5',
          500: '#10b78c',
          600: '#089472',
          700: '#08765e',
          800: '#0a5d4c',
          900: '#0a4d3f',
        },
        risk: {
          low: '#10b981',
          moderate: '#f59e0b',
          high: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        'glow-blue': '0 0 25px -5px rgba(12, 135, 235, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(16, 183, 140, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
