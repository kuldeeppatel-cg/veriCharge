/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        volt: {
          green: '#DFFF00', // Lime green primary color
          dark: '#161616',  // Background dark
          gray: '#1e1e1e',  // Input bg dark
          border: '#333333' // Subtle borders
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
