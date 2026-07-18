import { motion } from "framer-motion"
import { Target, Heart, Zap } from "lucide-react"
import { viewportOnce } from "@/lib/animations"

const VALUES = [
	{
		icon: Target,
		title: "Outcome-Obsessed",
		body: "We don't write pretty resumes. We write resumes that get shortlisted, pass ATS filters, and land interviews.",
	},
	{
		icon: Zap,
		title: "Zero-Delay Team",
		body: "WhatsApp-first support means your questions are answered in minutes, not days. Before, during, and after your resume build.",
	},
	{
		icon: Heart,
		title: "Human, Not Templated",
		body: "A real expert rebuilds your resume by hand. Your story, your voice, your goals\u2014engineered into every line.",
	},
]

export function AboutSection() {
	return (
		<section className="py-32">
			<div className="max-w-6xl mx-auto px-6">
				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
					className="text-center mb-16"
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4">
						Why GrowXi
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50 mb-4">
						The team that makes you <span className="gradient-text">hireable</span>
					</h2>
					<p className="text-ink-300 text-lg max-w-2xl mx-auto">
						We combine recruiter insight, ATS science, and expert human craft to rebuild how you present yourself.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-6">
					{VALUES.map(({ icon: Icon, title, body }, i) => (
						<motion.div
							key={title}
							initial={ { opacity: 0, y: 30 } }
							whileInView={ { opacity: 1, y: 0 } }
							transition={ { duration: 0.5, delay: i * 0.12 } }
							viewport={viewportOnce}
							className="glass-card p-8"
						>
							<div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mb-5">
								<Icon size={22} className="text-brand-300" />
							</div>
							<h3 className="font-display font-bold text-xl text-ink-50 mb-3">{title}</h3>
							<p className="text-ink-300 leading-relaxed text-sm">{body}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
