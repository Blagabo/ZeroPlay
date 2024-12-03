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
		<section className="px-4 py-12 sm:py-20">
			<div className="mx-auto max-w-6xl text-center">
				<h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
					<span className="text-white">Aceptamos todos</span>
					<span className="text-primary-500"> los métodos de pago.</span>
				</h2>

				<p className="mb-8 text-sm text-white/80 sm:mb-12 sm:text-base">
					¡Pague con facilidad! Nuestra empresa acepta todos los métodos de pago para su comodidad.
				</p>

				<div className="glass h-28 overflow-hidden rounded-lg p-4 sm:h-40 sm:rounded-xl sm:p-6 md:p-8">
					<div className="relative h-auto w-full p-1">
						<motion.div className="absolute flex items-center gap-4 sm:gap-8" animate={controls}>
							{[...paymentMethods, ...paymentMethods].map((method, index) => (
								<div
									key={`${method.name}-${index}`}
									className="flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 p-3 sm:h-24 sm:w-44 sm:p-4"
								>
									<img
										src={method.logo}
										alt={`Logo de ${method.name}`}
										className="h-10 w-20 object-contain sm:h-16 sm:w-32"
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
