export interface UserProfile {
	id: string
	email: string
	full_name: string | null
	phone: number | null
	role: "admin" | "authenticated"
	created_at: string
	updated_at: string
}

export interface Subscription {
	id: string
	user_id: string
	plan_id: string
	is_active: boolean
	start_date: string
	end_date: string
	payment_cycle: "monthly" | "quarterly" | "annual"
	status: "active" | "pending" | "cancelled"
	created_at: string
}

export interface Plan {
	id: string
	name: string
	max_devices: number
	price_monthly: number
	price_quarterly: number
	price_annual: number
	created_at: string
}

export interface Payment {
	id: string
	user_id: string
	subscription_id: string
	amount: number
	payment_date: string
	payment_method: string
	status: "pending" | "completed" | "failed"
	created_at: string
}
