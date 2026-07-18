import { useEffect, useRef, useState } from "react"

/** Simple count-up animation hook used as a lightweight alternative to react-countup. */
export function useCountUp(end: number, duration = 2000, start = false) {
	const [value, setValue] = useState(0)
	const rafRef = useRef<number>()

	useEffect(() => {
		if (!start) return
		let startTime: number | null = null

		const tick = (now: number) => {
			if (startTime === null) startTime = now
			const progress = Math.min((now - startTime) / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3)
			setValue(Math.round(eased * end))
			if (progress < 1) rafRef.current = requestAnimationFrame(tick)
		}

		rafRef.current = requestAnimationFrame(tick)
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [end, duration, start])

	return value
}
