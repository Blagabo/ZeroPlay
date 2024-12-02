import { supabase } from "@lib/supabase"
import type { MiddlewareHandler } from "astro"

export const handleAuth: MiddlewareHandler = async ({ cookies, redirect }, next) => {
	const accessToken = cookies.get("sb-access-token")
	const refreshToken = cookies.get("sb-refresh-token")

	if (!accessToken || !refreshToken) {
		return redirect("/signin?error=session_expired")
	}

	try {
		const { data, error } = await supabase.auth.setSession({
			refresh_token: refreshToken.value,
			access_token: accessToken.value,
		})

		if (error || !data.session) {
			cookies.delete("sb-access-token", { path: "/" })
			cookies.delete("sb-refresh-token", { path: "/" })
			return redirect("/signin?error=session_expired")
		}

		return next()
	} catch (error) {
		console.error("Error al verificar sesión:", error)
		return redirect("/signin?error=generic_error")
	}
}
