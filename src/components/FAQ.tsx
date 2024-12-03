import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
	{
		question: "¿Qué es IPTV?",
		answer:
			"IPTV (Internet Protocol Television) es una forma moderna de ver televisión que utiliza tu conexión a Internet para transmitir contenido. A diferencia de la TV tradicional, no necesitas antenas ni cables, solo un dispositivo conectado a Internet, como una Smart TV, celular, computadora o decodificador.",
	},
	{
		question: "¿En qué dispositivos puedo ver el contenido?",
		answer:
			"Puedes disfrutar de nuestro servicio en Smart TVs, smartphones, tablets, computadoras y dispositivos de streaming como Roku, Fire TV Stick o Android TV Box.",
	},
	{
		question: "¿Ofrecen periodo de prueba?",
		answer:
			"Sí, ofrecemos un periodo de prueba de 24 horas para que puedas evaluar nuestro servicio antes de suscribirte.",
	},
	{
		question: "¿Cómo es el proceso de instalación?",
		answer:
			"El proceso es muy sencillo. Una vez realizada la suscripción, recibirás las credenciales y guías de instalación para configurar el servicio en tus dispositivos.",
	},
	{
		question: "¿Necesito una velocidad específica de internet?",
		answer:
			"Recomendamos una conexión de al menos 10 Mbps para contenido HD y 25 Mbps para contenido 4K para una experiencia óptima.",
	},
]

const FAQItem = ({
	question,
	answer,
	isOpen,
	onToggle,
}: {
	question: string
	answer: string
	isOpen: boolean
	onToggle: () => void
}) => {
	return (
		<div className="glass overflow-hidden rounded-xl">
			<button
				onClick={onToggle}
				className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
			>
				<h3 className="text-xl font-semibold text-white">{question}</h3>
				<motion.span
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					className="text-white"
				>
					↓
				</motion.span>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<p className="px-6 pb-6 text-white/80">{answer}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section id="faq" className="px-4 py-20">
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
					Preguntas Frecuentes
				</h2>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<FAQItem
							key={index}
							question={faq.question}
							answer={faq.answer}
							isOpen={openIndex === index}
							onToggle={() => handleToggle(index)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default FAQ
