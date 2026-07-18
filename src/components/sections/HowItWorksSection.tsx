import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { Calendar, PenTool, CheckCircle2, ArrowRight } from "lucide-react"
import { viewportOnce } from "@/lib/animations"

const STEPS = [
	{
		step: "01",
		icon: Calendar,
		title: "Share Your Details",
		body: "Place your order and share your career background, target roles, and current resume. Our experts review everything before the rebuild begins.",
		color: "from-brand-600 to-brand-400",
		glow: "rgba(79,70,229,0.3)",
	},
	{
		step: "02",
		icon: PenTool,
		title: "Experts Rebuild Your Resume",
		body: "A dedicated ATS expert rebuilds your resume from scratch\u2014restructured, keyword-optimized, and aligned to your exact target roles.",
		color: "from-accent-600 to-accent-400",
		glow: "rgba(16,185,129,0.3)",
	},
	{
		step: "03",
		icon: CheckCircle2,
		title: "Final Review & Approval",
		body: "We refine, validate, and finalize every line, then deliver your recruiter-ready resume in PDF and Word\u2014revisions included.",
		color: "from-gold-600 to-gold-400",
		glow: "rgba(245,158,11,0.3)",
	},
]

export function HowItWorksSection() {
	const containerRef = useRef<HTMLElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	})
	const lineScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
	const lineStyle = { scaleY: lineScaleY }

	return (
		<section ref={containerRef} className="relative py-32 overflow-hidden">
			<div className="max-w-6xl mx-auto px-6">
				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					transition={ { duration: 0.6 } }
					viewport={viewportOnce}
					className="text-center mb-20"
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-sm font-medium mb-4">
						The Process
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50 mb-4">
						How It <span className="gradient-text">Works</span>
					</h2>
					<p className="text-ink-300 text-lg max-w-2xl mx-auto">
						From your details to a recruiter-ready resume&mdash;handled end to end by experts.
					</p>
				</motion.div>

				<div className="relative">
					<div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/[0.04]">
						<motion.div
							style={lineStyle}
							className="absolute top-0 left-0 w-full h-full origin-top bg-gradient-to-b from-brand-500 via-accent-500 to-gold-500"
						/>
					</div>

					<div className="flex flex-col gap-16">
						{STEPS.map(({ step, icon: Icon, title, body, color }, i) => (
							<motion.div
								key={step}
								initial={ { opacity: 0, y: 40 } }
								whileInView={ { opacity: 1, y: 0 } }
								transition={ { duration: 0.6, delay: i * 0.1 } }
								viewport={viewportOnce}
								className={
									"relative flex items-center gap-8 flex-col md:gap-16 " +
								(i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row")
								}
							>
								<div className={"flex-1 " + (i % 2 !== 0 ? "md:text-right" : "")}>
									<div className="glass-card p-8 cursor-default transition-transform duration-300 hover:-translate-y-1">
										<div
											className={
												"flex items-center gap-4 mb-4 " +
												(i % 2 !== 0 ? "md:flex-row-reverse" : "")
											}
										>
											<div className={"step-badge bg-gradient-to-br " + color}>{step}</div>
											<Icon size={20} className="text-ink-400" />
										</div>
										<h3 className="font-display font-bold text-xl text-ink-50 mb-3">{title}</h3>
										<p className="text-ink-300 leading-relaxed">{body}</p>
									</div>
								</div>

								<div className="hidden md:flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-full bg-ink-900 border-2 border-brand-500/50 relative z-10 shadow-[0_0_30px_rgba(122,46,157,0.45)]">
									<div className="w-3 h-3 rounded-full bg-brand-400 animate-pulse" />
								</div>

								<div className="flex-1 hidden md:block" />
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					transition={ { duration: 0.6 } }
					viewport={viewportOnce}
					className="text-center mt-20"
				>
					<Link
						to="/booking"
						className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
					>
						Start My Resume Journey <ArrowRight size={18} />
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
