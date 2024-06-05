/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0C21C1",
        second: "#000842",
        grey: "#9FA2A3",
        lgrey: "#F5F5F5",
      },
      borderRadius: {
        main: "4px",
      },
      dropShadow: {
        main: "0 4px 26px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}

