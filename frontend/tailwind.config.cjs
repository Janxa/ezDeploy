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
      'color-bg-dark-2':'#292929',
      'color-yellow-primary':'#F9CB40',
      'color-blue-primary':'#5688C7',
      'color-blue-secondary':'#465F7E',
      'color-green-primary':'#499F68',
      'color-red-primary':'#DA2C38'
    }},
  },
  plugins: [],
}
