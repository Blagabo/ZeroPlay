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
		<section id="planes" className="px-4 py-20">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
					Planes y Precios
				</h2>

				{/* Device Selection */}
				<div className="mb-12 flex justify-center space-x-4">
					{[1, 2, 3].map((devices) => (
						<button
							key={devices}
							onClick={() => setSelectedDevices(devices)}
							className={`relative rounded-lg px-8 py-4 font-semibold transition-all duration-300 ${
								selectedDevices === devices
									? "z-10 scale-105 bg-primary-500 text-white shadow-lg shadow-primary-500/30"
									: "glass text-white/80 hover:scale-95 hover:bg-white/10 hover:text-white"
							}`}
						>
							<div className="flex items-center space-x-2">
								<span className="text-lg">{devices}</span>
								<span>{devices === 1 ? "Dispositivo" : "Dispositivos"}</span>
							</div>
							{selectedDevices === devices && (
								<div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-secondary-500" />
							)}
						</button>
					))}
				</div>

				{/* Pricing Cards */}
				<div className="grid gap-8 md:grid-cols-3">
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
								className={`glass relative rounded-xl p-6 ${index === 1 ? "transform md:-translate-y-4" : ""}`}
							>
								{index === 1 && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
										<span className="rounded-full bg-secondary-500 px-4 py-1 text-sm font-semibold text-white">
											Más Popular
										</span>
									</div>
								)}

								<h3 className="mb-2 text-xl font-bold text-white">
									{period === "monthly"
										? "Mensual"
										: period === "quarterly"
											? "Trimestral"
											: "Anual"}
								</h3>
								<div className="mb-2">
									<span className="text-4xl font-bold text-white">${price}</span>
									<span className="text-white/80">
										/{period === "monthly" ? "mes" : period === "quarterly" ? "3 meses" : "año"}
									</span>
								</div>
								<p className="mb-4 text-sm text-white/80">
									${monthlyPrice}/mes
									{Number(savings) > 0 && (
										<span className="ml-2 text-secondary-500">¡{savings}% ahorro!</span>
									)}
								</p>

								<ul className="mb-6 space-y-3">
									{features.map((feature) => (
										<li key={feature} className="flex items-center text-white/90">
											<svg
												className="mr-2 h-5 w-5 text-secondary-400"
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
									className={`w-full rounded-lg py-3 font-semibold transition-colors ${
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
