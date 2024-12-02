import { supabase } from "@lib/supabase"
import type { UserProfile } from "../types/supabase"

export class UserService {
	static async getUserProfile(userId: string) {
		const { data, error } = await supabase
			.from("users_profiles")
			.select("*")
			.eq("id", userId)
			.single()

		if (error) throw error
		return data as UserProfile
	}

	static async updateUserProfile(userId: string, profile: Partial<UserProfile>) {
		const { data, error } = await supabase.from("users_profiles").update(profile).eq("id", userId)

		if (error) throw error
		return data
	}
}
