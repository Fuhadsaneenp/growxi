import { useEffect, useRef } from "react"
import { gsap } from "gsap"

/** Attaches a subtle magnetic hover to the returned ref element. */
export function useMagneticEffect<T extends HTMLElement>(strength = 0.25) {
	const ref = useRef<T>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const handleMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect()
			const x = e.clientX - rect.left - rect.width / 2
			const y = e.clientY - rect.top - rect.height / 2
			gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" })
		}
		const reset = () =>
			gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" })

		el.addEventListener("mousemove", handleMove)
		el.addEventListener("mouseleave", reset)
		return () => {
			el.removeEventListener("mousemove", handleMove)
			el.removeEventListener("mouseleave", reset)
		}
	}, [strength])

	return ref
}
