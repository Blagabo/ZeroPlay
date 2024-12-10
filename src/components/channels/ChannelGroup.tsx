import { motion } from "framer-motion"
import type { ChannelGroupType } from "../../types/channels"
import { ChannelCard } from "./ChannelCard"

interface Props {
	group: ChannelGroupType
	index: number
}

export const ChannelGroup = ({ group, index }: Props) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			className="glass rounded-xl p-6"
		>
			<div className="mb-4 flex items-center space-x-3">
				<span className="text-2xl">{group.icon}</span>
				<h2 className="text-xl font-semibold text-white">{group.name}</h2>
				<span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">
					{group.channels.length}
				</span>
			</div>
			<div className="space-y-3">
				{group.channels.map((channel) => (
					<ChannelCard key={channel.name} channel={channel} />
				))}
			</div>
		</motion.div>
	)
}
