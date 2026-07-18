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
import { PAYMENT_CONFIG, priceLabel, setDiscountActive } from "@/lib/payments"
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

const CURRENCIES = [
	{ code: "INR", label: "INR (₹)", name: "Indian Rupee" },
	{ code: "USD", label: "USD ($)", name: "US Dollar" },
	{ code: "AED", label: "AED (AED)", name: "UAE Dirham" },
	{ code: "EUR", label: "EUR (€)", name: "Euro" },
	{ code: "SAR", label: "SAR (SAR)", name: "Saudi Riyal" },
	{ code: "KWD", label: "KWD (KWD)", name: "Kuwaiti Dinar" },
	{ code: "EGP", label: "EGP (EGP)", name: "Egyptian Pound" },
	{ code: "GBP", label: "GBP (£)", name: "British Pound" },
	{ code: "QAR", label: "QAR (QAR)", name: "Qatari Riyal" },
	{ code: "OMR", label: "OMR (OMR)", name: "Omani Rial" },
	{ code: "BHD", label: "BHD (BHD)", name: "Bahraini Dinar" },
] as const

export default function Booking() {
	const storePlan = useBookingStore((s) => s.selectedPlan)
	const storeFormat = useBookingStore((s) => s.selectedFormat)
	const [step, setStep] = useState(0)
	const [done, setDone] = useState(false)
	const [currency, setCurrency] = useState<Currency>(PAYMENT_CONFIG.defaultCurrency)
	const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
	const [isDiscounted, setIsDiscounted] = useState(false)
	const [countdown, setCountdown] = useState(10)
	const [receiptNo] = useState(() => "GRX-" + Math.floor(100000 + Math.random() * 900000))
	const [receiptDate] = useState(() => new Date().toLocaleDateString(undefined, { dateStyle: "long" }))
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

	const planLabel = PLANS.find((p) => p.id === selectedPlan)?.label ?? "Standard"
	const formatLabel = FORMATS.find((f) => f.id === selectedFormat)?.label ?? "GCC / Gulf"

	const handlePaid = () => {
		setDone(true)
		toast.success("Payment successful! Receipt generated.")
	}

	useEffect(() => {
		if (!done) return
		const timer = setInterval(() => {
			setCountdown((c) => {
				if (c <= 1) {
					clearInterval(timer)
					const v = watch()
					const formattedPrice = priceLabel(v.plan, currency)
					const message = `Hi GrowXi! I have successfully ordered. Here is my payment receipt:\n\n*GrowXi Order Receipt*\n---------------------------\n*Status*: Successful ✅\n*Receipt No*: ${receiptNo}\n*Date*: ${receiptDate}\n*Name*: ${v.name}\n*Email*: ${v.email}\n*Phone*: ${v.phone}\n*Plan*: ${planLabel} Resume Package\n*Format*: ${formatLabel}\n*Amount Paid*: ${formattedPrice}\n\nThank you for choosing GrowXi!`
					window.location.href = whatsappLink(message)
					return 0
				}
				return c - 1
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [done, receiptNo, receiptDate, planLabel, formatLabel, currency])

	if (done) {
		const v = watch()
		const formattedPrice = priceLabel(v.plan, currency)
		const message = `Hi GrowXi! I have successfully ordered. Here is my payment receipt:\n\n*GrowXi Order Receipt*\n---------------------------\n*Status*: Successful ✅\n*Receipt No*: ${receiptNo}\n*Date*: ${receiptDate}\n*Name*: ${v.name}\n*Email*: ${v.email}\n*Phone*: ${v.phone}\n*Plan*: ${planLabel} Resume Package\n*Format*: ${formatLabel}\n*Amount Paid*: ${formattedPrice}\n\nThank you for choosing GrowXi!`

		return (
			<main className="min-h-[100svh] flex items-center justify-center px-6 pt-24 pb-12">
				<Confetti width={width} height={height} recycle={false} numberOfPieces={400} />
				<motion.div
					initial={ { opacity: 0, scale: 0.9 } }
					animate={ { opacity: 1, scale: 1 } }
					className="glass-card glow-border p-8 md:p-10 text-center max-w-md w-full relative"
				>
					<div className="w-16 h-16 rounded-full bg-accent-500/15 border border-accent-500/40 flex items-center justify-center mx-auto mb-5">
						<CheckCircle2 size={32} className="text-accent-400" />
					</div>
					<h1 className="font-display font-extrabold text-display-xs text-ink-50 mb-1">
						Payment Successful! 🎉
					</h1>
					<p className="text-ink-300 text-sm mb-6">
						Your payment receipt has been generated.
					</p>

					{/* Receipt Card */}
					<div className="bg-ink-950/80 border border-black/20 rounded-2xl p-5 mb-6 text-left font-mono text-xs text-ink-200 relative overflow-hidden shadow-2xl">
						{/* Top receipt decoration */}
						<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
						
						<div className="flex justify-between items-center mb-4">
							<span className="text-ink-50 font-bold tracking-wider">GROWXI RECEIPT</span>
							<span className="bg-accent-500/20 text-accent-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
								PAID
							</span>
						</div>

						<div className="border-b border-dashed border-white/10 pb-3 mb-3 space-y-1.5">
							<div className="flex justify-between">
								<span className="text-ink-400">Receipt No:</span>
								<span className="text-ink-100 font-medium">{receiptNo}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-ink-400">Date:</span>
								<span className="text-ink-100 font-medium">{receiptDate}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-ink-400">Status:</span>
								<span className="text-emerald-400 font-bold">Successful</span>
							</div>
						</div>

						<div className="border-b border-dashed border-white/10 pb-3 mb-3 space-y-1.5">
							<div className="flex justify-between">
								<span className="text-ink-400">Customer:</span>
								<span className="text-ink-100 font-medium truncate max-w-[180px]">{v.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-ink-400">Email:</span>
								<span className="text-ink-100 font-medium truncate max-w-[180px]">{v.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-ink-400">Phone:</span>
								<span className="text-ink-100 font-medium">{v.phone}</span>
							</div>
						</div>

						<div className="space-y-1.5">
							<div className="flex justify-between">
								<span className="text-ink-400">Plan:</span>
								<span className="text-ink-100 font-medium">{planLabel}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-ink-400">Format:</span>
								<span className="text-ink-100 font-medium">{formatLabel}</span>
							</div>
							<div className="flex justify-between pt-2 border-t border-white/5 mt-2 text-sm">
								<span className="text-ink-100 font-bold">Amount Paid:</span>
								<span className="text-brand-300 font-extrabold">{formattedPrice}</span>
							</div>
						</div>
					</div>

					<p className="text-ink-300 text-sm mb-6 flex items-center justify-center gap-2">
						<span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
						Sharing receipt on WhatsApp automatically in <span className="font-bold text-ink-100">{countdown}s</span>...
					</p>

					<a
						href={whatsappLink(message)}
						className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold shadow-brand-md"
					>
						<MessageCircle size={18} /> Open WhatsApp Now
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
													<span className="block text-ink-400 text-xs">
														{p.id === "standard" && isDiscounted ? (
															<span>
																<span className="line-through opacity-60 mr-1.5">{currency === "INR" ? "₹999" : "$12"}</span>
																<span>{priceLabel(p.id, currency)}</span>
															</span>
														) : (
															priceLabel(p.id, currency)
														)}
													</span>
												</button>
											))}
										</div>
									</div>
								</>
							)}

							{step === 3 && (
								<div className="space-y-5">
									<div className="flex items-center justify-between relative">
										<label className="text-sm text-ink-300">Currency</label>
										<div className="relative">
											<button
												type="button"
												onWheel={() => {
													if (!isDiscounted) {
														setIsDiscounted(true)
														setDiscountActive(true)
														toast.success("🎉 Promo Unlocked: ₹900 Discount Applied to Standard Plan!")
													}
												}}
												onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
												className="inline-flex items-center justify-between gap-2.5 rounded-xl border border-black/10 px-4 py-2.5 bg-ink-900/60 text-ink-100 text-sm font-medium transition-all hover:bg-ink-900/80 min-w-[130px]"
											>
												<span>{currency} ({currency === "INR" ? "₹" : currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency})</span>
												<svg
													className={"w-4 h-4 text-ink-300 transition-transform " + (isCurrencyOpen ? "rotate-180" : "")}
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
												</svg>
											</button>

											{isCurrencyOpen && (
												<>
													<div className="fixed inset-0 z-40" onClick={() => setIsCurrencyOpen(false)} />
													<div 
														onWheel={() => {
															if (!isDiscounted) {
																setIsDiscounted(true)
																setDiscountActive(true)
																toast.success("🎉 Promo Unlocked: ₹900 Discount Applied to Standard Plan!")
															}
														}}
														onScroll={(e) => {
															if (e.currentTarget.scrollTop > 2 && !isDiscounted) {
																setIsDiscounted(true)
																setDiscountActive(true)
																toast.success("🎉 Promo Unlocked: ₹900 Discount Applied to Standard Plan!")
															}
														}}
														className="absolute right-0 mt-1.5 w-60 rounded-xl border border-black/10 bg-ink-950/95 backdrop-blur-md p-1 shadow-2xl z-50 max-h-60 overflow-y-auto"
													>
														{CURRENCIES.map((c) => (
															<button
																type="button"
																key={c.code}
																onClick={() => {
																	setCurrency(c.code)
																	setIsCurrencyOpen(false)
																}}
																className={
																	"w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between " +
																	(currency === c.code
																		? "bg-brand-500 text-white font-medium"
																		: "text-ink-100 hover:bg-white/5")
																}
															>
																<span className="truncate mr-2">{c.name}</span>
																<span className={"text-xs shrink-0 " + (currency === c.code ? "text-white/80" : "text-ink-400")}>
																	{c.label}
																</span>
															</button>
														))}
													</div>
												</>
											)}
										</div>
									</div>

									<div className="rounded-2xl border border-black/10 bg-ink-900/30 p-5">
										<div className="flex items-center justify-between text-sm">
											<span className="text-ink-300">{planLabel} plan</span>
											<span className="text-ink-100 font-medium">{formatLabel}</span>
										</div>
										<div className="flex items-center justify-between mt-3 pt-3 border-t border-black/10">
											<span className="text-ink-50 font-semibold">Total</span>
											<span className="font-display font-extrabold text-2xl gradient-text flex items-center gap-2">
												{selectedPlan === "standard" && isDiscounted && (
													<span className="line-through text-ink-400 text-sm font-semibold">
														{currency === "INR" ? "₹999" : "$12"}
													</span>
												)}
												<span>{priceLabel(selectedPlan, currency)}</span>
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
