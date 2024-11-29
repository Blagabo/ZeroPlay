import { supabase } from "@lib/supabase"

export const getUserSubscription = async (userId: string) => {
	try {
		// Intentar obtener la suscripción activa
		const { data: subscription, error: subscriptionError } = await supabase
			.from("subscriptions")
			.select("id, plan_id, start_date, end_date, is_active")
			.eq("user_id", userId)
			.eq("is_active", true)
			.single()

		// Si no se encuentra una suscripción activa, no lanzamos error, solo devolvemos un valor predeterminado
		if (subscriptionError || !subscription) {
			console.warn(
				`No active subscription found for user ${userId}. Returning default subscription value.`
			)
			// Retornamos una suscripción con valor 0 o null
			return { subscription: null }
		}

		// Si ambos datos son correctos, devolvemos los datos
		return { subscription }
	} catch (error) {
		// Capturamos cualquier otro error inesperado
		console.error("Unexpected error:", error)
		return { subscription: null }
	}
}
