/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				chili: {
					100: "#FAEBE8",
					200: "#EAC6C0",
					300: "#F2ACA0",
					400: "#E47F6E",
					500: "#D6462E",
					600: "#B53019",
					700: "#871D0B",
					800: "#691103",
					900: "#3D0900",
				},
				jade: {
					100: "#E8FCF5",
					200: "#C0EBDC",
					300: "#97DEC5",
					400: "#47CC9E",
					500: "#19BF85",
					600: "#109E6C",
					700: "#09734E",
					800: "#025437",
					900: "#003825",
				},
				lila: {
					100: "#EFE8FA",
					200: "#D5C1F7",
					300: "#B596EB",
					400: "#8658D6",
					500: "#6221D0",
					600: "#5014B5",
					700: "#3E0996",
					800: "#230457",
					900: "#150038",
				},
				golden: {
					100: "#FAF4E6",
					200: "#FAE6B4",
					300: "#F2D383",
					400: "#EBC157",
					500: "#E0AA1F",
					600: "#C4900B",
					700: "#AB7C05",
					800: "#805D05",
					900: "#423000",
				},
				flat: {
					100: "#FCFFFD",
					200: "#D2D9D4",
					300: "#A0A8A2",
					400: "#778079",
					500: "#4A524C",
					600: "#333B35",
					700: "#252B27",
					800: "#141A15",
					900: "#020302",
				},
				invalid: {
					100: "#FFEDED",
					200: "#F6B1B1",
					300: "#EB7C7C",
					400: "#DE5F5F",
					500: "#DF1B1B",
					600: "#B20E0E",
					700: "#820808",
					800: "#610404",
					900: "#3B0000",
				},
			},
			keyframes: {
				growDown: {
					"0%": {
						transform: "scaleY(0)",
					},
					"80%": {
						transform: "scaleY(1.1)",
					},
					"100%": {
						transform: "scaleY(1)",
					},
				},
			},
			animation: { growDown: "growDown 0.45s ease-in-out forwards" },
		},
	},
	plugins: [],
};
