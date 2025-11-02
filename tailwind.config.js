/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dutch-blue': '#003366',
        'dutch-orange': '#FF6600',
        'dutch-yellow': '#FFCC00',
      },
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

