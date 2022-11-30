/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        darkTheme: "#242B2E",
        lightTheme: "#ffffff",
        modelGray:"#e7e9eb"
      },
    },
  },
  plugins: [],
};
