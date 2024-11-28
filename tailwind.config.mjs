/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#e6f9ff",
					100: "#ccf3ff",
					200: "#99e7ff",
					300: "#66dbff",
					400: "#33cfff",
					500: "#00d4ff",
					600: "#0099ff",
					700: "#0070cc",
				},
				secondary: {
					50: "#fff5e6",
					100: "#ffebcc",
					200: "#ffd699",
					300: "#ffc266",
					400: "#ffad33",
					500: "#ff9900",
					600: "#cc7a00",
					700: "#995c00",
				},
				dark: {
					50: "#e6e6e9",
					100: "#ccced3",
					200: "#999da7",
					300: "#666b7b",
					400: "#333a4f",
					500: "#1a1a2e",
					600: "#151525",
					700: "#10101c",
				},
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
}
