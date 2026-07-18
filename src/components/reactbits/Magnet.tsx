import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/** Wraps children so they magnetically follow the cursor (React Bits style). */
export function Magnet({
	children,
	className,
	strength = 0.35,
}: {
	children: React.ReactNode
	className?: string
	strength?: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = ref.current
		if (!el) return
		const r = el.getBoundingClientRect()
		const x = (e.clientX - r.left - r.width / 2) * strength
		const y = (e.clientY - r.top - r.height / 2) * strength
		setPos({ x, y })
	}
	const reset = () => setPos({ x: 0, y: 0 })
	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={reset}
			animate={ { x: pos.x, y: pos.y } }
			transition={ { type: "spring", stiffness: 200, damping: 15, mass: 0.4 } }
			className={cn("inline-block", className)}
		>
			{children}
		</motion.div>
	)
}
