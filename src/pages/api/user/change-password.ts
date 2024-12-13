import { supabase } from "@lib/supabase"
import { clearAuthCookies, validateSession } from "@utils/auth/session"
import { AUTH_ERRORS } from "@utils/constants/errors"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const { isValid } = await validateSession(cookies)

	if (!isValid) {
		clearAuthCookies(cookies)
		return redirect(`/signin?error=${encodeURIComponent(AUTH_ERRORS.session_expired)}`)
	}

	try {
		const formData = await request.formData()
		const current_password = formData.get("current_password")?.toString()
		const new_password = formData.get("new_password")?.toString()
		const confirm_password = formData.get("confirm_password")?.toString()

		if (!current_password || !new_password || !confirm_password) {
			return redirect(`/dashboard?error=${encodeURIComponent(AUTH_ERRORS.missing_fields)}`)
		}

		if (new_password !== confirm_password) {
			return redirect(`/dashboard?error=${encodeURIComponent("passwords_dont_match")}`)
		}

		const { error } = await supabase.auth.updateUser({
			password: new_password,
		})

		if (error) {
			console.error("Error changing password:", error)
			return redirect(`/dashboard?error=${encodeURIComponent(AUTH_ERRORS.generic_error)}`)
		}

		return redirect(
			"/dashboard?success=" + encodeURIComponent("Contraseña actualizada correctamente")
		)
	} catch (error) {
		console.error("Error changing password:", error)
		return redirect(`/dashboard?error=${encodeURIComponent(AUTH_ERRORS.generic_error)}`)
	}
}
