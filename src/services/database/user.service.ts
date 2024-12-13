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
					full_name: null,
					phone: null,
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
		updates: { full_name: string | null; phone: number | null }
	): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from("users_profiles")
			.update({
				full_name: updates.full_name,
				phone: updates.phone,
				updated_at: new Date().toISOString(),
			})
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
		const profile = await this.getProfile(userId)
		return profile?.role === role
	}

	static async getAllUsers(): Promise<UserProfile[] | null> {
		const { data, error } = await supabase
			.from("users_profiles")
			.select("*")
			.order("created_at", { ascending: false })

		if (error) {
			console.error("Error fetching users:", error)
			return null
		}

		return data
	}
}
