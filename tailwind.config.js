/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        BorderBlue: "#ca4f4f",
        BgBlue: "#ca4f4f",
        BgFooter: "#454545",
        BorderGray: "#BCBCBC",
        BgTimer: "#f3d8d8",
        Gray1: "#E6E6E6",
      },
      fontFamily: {
        sans: ["sans"],
        sahelBold: ["sahelBold"],
      },
    },
  },
  plugins: [],
}

