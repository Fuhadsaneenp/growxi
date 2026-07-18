import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MessageCircle, Mail, ArrowRight, Clock, Globe } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { whatsappLink, SUPPORT_EMAIL, WA_DISPLAY } from "@/lib/utils"
import { Aurora } from "@/components/reactbits/Aurora"
import { AnimatedContent } from "@/components/reactbits/AnimatedContent"
import { Magnet } from "@/components/reactbits/Magnet"

const CHANNELS = [
	{
		icon: MessageCircle,
		title: "WhatsApp",
		desc: "Fastest way to reach us. Replies in minutes.",
		value: WA_DISPLAY,
		href: whatsappLink("Hi GrowXi! I have a question."),
		cta: "Chat now",
		primary: true,
	},
	{
		icon: Mail,
		title: "Email",
		desc: "For detailed queries and documents.",
		value: SUPPORT_EMAIL,
		href: "mailto:" + SUPPORT_EMAIL,
		cta: "Send email",
		primary: false,
	},
]

export default function Contact() {
	return (
		<main className="relative pt-32 overflow-hidden">
			<Aurora className="opacity-50" />
			<div className="relative max-w-4xl mx-auto px-6">
				<SectionHeader
					eyebrow="Contact"
					title={
						<>
							Let&rsquo;s build your <span className="gradient-text">next move</span>
						</>
					}
					subtitle="WhatsApp-first support. Zero delays, real humans."
				/>

				<div className="grid md:grid-cols-2 gap-6 mt-4">
					{CHANNELS.map(({ icon: Icon, title, desc, value, href, cta, primary }, i) => (
						<AnimatedContent key={title} delay={i * 0.1}>
							<div className="glass-card h-full p-8 flex flex-col">
								<div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mb-5">
									<Icon size={22} className="text-brand-600" />
								</div>
								<h3 className="font-display font-bold text-xl text-ink-50 mb-2">{title}</h3>
								<p className="text-ink-300 text-sm mb-3">{desc}</p>
								<p className="text-ink-100 font-medium mb-6">{value}</p>
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className={
										(primary ? "btn-primary text-white" : "btn-outline text-ink-100") +
										" mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
									}
								>
									{cta} <ArrowRight size={16} />
								</a>
							</div>
						</AnimatedContent>
					))}
				</div>

				<div className="grid sm:grid-cols-2 gap-4 mt-6">
					<div className="glass-card p-6 flex items-center gap-4">
						<Clock size={20} className="text-accent-500" />
						<div>
							<p className="text-ink-50 text-sm font-semibold">Support hours</p>
							<p className="text-ink-400 text-sm">Mon&ndash;Sat, 9 AM &ndash; 9 PM IST</p>
						</div>
					</div>
					<div className="glass-card p-6 flex items-center gap-4">
						<Globe size={20} className="text-brand-500" />
						<div>
							<p className="text-ink-50 text-sm font-semibold">Clients worldwide</p>
							<p className="text-ink-400 text-sm">India, Gulf & Europe</p>
						</div>
					</div>
				</div>
			</div>

			<div className="py-24 text-center">
				<Magnet>
					<Link
						to="/booking"
						className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold"
					>
						Build My Resume <ArrowRight size={18} />
					</Link>
				</Magnet>
			</div>
		</main>
	)
}
