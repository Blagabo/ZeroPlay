import { supabase } from "@lib/supabase"

export const validateUserRole = async (userId: string, requiredRole: string) => {
	try {
		const { data: profile, error } = await supabase
			.from("users_profiles")
			.select("role")
			.eq("id", userId)
			.single()

		if (error || !profile) {
			return false
		}

		return profile.role === requiredRole
	} catch (error) {
		console.error("Error validating user role:", error)
		return false
	}
}
