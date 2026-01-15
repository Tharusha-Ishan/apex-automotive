/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-charcoal': '#1a1a1a',
        'accent-gold': '#D4AF37',
        'accent-blue': '#007BFF', // Electric blue variant
        'accent-silver': '#C0C0C0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We'll add Inter via Google Fonts later
      }
    },
  },
  plugins: [],
}

