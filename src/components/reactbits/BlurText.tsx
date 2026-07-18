import { SplitText } from "./SplitText"

/** Blur-in text reveal (React Bits style) — thin wrapper over SplitText. */
export function BlurText({
	text,
	className,
	delay = 0,
	by = "word",
}: {
	text: string
	className?: string
	delay?: number
	by?: "word" | "char"
}) {
	return <SplitText text={text} className={className} delay={delay} by={by} blur />
}
