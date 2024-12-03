import { motion } from "framer-motion"
import type { AdminStats } from "../../types/admin"

interface StatsProps {
	stats: AdminStats
}

export const Stats = ({ stats }: StatsProps) => {
	return (
		<div className="grid gap-6 md:grid-cols-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="glass rounded-xl p-6"
			>
				<h3 className="mb-2 text-lg font-medium text-white/80">Total Usuarios</h3>
				<p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
				<span className="text-sm text-white/60">+{stats.newUsers} este mes</span>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="glass rounded-xl p-6"
			>
				<h3 className="mb-2 text-lg font-medium text-white/80">Suscripciones Activas</h3>
				<p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
				<span className="text-sm text-white/60">Tasa de renovación: {stats.renewalRate}%</span>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="glass rounded-xl p-6"
			>
				<h3 className="mb-2 text-lg font-medium text-white/80">Ingresos Mensuales</h3>
				<p className="text-3xl font-bold text-white">${stats.monthlyRevenue}</p>
				<span className={`text-sm ${stats.revenueChange >= 0 ? "text-green-400" : "text-red-400"}`}>
					{stats.revenueChange >= 0 ? "+" : ""}
					{stats.revenueChange}% vs mes anterior
				</span>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="glass rounded-xl p-6"
			>
				<h3 className="mb-2 text-lg font-medium text-white/80">Plan Más Popular</h3>
				<p className="text-3xl font-bold text-white">{stats.popularPlan}</p>
				<span className="text-sm text-white/60">{stats.popularPlanPercentage}% de usuarios</span>
			</motion.div>
		</div>
	)
}
