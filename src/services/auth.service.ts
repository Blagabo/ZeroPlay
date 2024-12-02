import { supabase } from "@lib/supabase"
import type { AuthResponse } from "@supabase/supabase-js"

export class AuthService {
	static async signIn(email: string, password: string): Promise<AuthResponse> {
		return await supabase.auth.signInWithPassword({
			email,
			password,
		})
	}

	static async signOut() {
		return await supabase.auth.signOut()
	}

	static async getCurrentUser() {
		return await supabase.auth.getUser()
	}
}
