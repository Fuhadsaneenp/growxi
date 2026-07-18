import { motion } from "framer-motion"

/** Slides/fades children into view on scroll (React Bits style). */
export function AnimatedContent({
	children,
	className,
	distance = 40,
	direction = "vertical",
	delay = 0,
	duration = 0.65,
	once = true,
}: {
	children: React.ReactNode
	className?: string
	distance?: number
	direction?: "vertical" | "horizontal"
	delay?: number
	duration?: number
	once?: boolean
}) {
	const initial =
		direction === "horizontal"
			? { opacity: 0, x: distance }
			: { opacity: 0, y: distance }
	return (
		<motion.div
			className={className}
			initial={initial}
			whileInView={ { opacity: 1, x: 0, y: 0 } }
			viewport={ { once, margin: "-80px" } }
			transition={ { duration, delay, ease: [0.16, 1, 0.3, 1] } }
		>
			{children}
		</motion.div>
	)
}
