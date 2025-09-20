/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        BorderCustom: "#ca4f4f",
        BgCustom: "#ca4f4f",
        ColorButtom: "#ca4f4f",
        BgTimer: "#f3d8d8",
        BgFooter: "#454545",
        BorderGray: "#BCBCBC",
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

