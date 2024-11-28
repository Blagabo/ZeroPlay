export const SITE_CONFIG = {
	name: "ZeroPlay",
	description: "Tu mejor opción en entretenimiento",
	contact: {
		email: "soporte@zeroplay.com",
		phone: "+1234567890",
		instagram: "https://ig.me/m/zeroplay.tv",
	},
	seo: {
		title: "ZeroPlay - Servicio Premium de IPTV",
		description:
			"Disfruta de miles de canales y contenido bajo demanda en alta calidad. Películas, series y eventos deportivos en vivo.",
		keywords: "iptv, streaming, películas, series, tv en vivo, deportes",
		ogImage: "/og-image.jpg",
		twitterHandle: "@zeroplay",
	},
}

export const META_DEFAULTS = {
	title: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
	description: SITE_CONFIG.seo.description,
	og: {
		type: "website",
		locale: "es_ES",
		site_name: SITE_CONFIG.name,
		image: SITE_CONFIG.seo.ogImage,
	},
	twitter: {
		card: "summary_large_image",
		site: SITE_CONFIG.seo.twitterHandle,
	},
}
