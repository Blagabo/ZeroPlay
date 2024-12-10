import { useState } from "react"
import { UserFilters } from "./UserFilters"
import { UsersTable } from "./UsersTable"
import { UserModal } from "./UserModal"
import type { UserProfile } from "../../../types/supabase/schema"
import { LoadingSpinner } from "@components/UI/LoadingSpinner"

interface Props {
	initialUsers: UserProfile[]
}

export const UsersList = ({ initialUsers }: Props) => {
	const [users, setUsers] = useState(initialUsers)
	const [filteredUsers, setFilteredUsers] = useState(initialUsers)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleFilter = (filters: { search: string; role: string }) => {
		let filtered = users

		if (filters.search) {
			filtered = filtered.filter(
				(user) =>
					user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
					user.full_name?.toLowerCase().includes(filters.search.toLowerCase())
			)
		}

		if (filters.role && filters.role !== "all") {
			filtered = filtered.filter((user) => user.role === filters.role)
		}

		setFilteredUsers(filtered)
	}

	const handleEdit = (user: UserProfile) => {
		setSelectedUser(user)
		setIsModalOpen(true)
	}

	const refreshUsers = async () => {
		setIsLoading(true)
		try {
			const response = await fetch("/api/admin/users/list")
			if (!response.ok) throw new Error("Error al cargar usuarios")

			const data = await response.json()
			setUsers(data.users)
			setFilteredUsers(data.users)
		} catch (error) {
			console.error("Error refreshing users:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="glass rounded-xl p-6">
			<div className="mb-6 flex items-center justify-between">
				<UserFilters onFilter={handleFilter} />
				<button
					onClick={refreshUsers}
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

			<UsersTable users={filteredUsers} onEdit={handleEdit} />

			<UserModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					setSelectedUser(null)
					refreshUsers()
				}}
				user={selectedUser}
			/>
		</div>
	)
}
