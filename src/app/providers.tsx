import { useEffect } from "react"
import Lenis from "lenis"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
})

export function Providers({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches
		if (prefersReduced) return

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 0.8,
		})

		lenis.on("scroll", ScrollTrigger.update)

		const raf = (time: number) => lenis.raf(time * 1000)
		gsap.ticker.add(raf)
		gsap.ticker.lagSmoothing(0)

		return () => {
			lenis.destroy()
			gsap.ticker.remove(raf)
		}
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster
				position="bottom-right"
				toastOptions={{
					style: {
						background: "#FCF7F2",
						color: "#2A1E28",
						border: "1px solid rgba(0,0,0,0.08)",
						borderRadius: "12px",
					},
				}}
			/>
		</QueryClientProvider>
	)
}
