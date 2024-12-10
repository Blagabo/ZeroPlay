import { useState } from "react"

interface Props {
	onFilter: (filters: { search: string; role: string }) => void
}

export const UserFilters = ({ onFilter }: Props) => {
	const [search, setSearch] = useState("")
	const [role, setRole] = useState("all")

	const handleSearch = (value: string) => {
		setSearch(value)
		onFilter({ search: value, role })
	}

	const handleRoleChange = (value: string) => {
		setRole(value)
		onFilter({ search, role: value })
	}

	return (
		<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="relative flex-1">
				<input
					type="text"
					placeholder="Buscar usuarios..."
					value={search}
					onChange={(e) => handleSearch(e.target.value)}
					className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pl-10 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
				/>
				<svg
					className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>

			<select
				value={role}
				onChange={(e) => handleRoleChange(e.target.value)}
				className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
			>
				<option value="all">Todos los roles</option>
				<option value="admin">Administrador</option>
				<option value="authenticated">Usuario</option>
			</select>
		</div>
	)
}
