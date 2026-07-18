import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import CountUp from "react-countup"

const STATS = [
	{ value: 1000, suffix: "+", label: "Resumes Built", sub: "and counting" },
	{ value: 95, suffix: "%", label: "Interview Rate", sub: "within 30 days" },
	{ value: 48, suffix: "h", label: "Avg Turnaround", sub: "fast delivery" },
	{ value: 3, suffix: "", label: "Resume Formats", sub: "GCC, Domestic, Europass" },
]

export function StatsSection() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { once: true, margin: "-100px" })

	return (
		<section className="relative py-24 overflow-hidden" ref={ref}>
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

			<div className="max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{STATS.map(({ value, suffix, label, sub }, i) => (
						<motion.div
							key={label}
							initial={ { opacity: 0, y: 30 } }
							animate={inView ? { opacity: 1, y: 0 } : undefined}
							transition={ { duration: 0.5, delay: i * 0.1 } }
							className="relative text-center group"
						>
							<div className="text-display-md font-display font-extrabold gradient-text mb-1">
								{inView && (
									<CountUp end={value} duration={2.5} delay={i * 0.12} separator="," />
								)}
								{suffix}
							</div>
							<div className="text-ink-50 font-semibold mb-1">{label}</div>
							<div className="text-ink-400 text-sm">{sub}</div>
							<div className="absolute inset-0 rounded-2xl bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</motion.div>
					))}
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
		</section>
	)
}
