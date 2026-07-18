import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Globe, MapPin, Flag, ArrowRight, FileText } from "lucide-react"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { ATSScoreSection } from "@/components/ui/ATSScoreSection"
import { Aurora } from "@/components/reactbits/Aurora"
import { GradientText } from "@/components/reactbits/GradientText"
import { BlurText } from "@/components/reactbits/BlurText"
import { SpotlightCard } from "@/components/reactbits/SpotlightCard"
import { AnimatedContent } from "@/components/reactbits/AnimatedContent"
import { Magnet } from "@/components/reactbits/Magnet"

const SAMPLES = [
	{
		icon: Globe,
		market: "GCC / Gulf",
		role: "Senior Finance Manager",
		blurb:
			"A Gulf-ready layout with a sharp professional summary, visa status, and quantified achievements tuned for MENA recruiters.",
		highlights: ["ATS-parsed header", "Impact-led bullets", "Visa & nationality block"],
	},
	{
		icon: MapPin,
		market: "Domestic / India",
		role: "Software Engineer",
		blurb:
			"A clean, recruiter-friendly resume built for Indian job boards and corporate ATS, with a keyword-mapped skills section.",
		highlights: ["LinkedIn-aligned", "Skill keyword matrix", "Concise one-pager"],
	},
	{
		icon: Flag,
		market: "Europass / EU",
		role: "Project Coordinator",
		blurb:
			"The standardized European format with a language proficiency matrix, structured for cross-border applications.",
		highlights: ["EU-compliant", "Language matrix", "Multi-country ready"],
	},
]

export default function OurResumes() {
	return (
		<main className="pt-32">
			<section className="relative overflow-hidden">
				<Aurora className="opacity-60" />
				<div className="relative max-w-4xl mx-auto px-6 text-center">
					<span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-600 text-sm font-medium mb-5">
						Resume Samples
					</span>
					<h1 className="font-display font-extrabold text-display-lg text-ink-50 mb-5">
						Resumes engineered to{" "}
						<GradientText>get shortlisted</GradientText>
					</h1>
					<div className="text-ink-300 text-lg max-w-2xl mx-auto">
						<BlurText text="Every resume is rebuilt by an expert for its exact market — not pulled from a template." />
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
					{SAMPLES.map(({ icon: Icon, market, role, blurb, highlights }, i) => (
						<AnimatedContent key={market} delay={i * 0.1}>
							<SpotlightCard className="glass-card h-full p-8 rounded-2xl">
								<div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mb-6">
									<Icon size={22} className="text-brand-600" />
								</div>
								<span className="text-accent-600 text-xs font-semibold uppercase tracking-wider">
									{market}
								</span>
								<h3 className="font-display font-bold text-xl text-ink-50 mt-1 mb-3">
									{role}
								</h3>
								<p className="text-ink-300 text-sm leading-relaxed mb-6">{blurb}</p>
								<ul className="space-y-2">
									{highlights.map((h) => (
										<li key={h} className="flex items-center gap-2 text-sm text-ink-200">
											<FileText size={14} className="text-accent-500 flex-shrink-0" />
											{h}
										</li>
									))}
								</ul>
							</SpotlightCard>
						</AnimatedContent>
					))}
				</div>
			</section>

			<ServicesSection />

			<ATSScoreSection />

			<section className="py-24 text-center">
				<motion.div
					initial={ { opacity: 0, y: 20 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={ { once: true } }
				>
					<Magnet>
						<Link
							to="/booking"
							className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
						>
							Build My Resume <ArrowRight size={18} />
						</Link>
					</Magnet>
				</motion.div>
			</section>
		</main>
	)
}
