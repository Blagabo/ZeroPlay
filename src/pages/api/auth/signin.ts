import { AuthService } from "@services/database/auth.service"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	try {
		const formData = await request.formData()
		const email = formData.get("email")?.toString()
		const password = formData.get("password")?.toString()

		if (!email || !password) {
			return redirect("/signin?error=missing_fields")
		}

		const { data, error } = await AuthService.signIn(email, password)

		if (error) {
			console.error("Error de inicio de sesión:", error.message)
			return redirect("/signin?error=invalid_credentials")
		}

		if (!data.session) {
			return redirect("/signin?error=generic_error")
		}

		const { access_token, refresh_token } = data.session

		cookies.set("sb-access-token", access_token, {
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24, // 24 horas
		})

		cookies.set("sb-refresh-token", refresh_token, {
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 días
		})

		return redirect("/dashboard")
	} catch (error) {
		console.error("Error inesperado:", error)
		return redirect("/signin?error=generic_error")
	}
}
