/** @type {import('tailwindcss').Config} */
const config = require('./../tailwind.config.js')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: config.theme,
  plugins: []
}
