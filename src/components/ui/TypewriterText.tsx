import Typewriter from "typewriter-effect"

export function TypewriterText({
	strings,
	loop = true,
}: {
	strings: string[]
	loop?: boolean
}) {
	return (
		<Typewriter
			onInit={(tw) => {
				strings.forEach((s) => {
					tw.typeString(s).pauseFor(1500).deleteAll()
				})
				tw.start()
			}}
			options={ { loop, delay: 55, deleteSpeed: 30 } }
		/>
	)
}
