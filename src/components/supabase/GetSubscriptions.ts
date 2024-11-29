import { supabase } from "@lib/supabase"

export const getSubscriptions = async (active: undefined = undefined) => {
	if (active === undefined) {
		try {
			const { data: subscriptions, error } = await supabase
				.from("subscriptions")
				.select("id, user_id, plan_id, start_date, end_date, is_active")

			if (error) {
				console.error(`Error fetching subscriptions: ${error.message}`)
				return null
			}

			// Devolvemos las suscripciones obtenidas
			return subscriptions
		} catch (error) {
			// Manejo de errores inesperados
			console.error("Unexpected error:", error)
			return null
		}
	} else {
		try {
			const { data: subscriptions, error } = await supabase
				.from("subscriptions")
				.select("id, user_id, plan_id, start_date, end_date, is_active")
				.eq("is_active", active)

			if (error) {
				console.error(`Error fetching subscriptions: ${error.message}`)
				return null
			}

			// Devolvemos las suscripciones obtenidas
			return subscriptions
		} catch (error) {
			// Manejo de errores inesperados
			console.error("Unexpected error:", error)
			return null
		}
	}
}
