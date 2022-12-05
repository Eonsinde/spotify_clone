/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-theme': '#0e0e0e'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}