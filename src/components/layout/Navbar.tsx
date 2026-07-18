import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Our Resumes", href: "/our-resumes" },
	{ label: "About", href: "/about-us" },
	{ label: "Contact", href: "/contact" },
]

export function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const { pathname } = useLocation()
	const navRef = useRef<HTMLElement>(null)
	const { scrollY, scrollYProgress } = useScroll()

	useEffect(() => {
		const unsub = scrollY.on("change", (v) => setScrolled(v > 40))
		return unsub
	}, [scrollY])

	useEffect(() => setMobileOpen(false), [pathname])

	useEffect(() => {
		const links = Array.from(navRef.current?.querySelectorAll(".nav-link") ?? [])
		const cleanups: Array<() => void> = []
		links.forEach((link) => {
			const handler = (e: Event) => {
				const me = e as MouseEvent
				const rect = (link as HTMLElement).getBoundingClientRect()
				const x = me.clientX - rect.left - rect.width / 2
				const y = me.clientY - rect.top - rect.height / 2
				gsap.to(link, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" })
			}
			const reset = () =>
				gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" })
			link.addEventListener("mousemove", handler)
			link.addEventListener("mouseleave", reset)
			cleanups.push(() => {
				link.removeEventListener("mousemove", handler)
				link.removeEventListener("mouseleave", reset)
			})
		})
		return () => cleanups.forEach((c) => c())
	}, [])

	const progressStyle = { scaleX: scrollYProgress }

	return (
		<>
			<motion.div
				className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-accent-500 to-gold-400 z-[100] origin-left"
				style={progressStyle}
			/>

			<motion.nav
				ref={navRef}
				initial={ { y: -80, opacity: 0 } }
				animate={ { y: 0, opacity: 1 } }
				transition={ { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
				className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
			>
				<div
					className={cn(
						"flex items-center justify-between max-w-5xl w-full px-6 py-3 rounded-2xl transition-all duration-500",
						scrolled
							? "bg-white/85 backdrop-blur-xl border border-black/10 shadow-[0_8px_32px_rgba(122,46,157,0.12)]"
							: "bg-transparent",
					)}
				>
					<Link to="/" className="flex items-center group" aria-label="Growxi home">
						<img
							src="/logo.png"
							alt="Growxi — Your Career Growth Partner"
							className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
						/>
					</Link>

					<div className="hidden md:flex items-center gap-1">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								to={link.href}
								className={cn(
									"nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
									pathname === link.href
										? "bg-brand-500/12 text-brand-700"
										: "text-ink-200 hover:text-brand-700 hover:bg-black/[0.04]",
								)}
							>
								{link.label}
							</Link>
						))}
					</div>

					<div className="flex items-center gap-3">
						<Link
							to="/booking"
							className="btn-primary hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer select-none"
						>
							<span>Book Now</span>
							<motion.span
								animate={ { x: [0, 4, 0] } }
								transition={ { duration: 1.4, repeat: Infinity } }
							>
								&rarr;
							</motion.span>
						</Link>

						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className="md:hidden p-2 rounded-xl text-ink-100 hover:bg-black/[0.04] transition-colors"
							aria-label="Toggle menu"
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={mobileOpen ? "x" : "menu"}
									initial={ { rotate: -90, opacity: 0 } }
									animate={ { rotate: 0, opacity: 1 } }
									exit={ { rotate: 90, opacity: 0 } }
									transition={ { duration: 0.2 } }
								>
									{mobileOpen ? <X size={20} /> : <Menu size={20} />}
								</motion.div>
							</AnimatePresence>
						</button>
					</div>
				</div>

				<AnimatePresence>
					{mobileOpen && (
						<motion.div
							initial={ { opacity: 0, y: -10 } }
							animate={ { opacity: 1, y: 0 } }
							exit={ { opacity: 0, y: -10 } }
							transition={ { duration: 0.2 } }
							className="absolute top-20 inset-x-4 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl p-4 shadow-[0_16px_48px_rgba(122,46,157,0.16)] md:hidden"
						>
							{NAV_LINKS.map((link, i) => (
								<motion.div
									key={link.href}
									initial={ { opacity: 0, x: -10 } }
									animate={ { opacity: 1, x: 0 } }
									transition={ { delay: i * 0.06 } }
							>
								<Link
									to={link.href}
									onClick={() => setMobileOpen(false)}
									className="flex items-center px-4 py-3 rounded-xl text-ink-200 hover:text-brand-700 hover:bg-black/[0.04] transition-all"
								>
									{link.label}
								</Link>
							</motion.div>
						))}
							<div className="mt-2 pt-2 border-t border-black/10">
								<Link
									to="/booking"
									onClick={() => setMobileOpen(false)}
									className="btn-primary flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold"
								>
									Book Now &rarr;
								</Link>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</>
	)
}
