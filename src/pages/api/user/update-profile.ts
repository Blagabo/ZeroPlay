import { UserService } from "@services"
import { clearAuthCookies, validateSession } from "@utils/auth/session"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const { isValid, user } = await validateSession(cookies)

	if (!isValid || !user) {
		clearAuthCookies(cookies)
		return redirect("/signin?error=session_expired")
	}

	try {
		const formData = await request.formData()
		const full_name = formData.get("full_name")?.toString() || null
		const phone = formData.get("phone") ? Number(formData.get("phone")) : null

		const updatedProfile = await UserService.updateProfile(user.id, {
			full_name,
			phone,
		})

		if (!updatedProfile) {
			return redirect("/dashboard?error=update_failed")
		}

		return redirect("/dashboard?success=Perfil actualizado correctamente")
	} catch (error) {
		console.error("Error updating profile:", error)
		return redirect("/dashboard?error=generic_error")
	}
}
