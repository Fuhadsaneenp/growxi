import { motion } from "framer-motion"

const pageVariants = {
	initial: { opacity: 0, y: 20, filter: "blur(4px)" },
	enter: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: { opacity: 0, y: -20, filter: "blur(4px)" },
}

const pageTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

export function PageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="enter"
			exit="exit"
			transition={pageTransition}
		>
			{children}
		</motion.div>
	)
}
