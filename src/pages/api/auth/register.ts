import { AuthService } from "@services/database/auth.service"
import { UserService } from "@services/database/user.service"
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

		const { data, error } = await AuthService.signUp(email, password)

		if (error) {
			const errorCode = handleAuthError(error)
			return redirect(`/register?error=${errorCode}`)
		}

		if (data.user) {
			await UserService.createProfile(data.user.id, email)
		}

		return redirect("/signin?success=registration_complete")
	} catch (error) {
		console.error("Registration error:", error)
		return redirect("/register?error=generic_error")
	}
}
