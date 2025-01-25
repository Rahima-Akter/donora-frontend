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
        'Blood-Red': '#660000',
        'Crimson-Red': '#990000',
        'Racing-Red': '#CC0000',
        'Red': '#FF0000',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}