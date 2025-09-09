/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["var(--font-lato)", 'Lato', 'system-ui', 'sans-serif'],
        montserrat: ["var(--font-montserrat)", 'Montserrat', 'system-ui', 'sans-serif'],
        // Newly added hero fonts
        roboto: ["var(--font-roboto)", 'Roboto', 'system-ui', 'sans-serif'],
        robotoSerif: ["var(--font-roboto-serif)", 'Roboto Serif', 'ui-serif', 'serif']
      },
      // Custom responsive type sizes
      fontSize: {
        hero: ['clamp(2.25rem,5vw,3.75rem)', { lineHeight: '1.1', fontWeight: '700' }], // ~36px -> 60px
        lead: ['1.125rem', { lineHeight: '1.6' }], // 18px comfortable reading
      },
      boxShadow: {
        elev1: '0 1px 2px rgba(0,0,0,0.06)',
        elev2: '0 2px 8px -2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        elev3: '0 4px 16px -4px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
        focus: '0 0 0 3px rgba(58,163,53,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;