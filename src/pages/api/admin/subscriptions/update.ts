/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscriptionService, UserService } from "@services"
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
		const { subscriptionId, updates } = await request.json()
		const updatedSubscription = await SubscriptionService.update(subscriptionId, updates)

		if (!updatedSubscription) {
			return new Response(JSON.stringify({ error: "Failed to update subscription" }), {
				status: 400,
			})
		}

		return new Response(JSON.stringify({ subscription: updatedSubscription }), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
	}
}
