import { useState } from "react"
import { SubscriptionFilters } from "./SubscriptionFilters"
import { SubscriptionsTable } from "./SubscriptionsTable"
import { SubscriptionModal } from "./SubscriptionModal"
import type { Subscription } from "../../../types/supabase/schema"
import { LoadingSpinner } from "@components/UI/LoadingSpinner"

interface Props {
	initialSubscriptions: Subscription[]
}

export const SubscriptionsList = ({ initialSubscriptions }: Props) => {
	const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
	const [filteredSubscriptions, setFilteredSubscriptions] = useState(initialSubscriptions)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleFilter = (filters: { search: string; status: string }) => {
		let filtered = subscriptions

		if (filters.search) {
			filtered = filtered.filter(
				(sub) =>
					sub.user_id.toLowerCase().includes(filters.search.toLowerCase()) ||
					sub.plan_id.toLowerCase().includes(filters.search.toLowerCase())
			)
		}

		if (filters.status && filters.status !== "all") {
			filtered = filtered.filter((sub) => sub.status === filters.status)
		}

		setFilteredSubscriptions(filtered)
	}

	const handleEdit = (subscription: Subscription) => {
		setSelectedSubscription(subscription)
		setIsModalOpen(true)
	}

	const refreshSubscriptions = async () => {
		setIsLoading(true)
		try {
			const response = await fetch("/api/admin/subscriptions/list")
			if (!response.ok) throw new Error("Error al cargar suscripciones")

			const data = await response.json()
			setSubscriptions(data.subscriptions)
			setFilteredSubscriptions(data.subscriptions)
		} catch (error) {
			console.error("Error refreshing subscriptions:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="glass rounded-xl p-6">
			<div className="mb-6 flex items-center justify-between">
				<SubscriptionFilters onFilter={handleFilter} />
				<button
					onClick={refreshSubscriptions}
					disabled={isLoading}
					className="flex items-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
				>
					{isLoading ? (
						<LoadingSpinner size="sm" />
					) : (
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					)}
					<span>Actualizar</span>
				</button>
			</div>

			<SubscriptionsTable subscriptions={filteredSubscriptions} onEdit={handleEdit} />

			<SubscriptionModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					setSelectedSubscription(null)
					refreshSubscriptions()
				}}
				subscription={selectedSubscription}
			/>
		</div>
	)
}
