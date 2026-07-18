import { Link } from "react-router-dom"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { cn } from "@/lib/utils"

export function MagneticButton({
	to,
	children,
	className,
	strength = 0.25,
}: {
	to: string
	children: React.ReactNode
	className?: string
	strength?: number
}) {
	const ref = useMagneticEffect<HTMLAnchorElement>(strength)
	return (
		<Link ref={ref} to={to} className={cn("inline-block", className)}>
			{children}
		</Link>
	)
}
