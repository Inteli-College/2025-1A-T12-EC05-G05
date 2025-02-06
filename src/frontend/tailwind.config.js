/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        ice: "#EEE",

        // Cores da Paleta
        primaryPurple: "#500878",
        lightBlue: "#74D2E7",
        deepBlue: "#0077B6",
        deepDarkBlue: "#006398", // deepBlue mais escuro para hover
        vibrantOrange: "#FF4000",
        warmYellow: "#F0C808",
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
};
