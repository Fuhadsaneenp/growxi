import { motion } from "framer-motion"

/** Soft animated aurora blobs for light backgrounds (React Bits style). */
export function Aurora({ className = "" }: { className?: string }) {
	return (
		<div className={"absolute inset-0 overflow-hidden pointer-events-none " + className}>
			<motion.div
				animate={ { x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] } }
				transition={ { duration: 16, repeat: Infinity, ease: "easeInOut" } }
				className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-brand-400/25 blur-[110px]"
			/>
			<motion.div
				animate={ { x: [0, -35, 0], y: [0, 30, 0], scale: [1, 1.15, 1] } }
				transition={ { duration: 19, repeat: Infinity, ease: "easeInOut" } }
				className="absolute top-10 right-0 w-[30rem] h-[30rem] rounded-full bg-accent-400/22 blur-[120px]"
			/>
			<motion.div
				animate={ { x: [0, 25, 0], y: [0, 20, 0] } }
				transition={ { duration: 22, repeat: Infinity, ease: "easeInOut" } }
				className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full bg-gold-400/15 blur-[120px]"
			/>
		</div>
	)
}
