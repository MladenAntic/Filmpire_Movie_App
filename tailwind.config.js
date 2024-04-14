/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0.5em 1em 1em rgb(64, 64, 70)",
      }
    },
  },
  plugins: [],
}