export interface UserProfile {
	id: string
	role: "admin" | "user"
	created_at: string
}

export interface Subscription {
	id: string
	user_id: string
	plan: string
	status: "active" | "cancelled" | "expired"
	devices_limit: number
	expires_at: string
}
