/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        "xsm": "400px",
        "sml": "550px",
      },
      width: {
        maxWidth: "1150px"
      },
      colors: {
        light: {
          background: "#cae3fa",
          text: '#000000',
          hover: "#90bcd9",
          buttonBg: "#cbe9cb",
          buttonHover: "#99bb99"
        },
        dark: {
          background: '#1e293b',
          text: '#ffffff',
          hover: "#334155",
          buttonBg: "#2a6b65",
          buttonHover: "#194844"
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
