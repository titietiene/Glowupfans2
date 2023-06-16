/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/Atoms/*.{js,jsx,ts,tsx}", "./app/Screens/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rcregular: ["RCRegular"],
      },
    },
  },
  plugins: [],
}

