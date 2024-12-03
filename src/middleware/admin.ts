import type { MiddlewareHandler } from "astro"

export const handleAdminRedirect: MiddlewareHandler = async ({ url, redirect }, next) => {
	if (url.pathname === "/admin") {
		return redirect("/admin/dashboard")
	}

	return next()
}
