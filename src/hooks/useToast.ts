import { useState } from "react"

interface ToastState {
	message: string
	type: "success" | "error" | "info"
}

export const useToast = () => {
	const [toast, setToast] = useState<ToastState | null>(null)

	const showToast = (message: string, type: ToastState["type"]) => {
		setToast({ message, type })
	}

	const hideToast = () => {
		setToast(null)
	}

	return {
		toast,
		showToast,
		hideToast,
	}
}
