export interface AdminStats {
	totalUsers: number
	newUsers: number
	activeSubscriptions: number
	renewalRate: number
	monthlyRevenue: number
	revenueChange: number
	popularPlan: string
	popularPlanPercentage: number
}

export interface AdminTableFilters {
	search: string
	status: string
	plan: string
	dateRange: [Date | null, Date | null]
}

export interface UserSubscription {
	id: string
	plan_id: string
	is_active: boolean
	end_date: string
}

export interface UserWithSubscription {
	id: string
	email: string
	role: string
	created_at: string
	subscriptions: UserSubscription[]
}
