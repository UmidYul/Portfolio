/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        brass:  { DEFAULT: '#C3A177', deep: '#9A7442' },
        clay:   { DEFAULT: '#B4714F', deep: '#8C543A' },
        olive:  { DEFAULT: '#8A8F5F', deep: '#656A42' },
        indigo: { DEFAULT: '#6A6E9C', deep: '#474B78' }
      }
    }
  },
  plugins: []
};
