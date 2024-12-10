/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserService } from "@services/database/user.service"
import { clearAuthCookies, validateSession } from "@utils/auth/session"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
	const { isValid, user } = await validateSession(cookies)

	if (!isValid) {
		clearAuthCookies(cookies)
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	const isAdmin = await UserService.validateRole(user!.id, "admin")
	if (!isAdmin) {
		return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 })
	}

	try {
		const users = await UserService.getAllUsers()
		return new Response(JSON.stringify({ users }), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
	}
}
