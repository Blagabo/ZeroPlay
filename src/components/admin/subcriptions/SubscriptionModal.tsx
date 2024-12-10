import React, { useState, useEffect } from "react"
import type { Subscription } from "../../../types/supabase/schema"
import { Toast } from "@components/UI/Toast"

interface Props {
	isOpen: boolean
	onClose: () => void
	subscription: Subscription | null
}

export const SubscriptionModal = ({ isOpen, onClose, subscription }: Props) => {
	const [formData, setFormData] = useState({
		status: "",
		end_date: "",
		is_active: false,
	})
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	useEffect(() => {
		if (subscription) {
			setFormData({
				status: subscription.status,
				end_date: subscription.end_date.split("T")[0],
				is_active: subscription.is_active,
			})
		}
	}, [subscription])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!subscription) return

		try {
			const response = await fetch("/api/admin/subscriptions/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					subscriptionId: subscription.id,
					updates: formData,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Error al actualizar la suscripción")
			}

			setSuccess("Suscripción actualizada correctamente")
			setTimeout(() => {
				onClose()
				setSuccess("")
			}, 2000)
		} catch (error) {
			setError(error instanceof Error ? error.message : "Error al actualizar la suscripción")
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="glass w-full max-w-md rounded-lg p-6">
				<h2 className="mb-4 text-xl font-semibold text-white">Editar Suscripción</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="status" className="mb-1 block text-sm text-white/80">
							Estado
						</label>
						<select
							id="status"
							value={formData.status}
							onChange={(e) => setFormData({ ...formData, status: e.target.value })}
							className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-white"
						>
							<option value="active">Activa</option>
							<option value="pending">Pendiente</option>
							<option value="cancelled">Cancelada</option>
						</select>
					</div>

					<div>
						<label htmlFor="end_date" className="mb-1 block text-sm text-white/80">
							Fecha de finalización
						</label>
						<input
							id="end_date"
							type="date"
							value={formData.end_date}
							onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
							className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-white"
						/>
					</div>

					<div className="flex items-center space-x-2">
						<input
							id="is_active"
							type="checkbox"
							checked={formData.is_active}
							onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
							className="rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
						/>
						<label htmlFor="is_active" className="text-sm text-white/80">
							Suscripción activa
						</label>
					</div>

					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="rounded bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
						>
							Guardar
						</button>
					</div>
				</form>

				{error && <Toast message={error} type="error" onClose={() => setError("")} />}
				{success && <Toast message={success} type="success" onClose={() => setSuccess("")} />}
			</div>
		</div>
	)
}
