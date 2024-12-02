export const AUTH_ERRORS = {
	INVALID_CREDENTIALS: "Credenciales inválidas. Por favor, verifica tu correo y contraseña.",
	MISSING_FIELDS: "Por favor, completa todos los campos requeridos.",
	GENERIC_ERROR: "Ha ocurrido un error. Por favor, intenta nuevamente.",
	SESSION_EXPIRED: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
} as const

export const VALIDATION_ERRORS = {
	PASSWORD_LENGTH: "La contraseña debe tener al menos 8 caracteres",
	PASSWORD_NUMBER: "La contraseña debe contener al menos un número",
	PASSWORD_LOWERCASE: "La contraseña debe contener al menos una letra minúscula",
	PASSWORD_UPPERCASE: "La contraseña debe contener al menos una letra mayúscula",
	EMAIL_INVALID: "Por favor, ingresa un correo electrónico válido",
} as const
