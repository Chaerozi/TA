/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      /* Font saja */
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },

      /* Optional: hanya primary color */
      colors: {
        primary: "#2563EB",
      },

    },
  },
  plugins: [],
}