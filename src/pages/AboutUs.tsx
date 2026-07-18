import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { AboutSection } from "@/components/sections/AboutSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { GlobalBeltSection } from "@/components/sections/GlobalBeltSection"
import { viewportOnce } from "@/lib/animations"

const MISSION = [
	"GrowXi exists for one reason: to make professionals across India and the Gulf genuinely hireable.",
	"We replace the slow, templated, back-and-forth resume process with expert-led rebuilds\u2014where a specialist reconstructs your resume from scratch, optimized for the exact market you are targeting, and delivers it in 24\u201348 hours.",
	"No guesswork. No generic templates. Just a recruiter-ready resume and a team that responds in minutes, not days.",
]

export default function AboutUs() {
	return (
		<main className="pt-32">
			<div className="max-w-4xl mx-auto px-6">
				<SectionHeader
					eyebrow="About GrowXi"
					title={
						<>
							The team behind your <span className="gradient-text">next role</span>
						</>
					}
					subtitle="WhatsApp-first. Expert-led. Outcome-obsessed."
				/>

				<motion.div
					initial={ { opacity: 0, y: 20 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
					className="glass-card p-8 md:p-12 space-y-5"
				>
					{MISSION.map((p, i) => (
						<p key={i} className="text-ink-200 text-lg leading-relaxed">
							{p}
						</p>
					))}
				</motion.div>
			</div>

			<StatsSection />
			<AboutSection />
			<GlobalBeltSection />

			<div className="py-24 text-center">
				<Link
					to="/booking"
					className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
				>
					Work With Us <ArrowRight size={18} />
				</Link>
			</div>
		</main>
	)
}
