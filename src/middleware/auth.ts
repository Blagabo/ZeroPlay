import type { MiddlewareHandler } from "astro"
import { validateSession, clearAuthCookies } from "@utils/auth/session"
import { validateUserRole } from "@utils/auth/roles"

export const handleAuth: MiddlewareHandler = async ({ cookies, redirect, request }, next) => {
	const { isValid, user } = await validateSession(cookies)

	if (!isValid) {
		clearAuthCookies(cookies)
		return redirect("/signin?error=session_expired")
	}

	// Verificar rutas de admin
	if (request.url.includes("/admin")) {
		const isAdmin = await validateUserRole(user!.id, "admin")
		if (!isAdmin) {
			return redirect("/dashboard?error=unauthorized")
		}
	}

	return next()
}
