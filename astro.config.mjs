// @ts-check
// @ts-check
import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

import react from "@astrojs/react"

import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
	site: "https://zeroplay.tv",
	prefetch: true,
	compressHTML: true,
	integrations: [tailwind(), react()],
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	output: "server",
	vite: {
		define: {
			"process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
			"process.env.SUPABASE_ANON_KEY": JSON.stringify(process.env.SUPABASE_ANON_KEY),
		},
	},
})
