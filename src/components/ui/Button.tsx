import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type Variant = "primary" | "outline" | "ghost"

interface BaseProps {
	variant?: Variant
	className?: string
	children: React.ReactNode
}

const VARIANT_CLASS: Record<Variant, string> = {
	primary: "btn-primary text-white shadow-brand-md",
	outline: "btn-outline text-ink-200",
	ghost: "btn-ghost text-ink-200",
}

const base =
	"inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold cursor-pointer select-none"

type ButtonProps = BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never }
type LinkProps = BaseProps & { to: string }
type AnchorProps = BaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonProps | LinkProps | AnchorProps) {
	const { variant = "primary", className, children } = props
	const classes = cn(base, VARIANT_CLASS[variant], className)

	if ("to" in props && props.to) {
		return (
			<Link to={props.to} className={classes}>
				{children}
			</Link>
		)
	}
	if ("href" in props && props.href) {
		const { variant: _v, className: _c, children: _ch, ...rest } = props
		return (
			<a className={classes} {...rest}>
				{children}
			</a>
		)
	}
	const { variant: _v, className: _c, children: _ch, ...rest } =
		props as ButtonProps
	return (
		<button className={classes} {...rest}>
			{children}
		</button>
	)
}
