import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BackToTop() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY || document.documentElement.scrollTop > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener("scroll", toggleVisibility)
		return () => window.removeEventListener("scroll", toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-50 rounded-full bg-primary-500 p-4 text-white shadow-lg transition-colors hover:bg-primary-600"
					aria-label="Volver arriba"
				>
					<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 10l7-7m0 0l7 7m-7-7v18"
						/>
					</svg>
				</motion.button>
			)}
		</AnimatePresence>
	)
}
