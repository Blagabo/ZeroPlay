// @ts-check
// @ts-check
import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

import react from "@astrojs/react"

import cloudflare from "@astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [tailwind(), react()],
	output: "server",
	adapter: cloudflare({
		imageService: "cloudflare",
	}),
	vite: {
		define: {
			"process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
			"process.env.SUPABASE_ANON_KEY": JSON.stringify(process.env.SUPABASE_ANON_KEY),
		},
	},
})
