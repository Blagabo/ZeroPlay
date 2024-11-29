export interface UserProfile {
	id: string
	role: "admin" | "user" | "authenticated"
	email: string
	phone: string
	email_verified: boolean
	phone_verified: boolean
	created_at: string
}

export interface Subscription {
	id: string
	user_id: string
	plan_id: string
	status: "active" | "cancelled" | "expired"
	devices_limit: number
	expires_at: string
}
