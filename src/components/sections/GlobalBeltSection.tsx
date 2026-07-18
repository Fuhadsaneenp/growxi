const BELT_ITEMS = [
	"\uD83C\uDDE6\uD83C\uDDEA UAE",
	"\uD83C\uDDF6\uD83C\uDDE6 Qatar",
	"\uD83C\uDDF8\uD83C\uDDE6 Saudi Arabia",
	"\uD83C\uDDF0\uD83C\uDDFC Kuwait",
	"\uD83C\uDDE7\uD83C\uDDED Bahrain",
	"\uD83C\uDDF4\uD83C\uDDF2 Oman",
	"\uD83C\uDDEE\uD83C\uDDF3 India",
	"\uD83C\uDDEC\uD83C\uDDE7 UK",
	"\uD83C\uDDE8\uD83C\uDDE6 Canada",
	"\uD83C\uDDE6\uD83C\uDDFA Australia",
	"\uD83C\uDDF8\uD83C\uDDEC Singapore",
	"\uD83C\uDDE9\uD83C\uDDEA Germany",
]

export function GlobalBeltSection() {
	const doubled = [...BELT_ITEMS, ...BELT_ITEMS]
	return (
		<div className="py-12 border-y border-black/[0.06] overflow-hidden bg-ink-900/30">
			<p className="text-center text-ink-500 text-sm mb-6 uppercase tracking-widest font-mono">
				Professionals Hired Across
			</p>
			<div className="relative">
				<div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink-950 to-transparent z-10" />
				<div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink-950 to-transparent z-10" />
				<div className="flex w-max animate-ticker">
					{doubled.map((item, i) => (
						<span
							key={i}
							className="px-8 text-ink-300 font-medium text-base whitespace-nowrap"
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
