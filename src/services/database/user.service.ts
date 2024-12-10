import { supabase } from "@lib/supabase"
import type { UserProfile } from "../../types/supabase/schema"

export class UserService {
	static async createProfile(userId: string, email: string): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from("users_profiles")
			.insert([
				{
					id: userId,
					email,
					role: "user",
				},
			])
			.select()
			.single()

		if (error) {
			console.error("Error creating user profile:", error)
			return null
		}

		return data
	}

	static async getProfile(userId: string): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from("users_profiles")
			.select("*")
			.eq("id", userId)
			.single()

		if (error) {
			console.error("Error fetching user profile:", error)
			return null
		}

		return data
	}

	static async updateProfile(
		userId: string,
		updates: Partial<UserProfile>
	): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from("users_profiles")
			.update(updates)
			.eq("id", userId)
			.select()
			.single()

		if (error) {
			console.error("Error updating user profile:", error)
			return null
		}

		return data
	}

	static async validateRole(userId: string, role: string): Promise<boolean> {
		const { data, error } = await supabase
			.from("users_profiles")
			.select("role")
			.eq("id", userId)
			.single()

		if (error || !data) {
			return false
		}

		return data.role === role
	}

	static async getAllUsers(): Promise<UserProfile[] | null> {
		const { data, error } = await supabase.from("users_profiles").select("*")

		if (error) {
			console.error("Error fetching users:", error)
			return null
		}

		return data
	}
}
