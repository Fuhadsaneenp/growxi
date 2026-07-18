import { useInView as useFramerInView } from "framer-motion"
import { useRef } from "react"

/** Thin wrapper returning a ref + inView boolean (fires once). */
export function useInView(margin: string = "-100px") {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useFramerInView(ref, { once: true, margin: margin as any })
	return { ref, inView }
}
