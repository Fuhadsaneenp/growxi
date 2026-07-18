import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorGlow() {
	const x = useMotionValue(-100)
	const y = useMotionValue(-100)
	const sx = useSpring(x, { stiffness: 500, damping: 40 })
	const sy = useSpring(y, { stiffness: 500, damping: 40 })

	useEffect(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return
		const move = (e: MouseEvent) => {
			x.set(e.clientX)
			y.set(e.clientY)
		}
		window.addEventListener("mousemove", move)
		return () => window.removeEventListener("mousemove", move)
	}, [x, y])

	const ringStyle = { left: sx, top: sy, translateX: "-50%", translateY: "-50%" }
	const dotStyle = { left: x, top: y, translateX: "-50%", translateY: "-50%" }

	return (
		<>
			<motion.div
				style={ringStyle}
				className="fixed pointer-events-none z-[999] w-10 h-10 rounded-full border border-brand-400/40 mix-blend-screen hidden md:block"
			/>
			<motion.div
				style={dotStyle}
				className="fixed pointer-events-none z-[999] w-2 h-2 rounded-full bg-brand-400 hidden md:block"
			/>
		</>
	)
}
