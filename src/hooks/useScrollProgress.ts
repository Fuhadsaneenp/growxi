import { useEffect, useState } from "react"

/** Returns scroll progress of the page (0–1). */
export function useScrollProgress() {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			const scrollTop = window.scrollY
			const height =
				document.documentElement.scrollHeight - window.innerHeight
			setProgress(height > 0 ? scrollTop / height : 0)
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return progress
}
