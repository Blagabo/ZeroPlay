/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTH_ERRORS } from "../constants/errors"

export const handleAuthError = (error: any) => {
	console.error("Auth error:", error)

	if (error.message?.includes("Invalid login credentials")) {
		return "invalid_credentials"
	}

	if (error.message?.includes("Email not confirmed")) {
		return "email_not_confirmed"
	}

	return "generic_error"
}

export const getErrorMessage = (errorCode: string | null) => {
	if (!errorCode) return null
	return AUTH_ERRORS[errorCode as keyof typeof AUTH_ERRORS] || AUTH_ERRORS.GENERIC_ERROR
}
