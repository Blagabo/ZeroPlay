import { validateUserRole } from "@utils/auth/roles"
import { clearAuthCookies, validateSession } from "@utils/auth/session"
import type { MiddlewareHandler } from "astro"

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
		} else if (isAdmin && request.url === "/admin") {
			return redirect("/admin/dashboard")
		}
	}

	return next()
}
