/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A66C2',
          50: '#E8F3FC',
          100: '#D1E7F9',
          200: '#A3CFF3',
          300: '#75B7ED',
          400: '#479FE7',
          500: '#0A66C2',
          600: '#08529B',
          700: '#063D74',
          800: '#04294D',
          900: '#021426',
        },
        rojgar: {
          blue: '#0A66C2',
          lightblue: '#E8F3FC',
          grey: '#666666',
          lightgrey: '#F3F2EF',
          darkgrey: '#1D1D1D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}
