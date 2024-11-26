/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				accent: "#cc4b06",
				dark: "#000",
				tenary: "#ecf7f8",
			},
			screens: {
				md: "700px",
			},
		},
	},
	plugins: [],
}
