/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors:{
      'orange':'#FF7700',
      'green-valid':'#386641',
      'green-alternative':'#53A548',
      'red-invalid':'#A30000',
      'blue-pale':'#D9DCD6',
      'blue':'#16425B',
      'lightblue':'#81C3D7',

      'color-bg-dark': '#353535',
      'color-yellow-primary':'#F9CB40',
      'color-blue-primary':'#2F52E0'
    }},
  },
  plugins: [],
}
