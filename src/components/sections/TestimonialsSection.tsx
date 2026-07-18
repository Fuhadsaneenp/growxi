import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Star } from "lucide-react"
import { viewportOnce } from "@/lib/animations"

const TESTIMONIALS = [
	{ name: "Arun Menon", role: "Finance Manager", country: "\uD83C\uDDE6\uD83C\uDDEA Dubai", rating: 5, quote: "GrowXi rebuilt my resume from scratch and I had 3 interview calls the following week. Absolutely worth it." },
	{ name: "Priya Nair", role: "HR Executive", country: "\uD83C\uDDEE\uD83C\uDDF3 Bangalore", rating: 5, quote: "The ATS optimization was incredible. My application visibility went up massively. The expert rewrite made all the difference." },
	{ name: "Mohammed Al-Sayed", role: "Project Engineer", country: "\uD83C\uDDF8\uD83C\uDDE6 Riyadh", rating: 5, quote: "They know exactly what Gulf recruiters look for. My Europass version helped me land interviews in Germany too." },
	{ name: "Sneha Thomas", role: "Marketing Lead", country: "\uD83C\uDDEE\uD83C\uDDF3 Mumbai", rating: 5, quote: "The WhatsApp support is exceptional. Zero delays. They were responsive even after my resume was delivered." },
	{ name: "Ravi Krishnan", role: "Software Engineer", country: "\uD83C\uDDF6\uD83C\uDDE6 Doha", rating: 5, quote: "From order to final resume, the turnaround was incredibly fast. No other service comes close to this quality." },
	{ name: "Fatima Al-Rashidi", role: "Operations Executive", country: "\uD83C\uDDF0\uD83C\uDDFC Kuwait", rating: 5, quote: "My recruiter specifically mentioned my resume was the most structured they had seen. GrowXi nailed it." },
]

export function TestimonialsSection() {
	const trackRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
		const cards = track.children
		const totalWidth =
			Array.from(cards).reduce(
				(w, c) => w + (c as HTMLElement).offsetWidth + 24,
				0,
			) / 2

		const tl = gsap.to(track, {
			x: "-" + totalWidth + "px",
			duration: 30,
			ease: "none",
			repeat: -1,
			modifiers: {
				x: (x) => (parseFloat(x) % totalWidth) + "px",
			},
		})

		const pause = () => tl.pause()
		const resume = () => tl.resume()
		track.addEventListener("mouseenter", pause)
		track.addEventListener("mouseleave", resume)
		return () => {
			tl.kill()
			track.removeEventListener("mouseenter", pause)
			track.removeEventListener("mouseleave", resume)
		}
	}, [])

	const allCards = [...TESTIMONIALS, ...TESTIMONIALS]

	return (
		<section className="py-32 overflow-hidden">
			<div className="max-w-6xl mx-auto px-6 mb-16 text-center">
				<motion.div
					initial={ { opacity: 0, y: 30 } }
					whileInView={ { opacity: 1, y: 0 } }
					viewport={viewportOnce}
				>
					<span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4">
						What Clients Say
					</span>
					<h2 className="font-display font-extrabold text-display-lg text-ink-50">
						Real Results. <span className="gradient-text-gold">Real Hires.</span>
					</h2>
				</motion.div>
			</div>

			<div className="relative">
				<div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />

				<div ref={trackRef} className="flex gap-6 w-max">
					{allCards.map(({ name, role, country, rating, quote }, i) => (
						<div
							key={name + "-" + i}
							className="w-80 flex-shrink-0 glass-card p-6 cursor-default transition-transform duration-300 hover:-translate-y-1"
						>
							<div className="flex gap-1 mb-4">
								{Array.from({ length: rating }).map((_, j) => (
									<Star key={j} size={14} fill="#FBBF24" className="text-gold-400" />
								))}
							</div>
							<p className="text-ink-200 text-sm leading-relaxed mb-5">&ldquo;{quote}&rdquo;</p>
							<div className="flex items-center gap-3">
								<div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
									{name.split(" ").map((n) => n[0]).join("")}
								</div>
								<div>
									<p className="text-ink-50 text-sm font-semibold">{name}</p>
									<p className="text-ink-400 text-xs">
										{role} &middot; {country}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
