import { supabase } from "@lib/db"
import type { Subscription } from "../../types/supabase/schema"

export class SubscriptionService {
	static async getUserSubscription(userId: string): Promise<Subscription | null> {
		const { data, error } = await supabase
			.from("subscriptions")
			.select("*")
			.eq("user_id", userId)
			.eq("is_active", true)
			.single()

		if (error) {
			console.error("Error fetching subscription:", error)
			return null
		}

		return data
	}

	static async getAllSubscriptions(active?: boolean): Promise<Subscription[] | null> {
		let query = supabase.from("subscriptions").select("*")

		if (typeof active !== "undefined") {
			query = query.eq("is_active", active)
		}

		const { data, error } = await query.order("created_at", { ascending: false })

		if (error) {
			console.error("Error fetching subscriptions:", error)
			return null
		}

		return data
	}

	static async create(
		subscription: Omit<Subscription, "id" | "created_at">
	): Promise<Subscription | null> {
		const { data, error } = await supabase
			.from("subscriptions")
			.insert([subscription])
			.select()
			.single()

		if (error) {
			console.error("Error creating subscription:", error)
			return null
		}

		return data
	}

	static async update(id: string, updates: Partial<Subscription>): Promise<Subscription | null> {
		const { data, error } = await supabase
			.from("subscriptions")
			.update(updates)
			.eq("id", id)
			.select()
			.single()

		if (error) {
			console.error("Error updating subscription:", error)
			return null
		}

		return data
	}

	static async cancel(id: string): Promise<Subscription | null> {
		return await this.update(id, {
			is_active: false,
			status: "cancelled",
		})
	}
}
