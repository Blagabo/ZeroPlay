/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserService } from "@services/database/user.service"
import { clearAuthCookies, validateSession } from "@utils/auth/session"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
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
		const data = await request.json()
		const { userId, updates } = data

		const updatedUser = await UserService.updateProfile(userId, updates)

		if (!updatedUser) {
			return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 400 })
		}

		return new Response(JSON.stringify({ user: updatedUser }), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
	}
}
