import { supabase } from "@lib/supabase"

interface Subscription {
	plan_id: string
	end_date: string
	email: string
}

export const addSubscription = async (subscription: Subscription) => {
	try {
		// Verificar si existe un usuario con el correo proporcionado
		const { data: user, error: userError } = await supabase
			.from("users_profiles")
			.select("id")
			.eq("email", subscription.email)
			.single()

		if (userError) {
			console.error(`Error fetching user: ${userError.message}`)
			return null
		}

		if (!user) {
			console.error("User not found")
			return null
		}

		// Agregar la suscripción con el user_id del usuario encontrado
		const { data, error } = await supabase.from("subscriptions").insert([
			{
				user_id: user.id,
				plan_id: subscription.plan_id,
				end_date: subscription.end_date,
			},
		])

		if (error) {
			console.error(`Error adding subscription: ${error.message}`)
			return null
		}

		// Devolvemos la suscripción añadida
		return data
	} catch (error) {
		// Manejo de errores inesperados
		console.error("Unexpected error:", error)
		return null
	}
}
