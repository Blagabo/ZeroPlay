export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
	public: {
		Tables: {
			users_profiles: {
				Row: {
					id: string
					email: string
					full_name: string | null
					phone: string | null
					role: string
					created_at: string
					updated_at: string
				}
				Insert: {
					id: string
					email: string
					full_name?: string | null
					phone?: string | null
					role?: string
					created_at?: string
					updated_at?: string
				}
				Update: {
					email?: string
					full_name?: string | null
					phone?: string | null
					role?: string
					updated_at?: string
				}
			}
			subscriptions: {
				Row: {
					id: string
					user_id: string
					plan_id: string
					is_active: boolean
					start_date: string
					end_date: string
					payment_cycle: string
					status: string
					created_at: string
				}
				Insert: {
					user_id: string
					plan_id: string
					is_active?: boolean
					start_date?: string
					end_date: string
					payment_cycle: string
					status?: string
				}
				Update: {
					is_active?: boolean
					end_date?: string
					status?: string
				}
			}
			plans: {
				Row: {
					id: string
					name: string
					max_devices: number
					price_monthly: number
					price_quarterly: number
					price_annual: number
					created_at: string
				}
				Insert: {
					name: string
					max_devices: number
					price_monthly: number
					price_quarterly: number
					price_annual: number
				}
				Update: {
					name?: string
					max_devices?: number
					price_monthly?: number
					price_quarterly?: number
					price_annual?: number
				}
			}
			payments: {
				Row: {
					id: string
					user_id: string
					subscription_id: string
					amount: number
					payment_date: string
					payment_method: string
					status: string
					created_at: string
				}
				Insert: {
					user_id: string
					subscription_id: string
					amount: number
					payment_date?: string
					payment_method: string
					status?: string
				}
				Update: {
					status?: string
					payment_date?: string
				}
			}
		}
	}
}
