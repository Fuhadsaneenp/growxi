import { motion } from "framer-motion"

export function SectionHeader({
	eyebrow,
	title,
	subtitle,
	eyebrowColor = "brand",
}: {
	eyebrow: string
	title: React.ReactNode
	subtitle?: string
	eyebrowColor?: "brand" | "accent" | "gold"
}) {
	const colorClasses = {
		brand: "bg-brand-500/10 border-brand-500/30 text-brand-300",
		accent: "bg-accent-500/10 border-accent-500/30 text-accent-400",
		gold: "bg-gold-500/10 border-gold-500/30 text-gold-400",
	}
	return (
		<motion.div
			initial={ { opacity: 0, y: 20 } }
			animate={ { opacity: 1, y: 0 } }
			transition={ { duration: 0.6 } }
			className="text-center mb-14"
		>
			<span
				className={
					"inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-4 " +
					colorClasses[eyebrowColor]
				}
			>
				{eyebrow}
			</span>
			<h1 className="font-display font-extrabold text-display-lg text-ink-50 mb-4">{title}</h1>
			{subtitle && <p className="text-ink-300 text-lg max-w-2xl mx-auto">{subtitle}</p>}
		</motion.div>
	)
}
