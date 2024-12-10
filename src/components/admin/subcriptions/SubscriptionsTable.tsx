import type { Subscription } from "../../../types/supabase/schema"

interface Props {
	subscriptions: Subscription[]
	onEdit: (subscription: Subscription) => void
}

export const SubscriptionsTable = ({ subscriptions, onEdit }: Props) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-500/20 text-green-500"
			case "pending":
				return "bg-yellow-500/20 text-yellow-500"
			case "cancelled":
				return "bg-red-500/20 text-red-500"
			default:
				return "bg-gray-500/20 text-gray-500"
		}
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-white/10 text-left">
						<th className="px-4 py-3 text-sm font-medium text-white/80">ID Usuario</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Plan</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Estado</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Ciclo de Pago</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Fecha Fin</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{subscriptions.map((subscription) => (
						<tr key={subscription.id} className="border-b border-white/5">
							<td className="px-4 py-3 text-white">{subscription.user_id}</td>
							<td className="px-4 py-3 text-white">{subscription.plan_id}</td>
							<td className="px-4 py-3">
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
										subscription.status
									)}`}
								>
									{subscription.status}
								</span>
							</td>
							<td className="px-4 py-3 text-white">{subscription.payment_cycle}</td>
							<td className="px-4 py-3 text-white">
								{new Date(subscription.end_date).toLocaleDateString()}
							</td>
							<td className="px-4 py-3">
								<button
									onClick={() => onEdit(subscription)}
									className="rounded bg-white/10 px-2 py-1 text-sm text-white transition-colors hover:bg-white/20"
								>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
