/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        black: '#010101',
        lavidbrown: '#512940',
        venus: '#958791',
        bonjour: '#f2eef2',
        hibiscus: '#b22d64',
      }
    },
  },
  plugins: [],
}