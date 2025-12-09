import scrollbar from 'tailwind-scrollbar';

// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ["var(--font-text)"],
        nav: ["var(--font-nav)"],
      },
    },
  },
  plugins: [
    scrollbar
  ],
};