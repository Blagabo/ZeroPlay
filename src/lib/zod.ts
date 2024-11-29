/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import { z } from "zod"

const envVars = z.object({
	SUPABASE_URL: z.string().url(),
	SUPABASE_ANON_KEY: z.string(),
})

envVars.parse(import.meta.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVars> {}
	}
}
