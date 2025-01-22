// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'ga-maamli': ['"Ga Maamli"', 'sans-serif'],
        'playwrite-gb-s': ['"Playwrite GB S"', 'cursive'],
      },
      colors: {
        crimson: '#dc143c',
      },
      fontWeight: {
        light: 100,
        regular: 400,
        // Add more weights if needed
      },
    },
  },
  plugins: [],
});
