// @ts-check
// @ts-check
import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
	output: "server",
	prefetch: true,
	integrations: [tailwind(), react()],
})