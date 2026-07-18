import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Star, Users, CheckCircle, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ParticleField } from "../ui/ParticleField"
import { TypewriterText } from "../ui/TypewriterText"
import { ShinyText } from "../reactbits/ShinyText"

const HERO_BADGES = [
	{ icon: CheckCircle, label: "ATS-Optimized" },
	{ icon: Zap, label: "Expert-Built" },
	{ icon: Star, label: "Gulf & Domestic" },
	{ icon: Users, label: "1,000+ Hired" },
]

function SplitLine({ text, className }: { text: string; className: string }) {
	return (
		<div className="overflow-hidden">
			{text.split("").map((char, i) => (
				<span key={i} className={"char inline-block " + className}>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</div>
	)
}

export function HeroSection() {
	const containerRef = useRef<HTMLElement>(null)
	const headlineRef = useRef<HTMLHeadingElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
	const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
	const contentStyle = { y, opacity }

	useEffect(() => {
		if (!headlineRef.current) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
		const chars = headlineRef.current.querySelectorAll(".char")
		gsap.fromTo(
			chars,
			{ y: 100, opacity: 0, rotateX: -90, transformOrigin: "50% 100%" },
			{
				y: 0,
				opacity: 1,
				rotateX: 0,
				duration: 0.8,
				stagger: 0.02,
				ease: "back.out(2)",
				delay: 0.4,
			},
		)
	}, [])

	return (
		<section
			ref={containerRef}
			className="relative min-h-[100svh] flex items-center justify-center overflow-hidden noise"
		>
			<div className="absolute inset-0 bg-ink-950">
				<div className="absolute inset-0 bg-grid-lines bg-grid opacity-40" />
				<div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent" />
				<motion.div
					animate={ { x: [0, 30, 0], y: [0, -20, 0] } }
					transition={ { duration: 14, repeat: Infinity, ease: "easeInOut" } }
					className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-400/25 blur-[80px]"
				/>
				<motion.div
					animate={ { x: [0, -25, 0], y: [0, 25, 0] } }
					transition={ { duration: 16, repeat: Infinity, ease: "easeInOut" } }
					className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-400/20 blur-[100px]"
				/>
				<ParticleField count={300} color="#7A2E9D" size={1.5} speed={0.3} />
			</div>

			<motion.div
				style={contentStyle}
				className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 text-center"
			>
				<motion.div
					initial={ { opacity: 0, y: 20 } }
					animate={ { opacity: 1, y: 0 } }
					transition={ { duration: 0.6 } }
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-sm font-medium mb-8"
				>
					<span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
					<ShinyText text="Expert-Built, ATS-Ready Resumes" />
					<ArrowRight size={14} />
				</motion.div>

				<h1
					ref={headlineRef}
					className="font-display font-extrabold leading-[1.05] mb-6"
					aria-label="Your resume. Built by experts. Land the role."
				>
					<SplitLine text="Your Resume." className="text-display-2xl text-ink-50" />
					<div className="mt-1">
						<SplitLine text="By Experts." className="text-display-2xl text-ink-50" />
					</div>
					<div className="overflow-hidden mt-1">
						<span className="char inline-block text-display-xl gradient-text">
							Land the Role.
						</span>
					</div>
				</h1>

				<motion.p
					initial={ { opacity: 0, y: 20 } }
					animate={ { opacity: 1, y: 0 } }
					transition={ { duration: 0.6, delay: 0.8 } }
					className="text-xl md:text-2xl text-ink-300 font-light mb-4 max-w-2xl mx-auto leading-relaxed"
				>
					We rebuild your resume to be{" "}
					<span className="text-accent-500 font-medium">
						<TypewriterText
							strings={[
								"ATS-optimized",
								"recruiter-ready",
								"keyword-rich",
							]}
						/>
					</span>{" "}
					&mdash; never from a template.
				</motion.p>

				<motion.div
					initial={ { opacity: 0, y: 20 } }
					animate={ { opacity: 1, y: 0 } }
					transition={ { duration: 0.6, delay: 1 } }
					className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-16"
				>
					<Link
						to="/booking"
						className="btn-primary group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-brand-xl"
					>
						<Zap size={18} className="group-hover:animate-pulse" />
						Build My Resume Now
						<ArrowRight size={18} />
					</Link>
					<Link
						to="/our-resumes"
						className="btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-ink-200"
					>
						View Resume Samples
					</Link>
				</motion.div>

				<motion.div
					initial={ { opacity: 0 } }
					animate={ { opacity: 1 } }
					transition={ { duration: 0.6, delay: 1.2 } }
					className="flex flex-wrap justify-center gap-3"
				>
					{HERO_BADGES.map(({ icon: Icon, label }, i) => (
						<motion.div
							key={label}
							initial={ { opacity: 0, scale: 0.8 } }
							animate={ { opacity: 1, scale: 1 } }
							transition={ { delay: 1.3 + i * 0.1 } }
							className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-ink-300"
						>
							<Icon size={14} className="text-accent-400" />
							{label}
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			<motion.div
				initial={ { opacity: 0 } }
				animate={ { opacity: 1 } }
				transition={ { delay: 1.8 } }
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<motion.div
					animate={ { y: [0, 8, 0] } }
					transition={ { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }
					className="w-6 h-10 rounded-full border-2 border-black/15 flex justify-center pt-2"
				>
					<div className="w-1.5 h-1.5 rounded-full bg-black/25" />
				</motion.div>
			</motion.div>
		</section>
	)
}
