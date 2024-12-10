import type { UserProfile } from "../../../types/supabase/schema"

interface Props {
	users: UserProfile[]
	onEdit: (user: UserProfile) => void
}

export const UsersTable = ({ users, onEdit }: Props) => {
	return (
		<div className="overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b border-white/10 text-left">
						<th className="px-4 py-3 text-sm font-medium text-white/80">Email</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Nombre</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Rol</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Teléfono</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Fecha de registro</th>
						<th className="px-4 py-3 text-sm font-medium text-white/80">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className="border-b border-white/5">
							<td className="px-4 py-3 text-white">{user.email}</td>
							<td className="px-4 py-3 text-white">{user.full_name || "-"}</td>
							<td className="px-4 py-3">
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium ${
										user.role === "admin"
											? "bg-primary-500/20 text-primary-500"
											: "bg-secondary-500/20 text-secondary-500"
									}`}
								>
									{user.role}
								</span>
							</td>
							<td className="px-4 py-3 text-white">{user.phone || "-"}</td>
							<td className="px-4 py-3 text-white">
								{new Date(user.created_at).toLocaleDateString()}
							</td>
							<td className="px-4 py-3">
								<button
									onClick={() => onEdit(user)}
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
