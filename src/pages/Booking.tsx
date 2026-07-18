import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import toast from "react-hot-toast"
import {
	User,
	Mail,
	Phone,
	FileText,
	MessageSquare,
	ArrowRight,
	ArrowLeft,
	Check,
	Clock,
	CheckCircle2,
	MessageCircle,
	ShieldCheck,
} from "lucide-react"
import { useBookingStore } from "@/app/store"
import { whatsappLink } from "@/lib/utils"
import { PaymentMethods } from "@/components/ui/PaymentMethods"
import { PAYMENT_CONFIG, priceLabel } from "@/lib/payments"
import type { Currency } from "@/lib/payments"

const schema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email"),
	phone: z.string().min(10, "Enter a valid phone number"),
	currentRole: z.string().min(2, "Enter your current/last role"),
	targetRole: z.string().min(3, "Tell us your target role"),
	experience: z.string().min(1, "Select your experience"),
	format: z.enum(["gcc", "domestic", "europass"]),
	plan: z.enum(["standard", "premium", "executive"]),
	notes: z.string().optional(),
})

type BookingData = z.infer<typeof schema>

const FORMATS = [
	{ id: "gcc", label: "GCC / Gulf", desc: "UAE, KSA, Qatar\u2026" },
	{ id: "domestic", label: "Domestic", desc: "India" },
	{ id: "europass", label: "Europass", desc: "Europe / UK" },
] as const

const PLANS = [
	{ id: "standard", label: "Standard" },
	{ id: "premium", label: "Premium" },
	{ id: "executive", label: "Executive" },
] as const

const STEP_FIELDS: Array<Array<keyof BookingData>> = [
	["name", "email", "phone"],
	["currentRole", "targetRole", "experience"],
	["format", "plan"],
	[],
]

const STEP_LABELS = ["Your Details", "Career", "Format & Plan", "Payment"]

function useWindowSize() {
	const [size, setSize] = useState({ width: 0, height: 0 })
	useEffect(() => {
		const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
		update()
		window.addEventListener("resize", update)
		return () => window.removeEventListener("resize", update)
	}, [])
	return size
}

const inputClass =
	"w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-black/10 text-ink-100 text-sm focus:outline-none focus:border-brand-500/60 transition-colors"

export default function Booking() {
	const storePlan = useBookingStore((s) => s.selectedPlan)
	const storeFormat = useBookingStore((s) => s.selectedFormat)
	const [step, setStep] = useState(0)
	const [done, setDone] = useState(false)
	const [currency, setCurrency] = useState<Currency>(PAYMENT_CONFIG.defaultCurrency)
	const { width, height } = useWindowSize()

	const {
		register,
		trigger,
		watch,
		setValue,
		formState: { errors },
	} = useForm<BookingData>({
		resolver: zodResolver(schema),
		defaultValues: {
			format: storeFormat ?? "gcc",
			plan: storePlan ?? "standard",
			experience: "",
		},
	})

	const selectedFormat = watch("format")
	const selectedPlan = watch("plan")

	const next = async () => {
		const valid = await trigger(STEP_FIELDS[step])
		if (valid) setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1))
	}
	const back = () => setStep((s) => Math.max(s - 1, 0))

	const handlePaid = () => {
		const v = watch()
		setDone(true)
		toast.success("Order received! Redirecting to WhatsApp\u2026")
		const message =
			"Hi GrowXi! I just ordered the " +
			v.plan +
			" resume package (" +
			v.format.toUpperCase() +
			" format, " +
			priceLabel(v.plan, currency) +
			"). Name: " +
			v.name +
			", target role: " +
			v.targetRole +
			"."
		setTimeout(() => {
			window.open(whatsappLink(message), "_blank")
		}, 1400)
	}

	const planLabel = PLANS.find((p) => p.id === selectedPlan)?.label ?? "Standard"
	const formatLabel = FORMATS.find((f) => f.id === selectedFormat)?.label ?? "GCC / Gulf"

	if (done) {
		return (
			<main className="min-h-[100svh] flex items-center justify-center px-6 pt-24">
				<Confetti width={width} height={height} recycle={false} numberOfPieces={400} />
				<motion.div
					initial={ { opacity: 0, scale: 0.9 } }
					animate={ { opacity: 1, scale: 1 } }
					className="glass-card glow-border p-10 md:p-14 text-center max-w-lg"
				>
					<div className="w-16 h-16 rounded-full bg-accent-500/15 border border-accent-500/40 flex items-center justify-center mx-auto mb-6">
						<CheckCircle2 size={32} className="text-accent-400" />
					</div>
					<h1 className="font-display font-extrabold text-display-sm text-ink-50 mb-3">
						Your resume is in motion! 🎉
					</h1>
					<p className="text-ink-300 mb-8">
						We&rsquo;ve received your order. Our experts will confirm the details on WhatsApp within minutes and get started right away.
					</p>
					<a
						href={whatsappLink("Hi GrowXi! I just placed an order for my resume.")}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold"
					>
						<MessageCircle size={18} /> Open WhatsApp
					</a>
				</motion.div>
			</main>
		)
	}

	return (
		<main className="pt-32 pb-24">
			<div className="max-w-2xl mx-auto px-6">
				<div className="text-center mb-10">
					<h1 className="font-display font-extrabold text-display-md text-ink-50 mb-3">
						Build Your <span className="gradient-text">Resume</span>
					</h1>
					<p className="text-ink-300">Takes under 2 minutes. Pay securely, confirmed on WhatsApp.</p>
				</div>

				<div className="flex items-center justify-between mb-8">
					{STEP_LABELS.map((label, i) => (
						<div key={label} className="flex-1 flex items-center">
							<div className="flex flex-col items-center flex-shrink-0">
								<div
									className={
										"w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all " +
										(i < step
											? "bg-accent-500 text-white"
											: i === step
												? "bg-brand-500 text-white shadow-brand-md"
												: "bg-ink-800 text-ink-400")
									}
								>
									{i < step ? <Check size={16} /> : i + 1}
								</div>
								<span className="text-[10px] text-ink-400 mt-1.5 hidden sm:block">{label}</span>
							</div>
							{i < STEP_LABELS.length - 1 && (
								<div
									className={
										"flex-1 h-0.5 mx-2 transition-all " +
										(i < step ? "bg-accent-500" : "bg-ink-800")
									}
								/>
							)}
						</div>
					))}
				</div>

				<form onSubmit={(e) => e.preventDefault()} className="glass-card p-6 md:p-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={step}
							initial={ { opacity: 0, x: 20 } }
							animate={ { opacity: 1, x: 0 } }
							exit={ { opacity: 0, x: -20 } }
							transition={ { duration: 0.25 } }
							className="space-y-4"
						>
							{step === 0 && (
								<>
									<Field icon={User} label="Full Name" error={errors.name?.message}>
										<input {...register("name")} className={inputClass} placeholder="Your full name" />
									</Field>
									<Field icon={Mail} label="Email" error={errors.email?.message}>
										<input {...register("email")} className={inputClass} placeholder="you@example.com" />
									</Field>
									<Field icon={Phone} label="WhatsApp Number" error={errors.phone?.message}>
										<input {...register("phone")} className={inputClass} placeholder="+91 …" />
									</Field>
								</>
							)}

							{step === 1 && (
								<>
									<Field icon={FileText} label="Current / Last Role" error={errors.currentRole?.message}>
										<input {...register("currentRole")} className={inputClass} placeholder="e.g. Accountant" />
									</Field>
									<Field icon={ArrowRight} label="Target Role" error={errors.targetRole?.message}>
										<input {...register("targetRole")} className={inputClass} placeholder="e.g. Finance Manager" />
									</Field>
									<Field icon={Clock} label="Years of Experience" error={errors.experience?.message}>
										<select {...register("experience")} className={inputClass}>
											<option value="">Select…</option>
											<option value="0-2">0&ndash;2 years</option>
											<option value="3-5">3&ndash;5 years</option>
											<option value="6-10">6&ndash;10 years</option>
											<option value="10+">10+ years</option>
										</select>
									</Field>
								</>
							)}

							{step === 2 && (
								<>
									<div>
										<label className="text-sm text-ink-300 mb-2 block">Resume Format</label>
										<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
											{FORMATS.map((f) => (
												<button
													type="button"
													key={f.id}
													onClick={() => setValue("format", f.id, { shouldValidate: true })}
													className={
														"p-3 rounded-xl border text-left transition-all " +
														(selectedFormat === f.id
															? "border-brand-500/60 bg-brand-500/10"
															: "border-black/10 hover:bg-black/[0.04]")
													}
												>
													<span className="block text-ink-50 text-sm font-medium">{f.label}</span>
													<span className="block text-ink-400 text-xs">{f.desc}</span>
												</button>
											))}
										</div>
									</div>
									<div>
										<label className="text-sm text-ink-300 mb-2 block">Plan</label>
										<div className="grid grid-cols-3 gap-2">
											{PLANS.map((p) => (
												<button
													type="button"
													key={p.id}
													onClick={() => setValue("plan", p.id, { shouldValidate: true })}
													className={
														"p-3 rounded-xl border text-center transition-all " +
														(selectedPlan === p.id
															? "border-accent-500/60 bg-accent-500/10"
															: "border-black/10 hover:bg-black/[0.04]")
													}
												>
													<span className="block text-ink-50 text-sm font-medium">{p.label}</span>
													<span className="block text-ink-400 text-xs">{priceLabel(p.id, currency)}</span>
												</button>
											))}
										</div>
									</div>
								</>
							)}

							{step === 3 && (
								<div className="space-y-5">
									<div className="flex items-center justify-between">
										<label className="text-sm text-ink-300">Currency</label>
										<div className="inline-flex rounded-xl border border-black/10 p-1 bg-ink-900/40">
											{(["INR", "USD"] as const).map((c) => (
												<button
													type="button"
													key={c}
													onClick={() => setCurrency(c)}
													className={
														"px-4 py-1.5 rounded-lg text-sm font-medium transition-all " +
														(currency === c
															? "bg-brand-500 text-white"
															: "text-ink-300")
													}
												>
													{c}
												</button>
											))}
										</div>
									</div>

									<div className="rounded-2xl border border-black/10 bg-ink-900/30 p-5">
										<div className="flex items-center justify-between text-sm">
											<span className="text-ink-300">{planLabel} plan</span>
											<span className="text-ink-100 font-medium">{formatLabel}</span>
										</div>
										<div className="flex items-center justify-between mt-3 pt-3 border-t border-black/10">
											<span className="text-ink-50 font-semibold">Total</span>
											<span className="font-display font-extrabold text-2xl gradient-text">
												{priceLabel(selectedPlan, currency)}
											</span>
										</div>
									</div>

									<Field icon={MessageSquare} label="Notes (optional)">
										<textarea {...register("notes")} rows={2} className={inputClass + " resize-none"} placeholder="Anything we should know?" />
									</Field>

									<PaymentMethods
										plan={selectedPlan}
										currency={currency}
										payer={ { name: watch("name"), email: watch("email"), phone: watch("phone") } }
										onPaid={handlePaid}
									/>

									<p className="flex items-center justify-center gap-1.5 text-ink-400 text-xs">
										<ShieldCheck size={14} className="text-accent-500" /> Secure checkout &middot; Stripe, PayPal & Razorpay
									</p>
								</div>
							)}
						</motion.div>
					</AnimatePresence>

					<div className="flex items-center justify-between mt-8 pt-6 border-t border-black/10">
						<button
							type="button"
							onClick={back}
							disabled={step === 0}
							className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-ink-300 text-sm disabled:opacity-30"
						>
							<ArrowLeft size={16} /> Back
						</button>
						{step < STEP_FIELDS.length - 1 && (
							<button
								type="button"
								onClick={next}
								className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
							>
								{step === STEP_FIELDS.length - 2 ? "To Payment" : "Next"} <ArrowRight size={16} />
							</button>
						)}
					</div>
				</form>
			</div>
		</main>
	)
}

function Field({
	icon: Icon,
	label,
	error,
	children,
}: {
	icon: React.ComponentType<{ size?: number | string }>
	label: string
	error?: string
	children: React.ReactNode
}) {
	return (
		<div>
			<label className="flex items-center gap-2 text-sm text-ink-300 mb-1.5">
				<Icon size={14} /> {label}
			</label>
			{children}
			{error && <p className="text-red-400 text-xs mt-1">{error}</p>}
		</div>
	)
}
