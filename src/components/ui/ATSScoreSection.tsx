import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react"
import { Aurora } from "@/components/reactbits/Aurora"
import { SplitText } from "@/components/reactbits/SplitText"
import { GradientText } from "@/components/reactbits/GradientText"
import { Magnet } from "@/components/reactbits/Magnet"
import { AnimatedContent } from "@/components/reactbits/AnimatedContent"
import { whatsappLink } from "@/lib/utils"

const CHECKS = [
	"Keyword & skills match against the job description",
	"Formatting & parse-ability in real ATS software",
	"Section structure, headings & contact block",
	"Action verbs, metrics & measurable impact",
]

/**
 * Free ATS score check via a prefilled WhatsApp flow. Mobile-first: single
 * column on phones, balanced spacing, and a 52px primary tap target.
 */
export function ATSScoreSection() {
	const href = whatsappLink("Hi Growxi! Please check my ATS score.")
	return (
		<section className="relative overflow-hidden py-20 sm:py-28 px-5 sm:px-6">
			<Aurora className="opacity-60" />
			<div className="relative z-10 max-w-3xl mx-auto text-center glass-card rounded-3xl p-7 sm:p-12">
				<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-700 text-xs sm:text-sm font-medium mb-6">
					<Sparkles size={14} className="text-accent-500" /> 100% Free &middot; No sign-up
				</span>
				<h2 className="font-display font-extrabold mb-4">
					<SplitText text="Get your free ATS score" className="text-display-md text-ink-50" by="word" />
				</h2>
				<p className="text-ink-300 text-base sm:text-lg max-w-xl mx-auto mb-8">
					Send your current resume on WhatsApp and our experts will{" "}
					<GradientText className="font-semibold">score it against real ATS checks</GradientText> &mdash; free.
				</p>
				<AnimatedContent className="grid sm:grid-cols-2 gap-3 text-left mb-9">
					{CHECKS.map((c) => (
						<div key={c} className="flex items-start gap-3 glass-card rounded-2xl p-4">
							<CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
							<span className="text-ink-200 text-sm">{c}</span>
						</div>
					))}
				</AnimatedContent>
				<Magnet className="inline-block">
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-white font-semibold text-base min-h-[52px]"
					>
						<MessageCircle size={18} /> Check my ATS score
					</a>
				</Magnet>
			</div>
		</section>
	)
}
