import { motion } from "framer-motion"
import { fadeUp, viewportOnce } from "@/lib/animations"

export function ScrollReveal({
	children,
	delay = 0,
	className,
}: {
	children: React.ReactNode
	delay?: number
	className?: string
}) {
	return (
		<motion.div
			variants={fadeUp}
			initial="hidden"
			whileInView="show"
			viewport={viewportOnce}
			transition={ { delay } }
			className={className}
		>
			{children}
		</motion.div>
	)
}
