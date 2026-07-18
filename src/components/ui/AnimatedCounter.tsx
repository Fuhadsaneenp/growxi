import { useRef } from "react"
import { useInView } from "framer-motion"
import CountUp from "react-countup"

export function AnimatedCounter({
	end,
	suffix = "",
	delay = 0,
	duration = 2.5,
}: {
	end: number
	suffix?: string
	delay?: number
	duration?: number
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, margin: "-80px" })
	return (
		<span ref={ref}>
			{inView ? (
				<CountUp end={end} duration={duration} delay={delay} separator="," />
			) : (
				0
			)}
			{suffix}
		</span>
	)
}
