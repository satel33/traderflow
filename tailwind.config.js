/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        sm: "1.5rem",
      },
    },
    colors: {
      black: "#02041A",
      white: "#FEFEFE",
      blue: {
        bright: "#1162FD",
        light: "#6FA9FF",
        gray: "#5678B9",
      },
      gray: {
        DEFAULT: "#B5BEE4",
        light: "#B0B5C9",
      },
      gold: "#FFE9B0",
    },
    extend: {
      fontFamily: {
        heading: ['"Open Sauce One"'],
        body: ["Inter"],
      },
      screens: {
        sm: "750px",
        md: "970px",
        lg: "1025px",
      },
      boxShadow: {
        button: "0px 0px 10px rgba(85, 143, 255, 0.5)",
        line: "0px 0px 8px #1923A7",
      },
      dropShadow: {
        button: "0px 0px 10px rgba(85, 143, 255, 0.5)",
      },
    },
  },
  plugins: [],
}
