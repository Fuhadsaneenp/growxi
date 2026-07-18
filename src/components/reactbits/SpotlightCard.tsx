import { useRef } from "react"
import { cn } from "@/lib/utils"

/** Card with a radial spotlight that follows the cursor (React Bits style). */
export function SpotlightCard({
	children,
	className,
	spotlightColor = "rgba(242,106,65,0.16)",
}: {
	children: React.ReactNode
	className?: string
	spotlightColor?: string
}) {
	const ref = useRef<HTMLDivElement>(null)
	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = ref.current
		if (!el) return
		const r = el.getBoundingClientRect()
		el.style.setProperty("--mx", e.clientX - r.left + "px")
		el.style.setProperty("--my", e.clientY - r.top + "px")
	}
	const style = { "--spot": spotlightColor } as React.CSSProperties
	return (
		<div
			ref={ref}
			onMouseMove={onMove}
			style={style}
			className={cn("spotlight-card", className)}
		>
			{children}
		</div>
	)
}
