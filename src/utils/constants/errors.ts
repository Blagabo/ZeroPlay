export const AUTH_ERRORS = {
	invalid_credentials: "Credenciales inválidas. Por favor, verifica tu correo y contraseña.",
	missing_fields: "Por favor, completa todos los campos requeridos.",
	generic_error: "Ha ocurrido un error. Por favor, intenta nuevamente.",
	session_expired: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
	email_not_confirmed: "Por favor, confirma tu correo electrónico antes de iniciar sesión.",
	unauthorized: "No tienes permisos para acceder a esta sección.",
} as const

export const VALIDATION_ERRORS = {
	password_length: "La contraseña debe tener al menos 8 caracteres",
	password_number: "La contraseña debe contener al menos un número",
	password_lowercase: "La contraseña debe contener al menos una letra minúscula",
	password_uppercase: "La contraseña debe contener al menos una letra mayúscula",
	email_invalid: "Por favor, ingresa un correo electrónico válido",
} as const
