import { supabase } from "@lib/supabase"
import type { Plan } from "../../types/supabase/schema"

export class PlanService {
	static async getAll(): Promise<Plan[] | null> {
		const { data, error } = await supabase
			.from("plans")
			.select("*")
			.order("max_devices", { ascending: true })

		if (error) {
			console.error("Error fetching plans:", error)
			return null
		}

		return data
	}

	static async getById(id: string): Promise<Plan | null> {
		const { data, error } = await supabase.from("plans").select("*").eq("id", id).single()

		if (error) {
			console.error("Error fetching plan:", error)
			return null
		}

		return data
	}
}
