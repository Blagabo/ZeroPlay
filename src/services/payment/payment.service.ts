import { supabase } from "@lib/db"
import type { Payment } from "../../types/supabase/schema"

export class PaymentService {
	static async create(payment: Omit<Payment, "id" | "created_at">): Promise<Payment | null> {
		const { data, error } = await supabase.from("payments").insert([payment]).select().single()

		if (error) {
			console.error("Error creating payment:", error)
			return null
		}

		return data
	}

	static async getUserPayments(userId: string): Promise<Payment[] | null> {
		const { data, error } = await supabase
			.from("payments")
			.select("*")
			.eq("user_id", userId)
			.order("payment_date", { ascending: false })

		if (error) {
			console.error("Error fetching user payments:", error)
			return null
		}

		return data
	}

	static async updateStatus(id: string, status: Payment["status"]): Promise<Payment | null> {
		const { data, error } = await supabase
			.from("payments")
			.update({ status })
			.eq("id", id)
			.select()
			.single()

		if (error) {
			console.error("Error updating payment status:", error)
			return null
		}

		return data
	}
}
