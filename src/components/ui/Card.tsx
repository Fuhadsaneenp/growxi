import { cn } from "@/lib/utils"

export function Card({
	children,
	className,
	glow,
}: {
	children: React.ReactNode
	className?: string
	glow?: boolean
}) {
	return (
		<div
			className={cn(
				"glass-card p-8",
				glow && "glow-border",
				className,
			)}
		>
			{children}
		</div>
	)
}
