import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Check } from "lucide-react"
import { viewportOnce } from "@/lib/animations"
import { useBookingStore } from "@/app/store"
import type { PlanId } from "@/app/store"
import { getDiscountActive, setDiscountActive } from "@/lib/payments"

const PLANS: Array<{
	id: PlanId
	name: string
	price: string
	priceUSD: string
	description: string
	features: string[]
	cta: string
	highlight: boolean
	badge?: string
}> = [
	{
		id: "standard",
		name: "Standard",
		price: "\u20B9999",
		priceUSD: "~$12",
		description: "Perfect for freshers and mid-level professionals.",
		features: [
			"Expert-built resume",
			"ATS-optimized resume",
			"1 revision included",
			"Domestic / Gulf format",
			"WhatsApp support",
			"PDF + Word delivery",
		],
		cta: "Get Started",
		highlight: false,
	},
	{
		id: "premium",
		name: "Premium",
		price: "\u20B91,499",
		priceUSD: "~$18",
		description: "For senior professionals targeting high-value roles.",
		features: [
			"Everything in Standard",
			"Europass format",
			"LinkedIn headline rewrite",
			"Career gap strategy",
			"2 revisions included",
			"Priority support",
			"Cover letter draft",
		],
		cta: "Get Premium",
		highlight: true,
		badge: "Most Popular",
	},
	{
		id: "executive",
		name: "Executive",
		price: "\u20B92,499",
		priceUSD: "~$30",
		description: "C-suite and director-level positioning.",
		features: [
			"Everything in Premium",
			"Executive bio included",
			"3 resume formats",
			"Unlimited revisions (7 days)",
			"LinkedIn full profile review",
			"Job application strategy call",
		],
		cta: "Get Executive",
		highlight: false,
	},
]

export function PricingSection() {
	const setPlan = useBookingStore((s) => s.setPlan)
	const [active, setActive] = useState(getDiscountActive())

	useEffect(() => {
		const handleScroll = () => {
			if (!active && window.scrollY > 20) {
				setDiscountActive(true)
				setActive(true)
			}
		}
		window.addEventListener("scroll", handleScroll)
		// Run initial check
		handleScroll()
		return () => window.removeEventListener("scroll", handleScroll)
	}, [active])

	return (
		<section className="py-32 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-radial from-brand-900/20 via-transparent to-transparent pointer-events-none" />
			<div className="max-w-6xl mx-auto px-6 relative">
				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
					className="text-center mb-16"
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-sm font-medium mb-4">
						Pricing
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50 mb-4">
						Simple, <span className="gradient-text">Honest Pricing</span>
					</h2>
					<p className="text-ink-300 text-lg max-w-2xl mx-auto">
						One expert-built resume. ATS-ready. No subscriptions, no surprises.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-6 items-stretch">
					{PLANS.map((plan, i) => (
						<motion.div
							key={plan.id}
							initial={ { opacity: 0, y: 30 } }
							whileInView={ { opacity: 1, y: 0 } }
							transition={ { duration: 0.5, delay: i * 0.12 } }
							viewport={viewportOnce}
							className={
								"relative rounded-2xl p-8 flex flex-col " +
								(plan.highlight
									? "glass-card glow-border shadow-brand-lg md:-translate-y-4"
								: "glass-card")
							}
						>
							{plan.badge && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-xs font-semibold shadow-brand-md">
									{plan.badge}
								</span>
							)}
							<h3 className="font-display font-bold text-xl text-ink-50 mb-1">{plan.name}</h3>
							<p className="text-ink-400 text-sm mb-5 min-h-[40px]">{plan.description}</p>
							<div className="flex items-end gap-2 mb-6">
								{plan.id === "standard" && getDiscountActive() ? (
									<>
										<span className="text-4xl font-display font-extrabold text-ink-50">
											<span className="line-through text-ink-400 text-2xl mr-2">₹999</span>
											<span>₹99</span>
										</span>
										<span className="text-ink-400 text-sm mb-1">
											<span className="line-through mr-1 opacity-60">~$12</span>
											<span>~$1</span>
										</span>
									</>
								) : (
									<>
										<span className="text-4xl font-display font-extrabold text-ink-50">{plan.price}</span>
										<span className="text-ink-400 text-sm mb-1">{plan.priceUSD}</span>
									</>
								)}
							</div>
							<ul className="space-y-3 mb-8 flex-1">
								{plan.features.map((f) => (
									<li key={f} className="flex items-start gap-2.5 text-sm text-ink-200">
										<Check size={16} className="text-accent-400 flex-shrink-0 mt-0.5" />
										{f}
									</li>
								))}
							</ul>
							<Link
								to="/booking"
								onClick={() => setPlan(plan.id)}
								className={
									"flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all " +
									(plan.highlight
										? "btn-primary text-white"
										: "btn-outline text-ink-100")
								}
							>
								{plan.cta}
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
