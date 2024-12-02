import { motion } from "framer-motion"

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg"
	color?: string
}

const sizes = {
	sm: "h-4 w-4",
	md: "h-6 w-6",
	lg: "h-8 w-8",
}

export const LoadingSpinner = ({ size = "md", color = "text-white" }: LoadingSpinnerProps) => {
	return (
		<div className="flex items-center justify-center">
			<motion.div
				className={`${sizes[size]} ${color} animate-spin rounded-full border-2 border-current border-t-transparent`}
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	)
}
