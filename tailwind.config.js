/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "Space Grotesk", "monospace"],
      },
      colors: {
        canvas: "#FDFBF7",
        retro: {
          yellow: "#FFE600",
          mint: "#A8F0D0",
          lavender: "#C4B5FD",
          coral: "#FF708A",
          tangerine: "#FFB347",
          amber: "#FFD166",
          slate: "#E2E8F0",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        'retro-sm': '2px 2px 0px 0px #000000',
        'retro': '4px 4px 0px 0px #000000',
        'retro-lg': '6px 6px 0px 0px #000000',
        'retro-xl': '8px 8px 0px 0px #000000',
      },
      borderRadius: {
        'neo': '14px',
        'neo-sm': '8px',
        'neo-lg': '20px',
      },
    },
  },
  plugins: [],
};
