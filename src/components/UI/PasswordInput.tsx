import React, { useState } from "react"

interface PasswordInputProps {
	name: string
	id: string
	required?: boolean
	placeholder?: string
	onChange?: (value: string) => void
}

interface ValidationRule {
	id: string
	label: string
	validator: (value: string) => boolean
}

const PasswordInput = ({
	name,
	id,
	required = false,
	placeholder = "••••••••",
	onChange,
}: PasswordInputProps) => {
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const validationRules: ValidationRule[] = [
		{
			id: "length",
			label: "Al menos 8 caracteres",
			validator: (value: string) => value.length >= 8,
		},
		{
			id: "number",
			label: "Al menos 1 número",
			validator: (value: string) => /\d/.test(value),
		},
		{
			id: "lowercase",
			label: "Al menos 1 minúscula",
			validator: (value: string) => /[a-z]/.test(value),
		},
		{
			id: "uppercase",
			label: "Al menos 1 mayúscula",
			validator: (value: string) => /[A-Z]/.test(value),
		},
	]

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setPassword(newValue)
		onChange?.(newValue)
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="space-y-2">
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					name={name}
					id={id}
					required={required}
					value={password}
					onChange={handleChange}
					className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
					placeholder={placeholder}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
					aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
				>
					{showPassword ? (
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
							/>
						</svg>
					) : (
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					)}
				</button>
			</div>

			<div className="space-y-2">
				<p className="text-sm text-white/80">La contraseña debe contener:</p>
				<ul className="space-y-1">
					{validationRules.map((rule) => {
						const isValid = rule.validator(password)
						return (
							<li key={rule.id} className="flex items-center space-x-2 text-sm">
								<span
									className={`flex h-4 w-4 items-center justify-center rounded-full ${
										isValid ? "bg-green-500" : "bg-red-500"
									}`}
								>
									{isValid ? (
										<svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</span>
								<span className={isValid ? "text-white/80" : "text-white/60"}>{rule.label}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default PasswordInput
