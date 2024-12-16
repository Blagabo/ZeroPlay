import { useState, useEffect, useCallback } from "react"
import type { UserProfile } from "../../types/supabase/schema"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
	user: UserProfile
	isOpen: boolean
	onClose: () => void
}

export const UserProfileModal = ({ user, isOpen: initialIsOpen }: Props) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen)
	const [activeTab, setActiveTab] = useState<"profile" | "password">("profile")
	const [formData, setFormData] = useState({
		full_name: user.full_name || "",
		phone: user.phone || "",
	})

	const closeModal = useCallback(() => {
		setIsOpen(false)
		setActiveTab("profile")
		setFormData({
			full_name: user.full_name || "",
			phone: user.phone || 123,
		})
	}, [user])

	// Exponer método para abrir/cerrar el modal
	useEffect(() => {
		const modal = document.querySelector("[data-profile-modal]")
		if (modal) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(modal as any).__toggleModal = (value: boolean) => setIsOpen(value)
		}
	}, [])

	return (
		<div data-profile-modal>
			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closeModal}
							className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						/>

						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="glass relative w-full max-w-2xl rounded-xl p-6 sm:p-8"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold text-white">Perfil de Usuario</h2>
								<button
									onClick={closeModal}
									className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10"
								>
									<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* Tabs */}
							<div className="mb-6 flex space-x-4 border-b border-white/10">
								<button
									onClick={() => setActiveTab("profile")}
									className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
										activeTab === "profile"
											? "border-primary-500 text-primary-500"
											: "border-transparent text-white/60 hover:text-white"
									}`}
								>
									Información Personal
								</button>
								<button
									onClick={() => setActiveTab("password")}
									className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
										activeTab === "password"
											? "border-primary-500 text-primary-500"
											: "border-transparent text-white/60 hover:text-white"
									}`}
								>
									Cambiar Contraseña
								</button>
							</div>

							{/* Formularios */}
							<div className="mt-6">
								{activeTab === "profile" ? (
									<form action="/api/user/update-profile" method="POST" className="space-y-6">
										<div className="grid gap-6 md:grid-cols-2">
											<div>
												<label
													htmlFor="full_name"
													className="mb-2 block text-sm font-medium text-white/80"
												>
													Nombre Completo
												</label>
												<input
													type="text"
													id="full_name"
													name="full_name"
													value={formData.full_name}
													onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
													className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
												/>
											</div>

											<div>
												<label
													htmlFor="phone"
													className="mb-2 block text-sm font-medium text-white/80"
												>
													Teléfono
												</label>
												<input
													type="tel"
													id="phone"
													name="phone"
													value={formData.phone}
													onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
													className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
												/>
											</div>

											<div className="md:col-span-2">
												<label
													htmlFor="email"
													className="mb-2 block text-sm font-medium text-white/80"
												>
													Email
												</label>
												<input
													type="email"
													id="email"
													value={user.email}
													disabled
													className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/50"
												/>
											</div>
										</div>

										<div className="flex justify-end">
											<button
												type="submit"
												className="rounded-lg bg-primary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-600"
											>
												Guardar Cambios
											</button>
										</div>
									</form>
								) : (
									<form action="/api/user/change-password" method="POST" className="space-y-6">
										<div>
											<label
												htmlFor="current_password"
												className="mb-2 block text-sm font-medium text-white/80"
											>
												Contraseña Actual
											</label>
											<input
												type="password"
												id="current_password"
												name="current_password"
												required
												className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
											/>
										</div>

										<div>
											<label
												htmlFor="new_password"
												className="mb-2 block text-sm font-medium text-white/80"
											>
												Nueva Contraseña
											</label>
											<input
												type="password"
												id="new_password"
												name="new_password"
												required
												className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
											/>
										</div>

										<div>
											<label
												htmlFor="confirm_password"
												className="mb-2 block text-sm font-medium text-white/80"
											>
												Confirmar Nueva Contraseña
											</label>
											<input
												type="password"
												id="confirm_password"
												name="confirm_password"
												required
												className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
											/>
										</div>

										<div className="flex justify-end">
											<button
												type="submit"
												className="rounded-lg bg-secondary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-secondary-600"
											>
												Actualizar Contraseña
											</button>
										</div>
									</form>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}
