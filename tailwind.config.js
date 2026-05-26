/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--color-navy)",
        gold: "var(--color-gold)",
        sky: "var(--color-sky)",
        "gray-light": "var(--color-gray-light)",
        dark: "var(--color-dark)",
      },
    },
  },
  plugins: [],
};
