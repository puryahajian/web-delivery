/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        BorderCustom: "#356554",
        BgCustom: "#356554",
        ColorButtom: "#ff881a",
        BgTimer: "#fdede7",
        BgFooter: "#454545",
        BorderGray: "#BCBCBC",
        Gray1: "#f7f7f7",
      },
      fontFamily: {
        sans: ["sans"],
        sahelBold: ["sahelBold"],
      },
    },
  },
  plugins: [],
}

