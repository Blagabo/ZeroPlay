import React, { useState } from "react"
import { filterChannels } from "@utils/channels/search"

interface Props {
	totalChannels: number
}

export const SearchChannels = ({ totalChannels }: Props) => {
	const [searchQuery, setSearchQuery] = useState("")

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setSearchQuery(query)
		filterChannels(query)
	}

	return (
		<div className="mb-8">
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={handleSearch}
					placeholder="Buscar canales..."
					className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pl-10 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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
			<div className="mt-2 flex justify-between text-sm text-white/60">
				<span>Total de canales: {totalChannels}</span>
				{searchQuery && (
					<button
						onClick={() => {
							setSearchQuery("")
							filterChannels("")
						}}
						className="text-primary-500 hover:text-primary-400"
					>
						Limpiar búsqueda
					</button>
				)}
			</div>
		</div>
	)
}
