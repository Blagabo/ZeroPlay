import React, { useState, useEffect } from "react"
import type { UserProfile } from "../../../types/supabase/schema"
import { Toast } from "@components/UI/Toast"

interface Props {
	isOpen: boolean
	onClose: () => void
	user: UserProfile | null
}

export const UserModal = ({ isOpen, onClose, user }: Props) => {
	const [formData, setFormData] = useState({
		full_name: "",
		phone: "",
		role: "authenticated",
	})
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	useEffect(() => {
		if (user) {
			setFormData({
				full_name: user.full_name || "",
				phone: user.phone || "",
				role: user.role,
			})
		}
	}, [user])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) return

		try {
			const response = await fetch("/api/admin/users/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					updates: formData,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Error al actualizar el usuario")
			}

			setSuccess("Usuario actualizado correctamente")
			setTimeout(() => {
				onClose()
				setSuccess("")
			}, 2000)
		} catch (error) {
			setError(error instanceof Error ? error.message : "Error al actualizar el usuario")
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="glass w-full max-w-md rounded-lg p-6">
				<h2 className="mb-4 text-xl font-semibold text-white">Editar Usuario</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="full_name" className="mb-1 block text-sm text-white/80">
							Nombre completo
						</label>
						<input
							id="full_name"
							type="text"
							value={formData.full_name}
							onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
							className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-white"
						/>
					</div>

					<div>
						<label htmlFor="phone" className="mb-1 block text-sm text-white/80">
							Teléfono
						</label>
						<input
							id="phone"
							type="text"
							value={formData.phone}
							onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
							className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-white"
						/>
					</div>

					<div>
						<label htmlFor="role" className="mb-1 block text-sm text-white/80">
							Rol
						</label>
						<select
							id="role"
							value={formData.role}
							onChange={(e) =>
								setFormData({ ...formData, role: e.target.value as "admin" | "authenticated" })
							}
							className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-white"
						>
							<option value="authenticated">Usuario</option>
							<option value="admin">Administrador</option>
						</select>
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
