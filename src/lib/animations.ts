import type { Variants } from "framer-motion"

/** Shared Framer Motion variants used across sections. */
export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.5 } },
}

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.85 },
	show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

export const staggerContainer: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const viewportOnce = { once: true, margin: "-80px" } as const
