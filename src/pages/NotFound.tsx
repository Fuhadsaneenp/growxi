import { Link } from "react-router-dom"
import { ArrowRight, FileQuestion } from "lucide-react"
import { Aurora } from "@/components/reactbits/Aurora"
import { AnimatedContent } from "@/components/reactbits/AnimatedContent"
import { Magnet } from "@/components/reactbits/Magnet"

export default function NotFound() {
	return (
		<main className="relative pt-32 pb-24 min-h-[80vh] flex flex-col justify-center overflow-hidden">
			<Aurora className="opacity-50" />
			<div className="relative max-w-2xl mx-auto px-6 text-center">
				<AnimatedContent delay={0.1}>
					<div className="inline-flex w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/30 items-center justify-center mb-8">
						<FileQuestion size={40} className="text-brand-500 animate-pulse" />
					</div>
				</AnimatedContent>

				<AnimatedContent delay={0.2}>
					<h1 className="font-display font-black text-7xl md:text-9xl mb-4 tracking-tight">
						<span className="gradient-text">404</span>
					</h1>
				</AnimatedContent>

				<AnimatedContent delay={0.3}>
					<h2 className="font-display font-bold text-2xl md:text-3xl text-ink-50 mb-4">
						Page Not Found
					</h2>
					<p className="text-ink-300 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
						The page you are looking for doesn't exist or has been moved. Let's get you back on track to building your next career move.
					</p>
				</AnimatedContent>

				<AnimatedContent delay={0.4}>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Magnet>
							<Link
								to="/"
								className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold w-full sm:w-auto justify-center"
							>
								Go Home
							</Link>
						</Magnet>
						<Magnet>
							<Link
								to="/booking"
								className="btn-outline text-ink-100 inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold w-full sm:w-auto justify-center"
							>
								Build Resume <ArrowRight size={18} />
							</Link>
						</Magnet>
					</div>
				</AnimatedContent>
			</div>
		</main>
	)
}
