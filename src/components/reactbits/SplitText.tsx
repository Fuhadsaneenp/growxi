import { motion } from "framer-motion"

/** Reveals text word-by-word (or char-by-char) on scroll into view. */
export function SplitText({
	text,
	className,
	delay = 0,
	by = "word",
	blur = true,
	once = true,
}: {
	text: string
	className?: string
	delay?: number
	by?: "word" | "char"
	blur?: boolean
	once?: boolean
}) {
	const parts = by === "char" ? text.split("") : text.split(" ")
	const hidden = {
		opacity: 0,
		y: "0.4em",
		filter: blur ? "blur(8px)" : "blur(0px)",
	}
	const shown = { opacity: 1, y: "0em", filter: "blur(0px)" }
	const wrapStyle = { display: "inline-block" } as React.CSSProperties
	const partStyle = { display: "inline-block", whiteSpace: "pre" } as React.CSSProperties
	return (
		<span className={className} style={wrapStyle} aria-label={text}>
			{parts.map((p, i) => (
				<motion.span
					key={i}
					aria-hidden
					style={partStyle}
					initial={hidden}
					whileInView={shown}
					viewport={ { once, margin: "-60px" } }
					transition={ { duration: 0.55, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] } }
				>
					{by === "word" ? p + "\u00A0" : p === " " ? "\u00A0" : p}
				</motion.span>
			))}
		</span>
	)
}
