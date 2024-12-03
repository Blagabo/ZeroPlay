import { supabase } from "@lib/supabase"
import type { AstroCookies } from "astro"

export const validateSession = async (cookies: AstroCookies) => {
	const accessToken = cookies.get("sb-access-token")
	const refreshToken = cookies.get("sb-refresh-token")

	if (!accessToken || !refreshToken) {
		return { isValid: false, user: null }
	}

	try {
		const { data, error } = await supabase.auth.setSession({
			refresh_token: refreshToken.value,
			access_token: accessToken.value,
		})

		if (error || !data.session) {
			return { isValid: false, user: null }
		}

		return { isValid: true, user: data.user }
	} catch (error) {
		console.error("Error validating session:", error)
		return { isValid: false, user: null }
	}
}

export const clearAuthCookies = (cookies: AstroCookies) => {
	cookies.delete("sb-access-token", { path: "/" })
	cookies.delete("sb-refresh-token", { path: "/" })
}
