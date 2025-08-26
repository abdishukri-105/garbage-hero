/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#7C3AED', // violet-600
          end: '#4F46E5', // indigo-600
        },
        secondary: '#065F46', // green-900
        text: {
          primary: '#111827', // gray-900
          body: '#374151', // gray-700
          subtle: '#6B7280', // gray-500
        },
        background: {
          white: '#FFFFFF', // white
          light: '#F3F4F6', // gray-100
          dark: '#111827', // gray-900
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],   // Roboto
        open: ["var(--font-open-sans)", "sans-serif"], // Open Sans
      },
    },
  },
  plugins: [],
}