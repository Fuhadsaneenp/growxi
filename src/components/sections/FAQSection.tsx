import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { viewportOnce } from "@/lib/animations"

const FAQS = [
	{ q: "How does the process work?", a: "You place your order and share your details and current resume. A dedicated ATS expert rebuilds your resume from scratch\u2014optimized for your target roles\u2014then sends it to you for review and revisions." },
	{ q: "What's included in the ATS optimization?", a: "We analyze your target job descriptions, extract the most relevant keywords, and embed them naturally into your resume content\u2014headers, summary, experience, and skills\u2014without keyword stuffing." },
	{ q: "How do I receive my final resume?", a: "Once your resume is built, you receive it in both PDF and Word (.docx) formats via WhatsApp and email. The Word file is fully editable." },
	{ q: "Can I choose my resume format (GCC / Domestic / Europass)?", a: "Absolutely. You pick your target market at booking. If you need multiple formats, our Premium and Executive plans include them." },
	{ q: "What if I need changes after delivery?", a: "Standard plans include 1 revision within 48 hours. Premium includes 2, and Executive includes unlimited revisions for 7 days." },
	{ q: "How quickly will I get my resume?", a: "Most resumes are delivered within 24\u201348 hours of receiving your details. Placing your order takes under 2 minutes, and our WhatsApp-first team keeps you updated throughout." },
]

export function FAQSection() {
	const [open, setOpen] = useState<number | null>(0)

	return (
		<section className="py-32">
			<div className="max-w-3xl mx-auto px-6">
				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
					className="text-center mb-14"
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm font-medium mb-4">
						FAQ
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50">
						Questions? <span className="gradient-text">Answered.</span>
					</h2>
				</motion.div>

				<div className="space-y-3">
					{FAQS.map((faq, i) => {
						const isOpen = open === i
						return (
							<div key={faq.q} className="glass-card overflow-hidden">
								<button
									onClick={() => setOpen(isOpen ? null : i)}
									className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
									aria-expanded={isOpen}
								>
									<span className="text-ink-50 font-medium">{faq.q}</span>
									<motion.span
										animate={ { rotate: isOpen ? 45 : 0 } }
										transition={ { duration: 0.2 } }
										className="text-brand-400 flex-shrink-0"
									>
										<Plus size={20} />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={ { height: 0, opacity: 0 } }
											animate={ { height: "auto", opacity: 1 } }
											exit={ { height: 0, opacity: 0 } }
											transition={ { duration: 0.25 } }
										>
											<p className="px-6 pb-5 text-ink-300 text-sm leading-relaxed">{faq.a}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
