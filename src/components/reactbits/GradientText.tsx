import { cn } from "@/lib/utils"

/** Animated gradient text (React Bits style). */
export function GradientText({
	children,
	className,
	colors = ["#7A2E9D", "#9B4FC0", "#F26A41", "#9B4FC0", "#7A2E9D"],
	duration = 6,
}: {
	children: React.ReactNode
	className?: string
	colors?: string[]
	duration?: number
}) {
	const style = {
		backgroundImage: "linear-gradient(90deg, " + colors.join(", ") + ")",
		backgroundSize: "300% 100%",
		animationDuration: duration + "s",
	} as React.CSSProperties
	return (
		<span
			style={style}
			className={cn(
				"inline-block bg-clip-text text-transparent animate-gradient-x",
				className,
			)}
		>
			{children}
		</span>
	)
}
