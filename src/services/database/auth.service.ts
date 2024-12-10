import { supabase } from "@lib/supabase"
import type { AuthResponse, User } from "@supabase/supabase-js"

export class AuthService {
	static async signIn(email: string, password: string): Promise<AuthResponse> {
		return await supabase.auth.signInWithPassword({
			email,
			password,
		})
	}

	static async signUp(email: string, password: string): Promise<AuthResponse> {
		return await supabase.auth.signUp({
			email,
			password,
		})
	}

	static async signOut() {
		return await supabase.auth.signOut()
	}

	static async getUser(): Promise<{ data: { user: User | null }; error: unknown }> {
		return await supabase.auth.getUser()
	}

	static async validateSession(accessToken: string, refreshToken: string) {
		try {
			const { data, error } = await supabase.auth.setSession({
				refresh_token: refreshToken,
				access_token: accessToken,
			})

			if (error || !data.session) {
				return { isValid: false, user: null }
			}

			return { isValid: true, user: data.user }
		} catch (error) {
			console.error("Error validating session:", error)
			return { isValid: false, user: null }
		}
	}
}
