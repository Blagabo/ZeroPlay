export interface Channel {
	name: string
	quality: string
	languages: string[]
}

export interface ChannelGroup {
	name: string
	icon: string
	channels: Channel[]
}

export interface Channels {
	groups: ChannelGroup[]
}

export interface ChannelGroupType {
	name: string

	icon: string

	channels: {
		name: string

		quality: string

		languages: string[]
	}[]
}
