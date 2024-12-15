import { defineMiddleware } from "astro:middleware"
import { validateUserRole } from "./src/utils/auth/roles"
import { validateSession } from "./src/utils/auth/session"

export const onRequest = defineMiddleware(async ({ cookies, redirect, request }, next) => {
	const url = new URL(request.url)
	const pathname = url.pathname

	// Rutas que siempre son estáticas (prerender)
	const staticRoutes = ["/", "/signin", "/register", "/setup-guide", "/order"]
	if (staticRoutes.includes(pathname)) {
		return next()
	}

	// No verificar autenticación para rutas de API
	if (pathname.startsWith("/api")) {
		return next()
	}

	// Validar sesión para rutas protegidas
	const { isValid, user } = await validateSession(cookies)

	if (!isValid) {
		return redirect("/signin?error=session_expired")
	}

	// Verificar rutas de admin
	if (pathname.startsWith("/admin")) {
		const isAdmin = await validateUserRole(user!.id, "admin")
		if (!isAdmin) {
			return redirect("/dashboard?error=unauthorized")
		}
	}

	// Continuar con la solicitud
	const response = await next()
	return response
})
