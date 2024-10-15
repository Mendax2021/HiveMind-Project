// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: "#41166c",
          200: "#3a1360",
          300: "#321154",
          400: "#2b0e48",
          500: "#240c3c",
          600: "#1d0a30",
          700: "#160724",
          800: "#0e0518",
          900: "#07020c",
          DEFAULT: "#842CDB",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
