/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/wrapper/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        siliguri: ["var(--font-siliguri)", ...fontFamily.sans],
      },
      colors: {
        primary: "rgb(239 93 20)",
        primaryT: "#333",
        secondary: "#F4442C",
        secondaryT: "#183544",
        tertiary: "white",
        quaternary: "#E9F7F2",
      },
    },
  },
  plugins: [],
});
