import { cn } from "@/lib/utils"

/** Sweeping shine across text (React Bits style). */
export function ShinyText({
	text,
	className,
	speed = 4,
}: {
	text: string
	className?: string
	speed?: number
}) {
	const style = { animationDuration: speed + "s" } as React.CSSProperties
	return (
		<span className={cn("shiny-text", className)} style={style}>
			{text}
		</span>
	)
}
