import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { viewportOnce } from "@/lib/animations"
import { whatsappLink } from "@/lib/utils"

export function CTASection() {
	return (
		<section className="py-32">
			<div className="max-w-5xl mx-auto px-6">
				<motion.div
					initial={ { opacity: 0, y: 40 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
					className="relative overflow-hidden rounded-4xl glass-card glow-border p-12 md:p-16 text-center"
				>
					<div className="absolute inset-0 bg-mesh-brand opacity-60 pointer-events-none" />
					<div className="relative">
						<h2 className="font-display font-extrabold text-display-md md:text-display-lg text-ink-50 mb-4">
							Ready to get <span className="gradient-text">hired faster?</span>
						</h2>
						<p className="text-ink-300 text-lg max-w-xl mx-auto mb-10">
							Order today and get an expert-built, ATS-ready resume &mdash; delivered in 24&ndash;48 hours.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/booking"
								className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
							>
								Build My Resume <ArrowRight size={18} />
							</Link>
							<a
								href={whatsappLink()}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-ink-100 font-medium"
							>
								<MessageCircle size={18} /> Chat on WhatsApp
							</a>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
