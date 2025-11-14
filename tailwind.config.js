/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        tealish: '#0f4c5c',
        silverish: '#bfc9cc'
      }
    }
  },
  plugins: []
}
