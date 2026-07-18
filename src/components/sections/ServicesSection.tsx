import { motion } from "framer-motion"
import { Globe, MapPin, Flag, ArrowRight } from "lucide-react"
import ParallaxTilt from "react-parallax-tilt"
import { fadeUp, viewportOnce } from "@/lib/animations"

const FORMATS = [
	{
		id: "gcc",
		icon: Globe,
		badge: "Gulf Region",
		title: "GCC / Gulf Resume",
		body: "Tailored for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman hiring standards. Structured for recruiter parsing in MENA markets.",
		color: "brand" as const,
		features: ["Arabic-market aligned", "Arabic name placement", "Visa status section"],
	},
	{
		id: "domestic",
		icon: MapPin,
		badge: "India",
		title: "Domestic Resume",
		body: "Optimized for Indian job boards, LinkedIn, and corporate ATS. Clean, professional, and aligned with Indian recruiter expectations.",
		color: "accent" as const,
		features: ["LinkedIn-ready", "ATS keyword mapping", "Industry-specific"],
	},
	{
		id: "europass",
		icon: Flag,
		badge: "Europe",
		title: "Europass CV",
		body: "The standard European format for Germany, UK, and Schengen countries. Compliant with EU hiring norms and structured for cross-border applications.",
		color: "gold" as const,
		features: ["EU format compliant", "Language skill matrix", "Multi-country ready"],
	},
]

const COLOR_MAP = {
	brand: { bg: "rgba(122,46,157,0.08)", border: "rgba(122,46,157,0.3)", text: "#7A2E9D", glow: "rgba(122,46,157,0.2)" },
	accent: { bg: "rgba(242,106,65,0.10)", border: "rgba(242,106,65,0.35)", text: "#E0532A", glow: "rgba(242,106,65,0.2)" },
	gold: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)", text: "#D97706", glow: "rgba(245,158,11,0.2)" },
} as const

export function ServicesSection() {
	return (
		<section className="py-32">
			<div className="max-w-6xl mx-auto px-6">
				<motion.div
					className="text-center mb-16"
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm font-medium mb-4">
						Resume Formats
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50 mb-4">
						Choose Your <span className="gradient-text">Market</span>
					</h2>
					<p className="text-ink-300 text-lg max-w-2xl mx-auto">
						Every resume format is engineered for its specific hiring ecosystem&mdash;not copy-pasted.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-6">
					{FORMATS.map(({ id, icon: Icon, badge, title, body, color, features }, i) => {
						const c = COLOR_MAP[color]
						const iconWrapStyle = { background: c.bg, border: "1px solid " + c.border }
						const iconStyle = { color: c.text }
						const badgeStyle = { background: c.bg, color: c.text, border: "1px solid " + c.border }
						const dotStyle = { background: c.text }
						return (
							<motion.div
								key={id}
								initial={ { opacity: 0, y: 30 } }
								whileInView={ { opacity: 1, y: 0 } }
								transition={ { duration: 0.5, delay: i * 0.12 } }
								viewport={viewportOnce}
							>
								<ParallaxTilt
									tiltMaxAngleX={8}
									tiltMaxAngleY={8}
									glareEnable
									glareMaxOpacity={0.05}
									glareColor={c.text}
									className="h-full"
								>
									<div className="group relative h-full p-8 rounded-2xl glass-card cursor-default overflow-hidden transition-shadow duration-300 hover:shadow-brand-lg">
										<div
											className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
											style={iconWrapStyle}
										>
											<Icon size={22} style={iconStyle} />
										</div>

										<span
											className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
											style={badgeStyle}
										>
											{badge}
										</span>

										<h3 className="font-display font-bold text-xl text-ink-50 mb-3">{title}</h3>
										<p className="text-ink-300 leading-relaxed mb-6 text-sm">{body}</p>

										<ul className="space-y-2">
											{features.map((f) => (
												<li key={f} className="flex items-center gap-2 text-sm text-ink-200">
													<span
														className="w-1.5 h-1.5 rounded-full flex-shrink-0"
													style={dotStyle}
												/>
													{f}
												</li>
											))}
										</ul>

										<div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<ArrowRight size={18} style={iconStyle} />
										</div>
									</div>
								</ParallaxTilt>
							</motion.div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
