import { supabase } from "@lib/supabase"
import { handleAuthError } from "@utils/auth/errors"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, redirect }) => {
	try {
		const formData = await request.formData()
		const email = formData.get("email")?.toString()
		const password = formData.get("password")?.toString()

		if (!email || !password) {
			return redirect("/register?error=missing_fields")
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
		})

		if (error) {
			const errorCode = handleAuthError(error)
			return redirect(`/register?error=${errorCode}`)
		}

		return redirect("/signin?success=registration_complete")
	} catch (error) {
		console.error("Registration error:", error)
		return redirect("/register?error=generic_error")
	}
}
