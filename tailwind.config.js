/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#346C4F',
          dark: '#27523c',
          light: '#3d7e5d',
        }
      },
      fontFamily: {
        sans: ['"Albert Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neo': '3px 4px 0px #000000',
        'neo-lg': '4px 6px 0px #000000',
        'neo-sm': '2px 2px 0px #000000',
      }
    },
  },
  plugins: [],
}
