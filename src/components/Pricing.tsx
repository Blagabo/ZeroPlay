import { useState } from "react"
import Button from "./UI/Button"

interface PlanPricing {
	devices: {
		[key: number]: {
			monthly: number
			quarterly: number
			annual: number
		}
	}
}

const pricing: PlanPricing = {
	devices: {
		1: {
			monthly: 10,
			quarterly: 27,
			annual: 96,
		},
		2: {
			monthly: 18,
			quarterly: 48,
			annual: 172,
		},
		3: {
			monthly: 25,
			quarterly: 67,
			annual: 240,
		},
	},
}

const features = [
	"10000+ canales de TV en vivo",
	"120K+ Películas y Series",
	"Películas y series actualizadas",
	"Calidad SD/HD/FULL HD/4K",
	"Netflix / Disney+ / HBO / ESPN+",
	"Soporte 24/7",
]

const PricingComponent = () => {
	const [selectedDevices, setSelectedDevices] = useState(2)

	return (
		<section id="planes" className="px-4 py-12 sm:py-20">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
					Planes y Precios
				</h2>

				{/* Device Selection */}
				<div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-4">
					{[1, 2, 3].map((devices) => (
						<button
							key={devices}
							onClick={() => setSelectedDevices(devices)}
							className={`relative rounded-lg px-4 py-3 font-semibold transition-all duration-300 sm:px-8 sm:py-4 ${
								selectedDevices === devices
									? "z-10 scale-105 bg-primary-500 text-white shadow-lg shadow-primary-500/30"
									: "glass text-white/80 hover:scale-95 hover:bg-white/10 hover:text-white"
							}`}
						>
							<div className="flex items-center space-x-2">
								<span className="text-base sm:text-lg">{devices}</span>
								<span className="text-sm sm:text-base">
									{devices === 1 ? "Dispositivo" : "Dispositivos"}
								</span>
							</div>
							{selectedDevices === devices && (
								<div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-secondary-500" />
							)}
						</button>
					))}
				</div>

				{/* Pricing Cards */}
				<div className="grid gap-6 sm:gap-8 md:grid-cols-3">
					{["monthly", "quarterly", "annual"].map((period, index) => {
						const months = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12
						const price =
							pricing.devices[selectedDevices][period as keyof (typeof pricing.devices)[number]]
						const monthlyPrice = (price / months).toFixed(2)
						const savings =
							period !== "monthly"
								? ((1 - price / (pricing.devices[selectedDevices].monthly * months)) * 100).toFixed(
										0
									)
								: 0

						return (
							<div
								key={period}
								className={`glass relative rounded-xl p-4 sm:p-6 ${
									index === 1 ? "transform md:-translate-y-4" : ""
								}`}
							>
								{index === 1 && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
										<span className="rounded-full bg-secondary-500 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:text-sm">
											Más Popular
										</span>
									</div>
								)}

								<h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
									{period === "monthly"
										? "Mensual"
										: period === "quarterly"
											? "Trimestral"
											: "Anual"}
								</h3>
								<div className="mb-2">
									<span className="text-2xl font-bold text-white sm:text-4xl">${price}</span>
									<span className="text-sm text-white/80 sm:text-base">
										/{period === "monthly" ? "mes" : period === "quarterly" ? "3 meses" : "año"}
									</span>
								</div>
								<p className="mb-4 text-xs text-white/80 sm:text-sm">
									${monthlyPrice}/mes
									{Number(savings) > 0 && (
										<span className="ml-2 text-secondary-500">¡{savings}% ahorro!</span>
									)}
								</p>

								<ul className="mb-6 space-y-2 sm:space-y-3">
									{features.map((feature) => (
										<li
											key={feature}
											className="flex items-center text-sm text-white/90 sm:text-base"
										>
											<svg
												className="mr-2 h-4 w-4 text-secondary-400 sm:h-5 sm:w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											{feature}
										</li>
									))}
								</ul>

								<Button
									href="/order"
									className={`w-full rounded-lg py-2 text-sm font-semibold transition-colors sm:py-3 sm:text-base ${
										index === 1
											? "bg-secondary-500 text-white hover:bg-secondary-600"
											: "bg-white/10 text-white hover:bg-white/20"
									}`}
								>
									Elegir Plan
								</Button>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default PricingComponent
