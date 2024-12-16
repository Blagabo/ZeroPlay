export const filterChannels = (query: string) => {
	const groups = document.querySelectorAll("[data-channel-group]")

	groups.forEach((group) => {
		const channels = group.querySelectorAll("[data-channel]")
		let hasVisibleChannels = false

		channels.forEach((channel) => {
			const channelName = channel.textContent?.toLowerCase() || ""
			const isVisible = channelName.includes(query.toLowerCase())
			;(channel as HTMLElement).style.display = isVisible ? "flex" : "none"
			if (isVisible) hasVisibleChannels = true
		})
		;(group as HTMLElement).style.display = hasVisibleChannels ? "block" : "none"
	})
}
