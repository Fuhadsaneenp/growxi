import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/** Helper to split a string into character spans for stagger animation. */
export function splitChars(text: string) {
	return text.split("").map((c) => (c === " " ? "\u00A0" : c))
}

/** Reveal a list of elements as they scroll into view. */
export function scrollReveal(
	targets: gsap.TweenTarget,
	options: { y?: number; stagger?: number; trigger?: Element } = {},
) {
	const { y = 40, stagger = 0.1, trigger } = options
	return gsap.fromTo(
		targets,
		{ y, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power3.out",
			stagger,
			scrollTrigger: trigger
				? { trigger, start: "top 80%", toggleActions: "play none none none" }
				: undefined,
		},
	)
}

export { gsap, ScrollTrigger }
