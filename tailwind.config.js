/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f3efe6",
          deep: "#ece7da",
          card: "#f8f5ee",
        },
        ink: {
          DEFAULT: "#1a1813",
          soft: "#4c473d",
          mut: "#8c8676",
        },
        line: {
          DEFAULT: "#d6cfbf",
          strong: "#c2b9a4",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        label: "0.2em",
      },
      maxWidth: {
        shell: "1160px",
      },
    },
  },
  plugins: [],
};
