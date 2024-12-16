import { AuthService } from "@services"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies, redirect }) => {
	await AuthService.signOut()
	cookies.delete("sb-access-token", { path: "/" })
	cookies.delete("sb-refresh-token", { path: "/" })
	return redirect("/signin")
}
