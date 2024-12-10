import type { Channel } from "../../types/channels"

interface Props {
	channel: Channel
}

export const ChannelCard = ({ channel }: Props) => {
	return (
		<div
			className="flex items-center justify-between rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
			data-channel
		>
			<div className="flex items-center space-x-3">
				<span className="h-2 w-2 rounded-full bg-primary-500"></span>
				<span className="text-white/90">{channel.name}</span>
			</div>
			<div className="flex items-center space-x-3">
				<span className="rounded bg-secondary-500/20 px-2 py-0.5 text-xs font-medium text-secondary-500">
					{channel.quality}
				</span>
				<div className="flex space-x-1">
					{channel.languages.map((lang) => (
						<span
							key={lang}
							className="rounded bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70"
						>
							{lang}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
