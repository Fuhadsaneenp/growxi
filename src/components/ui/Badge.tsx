import { cn } from "@/lib/utils"

type Tone = "brand" | "accent" | "gold"

const TONE: Record<Tone, string> = {
	brand: "bg-brand-500/10 border-brand-500/30 text-brand-300",
	accent: "bg-accent-500/10 border-accent-500/30 text-accent-400",
	gold: "bg-gold-500/10 border-gold-500/30 text-gold-400",
}

export function Badge({
	children,
	tone = "brand",
	className,
}: {
	children: React.ReactNode
	tone?: Tone
	className?: string
}) {
	return (
		<span
			className={cn(
				"inline-block px-4 py-1.5 rounded-full border text-sm font-medium",
				TONE[tone],
				className,
			)}
		>
			{children}
		</span>
	)
}
