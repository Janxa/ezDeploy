/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"green-valid": "#386641",
				"green-alternative": "#53A548",
				"red-invalid": "#A30000",
				"blue-pale": "#D9DCD6",

				chili: {
					100: "#FFE7E3",
					200: "#F2BDB3",
					300: "#E79688",
					400: "#d67b6b",
					500: "#D6462E",
					600: "#AE3825",
					700: "#852A1B",
					800: "#5C1C11",
					900: "#330E07",
				},

				"color-bg-dark": "#28262B",
				"color-bg-dark-2": "#18171A",
				// "color-red-primary": "#D6462E",
				// "color-green-primary": "#5C946E",
				// "color-blue-primary": "#4472CA",
				// "color-blue-secondary": "#9DCBBA",
				// "color-red-primary": "#FB3640",
			},
		},
	},
	plugins: [],
};
