import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
	"https://lmdqbgkvyanzprplgoxl.supabase.co",
	import.meta.env.SUPABASE_ANON_KEY
)
