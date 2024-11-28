import { motion } from "framer-motion"
import { useState } from "react"

const testimonials = [
	{
		name: "Carlos Rodríguez",
		role: "Usuario Premium",
		content:
			"Increíble servicio. La calidad de transmisión es excelente y el soporte técnico siempre está disponible cuando lo necesito.",
		avatar: "https://i.pravatar.cc/150?img=1",
	},
	{
		name: "Ana Martínez",
		role: "Usuario Familiar",
		content:
			"Mi familia y yo estamos encantados. Poder ver contenido en varios dispositivos simultáneamente es genial.",
		avatar: "https://i.pravatar.cc/150?img=2",
	},
	{
		name: "Miguel Sánchez",
		role: "Usuario Básico",
		content:
			"La mejor relación calidad-precio que he encontrado. El servicio es muy estable y tiene todos los canales que necesito.",
		avatar: "https://i.pravatar.cc/150?img=3",
	},
]

export default function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const next = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length)
	}

	const prev = () => {
		setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
	}

	return (
		<section id="testimonios" className="px-4 py-12">
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
					Lo que dicen nuestros clientes
				</h2>

				<div className="relative">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						className="glass rounded-xl p-8"
					>
						<div className="mb-6 flex items-center">
							<img
								src={testimonials[currentIndex].avatar}
								alt={testimonials[currentIndex].name}
								className="mr-4 h-16 w-16 rounded-full"
							/>
							<div>
								<h3 className="text-xl font-semibold text-white">
									{testimonials[currentIndex].name}
								</h3>
								<p className="text-white/80">{testimonials[currentIndex].role}</p>
							</div>
						</div>
						<p className="text-lg italic text-white/90">"{testimonials[currentIndex].content}"</p>
					</motion.div>

					<div className="mt-6 flex justify-center space-x-4">
						<button
							onClick={prev}
							className="glass rounded-full p-2 text-white transition-colors hover:bg-white/20"
						>
							←
						</button>
						<button
							onClick={next}
							className="glass rounded-full p-2 text-white transition-colors hover:bg-white/20"
						>
							→
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
