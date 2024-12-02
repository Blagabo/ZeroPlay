import { supabase } from "@lib/supabase"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies, redirect }) => {
	await supabase.auth.signOut()
	cookies.delete("sb-access-token", { path: "/" })
	cookies.delete("sb-refresh-token", { path: "/" })
	return redirect("/signin")
}
