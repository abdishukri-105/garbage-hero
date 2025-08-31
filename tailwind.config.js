/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3aa335', // Safaricom green for CTAs, buttons, hover states
        secondary: '#228B22', // Darker forest green for headings, hovers, dividers
        accentLight: '#E5F3E8', // Soft green for section backgrounds, cards
        textPrimary: '#000000', // Black for main headings, emphasized text
        textSecondary: '#333333', // Dark gray for body paragraphs, subtext
        neutralBg: '#FFFFFF', // White for main page/body backgrounds
        error: '#FF6347', // Soft red for form errors, alerts
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"], // Roboto for headings
        open: ["var(--font-open-sans)", "sans-serif"], // Open Sans for body
      },
    },
  },
  plugins: [],
};