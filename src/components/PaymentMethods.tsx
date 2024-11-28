import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"

const paymentMethods = [
	{ name: "PayPal", logo: "/logos/paypal.svg" },
	{ name: "Visa", logo: "/logos/visa.svg" },
	{ name: "Mastercard", logo: "/logos/mastercard.svg" },
	{ name: "Bitcoin", logo: "/logos/bitcoin.svg" },
	{ name: "Ethereum", logo: "/logos/ethereum.svg" },
	{ name: "USDT", logo: "/logos/usdt.svg" },
	{ name: "Binance", logo: "/logos/binance.svg" },
]

const PaymentMethods = () => {
	const controls = useAnimationControls()

	useEffect(() => {
		const startAnimation = async () => {
			await controls.start({
				x: [0, -(paymentMethods.length * 208)],
				transition: {
					duration: 20,
					ease: "linear",
					repeat: Infinity,
				},
			})
		}

		startAnimation()
	}, [controls])

	return (
		<section className="px-4 py-20">
			<div className="mx-auto max-w-6xl text-center">
				<h2 className="text-3xl font-bold md:text-4xl">
					<span className="text-white">Aceptamos todos</span>
					<span className="text-primary-500"> los métodos de pago.</span>
				</h2>

				<p className="mb-12 mt-4 text-lg text-white/80">
					¡Pague con facilidad! Nuestra empresa acepta todos los métodos de pago para su comodidad.
				</p>

				<div className="glass h-40 overflow-hidden rounded-xl p-8">
					<div className="relative h-auto w-full">
						<motion.div className="absolute flex items-center gap-8" animate={controls}>
							{[...paymentMethods, ...paymentMethods].map((method, index) => (
								<div
									key={`${method.name}-${index}`}
									className="flex h-24 w-44 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 p-4"
								>
									<img
										src={method.logo}
										alt={`Logo de ${method.name}`}
										className="h-16 w-32 object-contain"
										loading="lazy"
									/>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PaymentMethods
