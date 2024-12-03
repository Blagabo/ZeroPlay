import type { APIRoute } from "astro"
import { validateSession, clearAuthCookies } from "./session"

export const authGuard = async (
	cookies: Parameters<APIRoute>[0]["cookies"],
	redirect: Parameters<APIRoute>[0]["redirect"]
) => {
	const { isValid } = await validateSession(cookies)

	if (!isValid) {
		clearAuthCookies(cookies)
		return redirect("/signin?error=session_expired")
	}

	return null
}
