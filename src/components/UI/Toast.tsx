import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ToastProps {
	message: string
	type: "success" | "error" | "info"
	duration?: number
	onClose: () => void
}

export const Toast = ({ message, type, duration = 3000, onClose }: ToastProps) => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
			onClose()
		}, duration)

		return () => clearTimeout(timer)
	}, [duration, onClose])

	const colors = {
		success: "bg-green-500",
		error: "bg-red-500",
		info: "bg-blue-500",
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					className={`fixed bottom-4 right-4 z-50 rounded-lg ${colors[type]} p-4 text-white shadow-lg`}
				>
					<div className="flex items-center space-x-2">
						<span>{message}</span>
						<button
							onClick={() => {
								setIsVisible(false)
								onClose()
							}}
							className="ml-2 rounded-full p-1 hover:bg-white/20"
						>
							✕
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
