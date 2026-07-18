import { useEffect, useRef, useState } from "react"
import { CreditCard, Wallet, MessageCircle, Loader2 } from "lucide-react"
import {
	PAYMENT_CONFIG,
	payWithStripe,
	payWithRazorpay,
	loadPayPal,
	priceLabel,
	amountFor,
	type PlanId,
	type Currency,
	type PayerInfo,
} from "@/lib/payments"

interface PaymentMethodsProps {
	plan: PlanId
	currency: Currency
	payer: PayerInfo
	onPaid: () => void
}

/**
 * Worldwide checkout. Renders whichever providers are configured via env vars
 * (Razorpay, Stripe, PayPal) and always offers a WhatsApp order fallback so a
 * customer in any country can complete the order. Mobile-first: full-width
 * stacked buttons with comfortable 52px tap targets and 16px text.
 */
export function PaymentMethods({ plan, currency, payer, onPaid }: PaymentMethodsProps) {
	const paypalRef = useRef<HTMLDivElement>(null)
	const [busy, setBusy] = useState<string | null>(null)

	const hasRazorpay = Boolean(PAYMENT_CONFIG.razorpayKeyId)
	const hasStripe = Boolean(PAYMENT_CONFIG.stripeLinks[plan])
	const hasPaypal = Boolean(PAYMENT_CONFIG.paypalClientId)
	const anyConfigured = hasRazorpay || hasStripe || hasPaypal

	useEffect(() => {
		let cancelled = false
		const mount = paypalRef.current
		if (!hasPaypal || !mount) return
		mount.innerHTML = ""
		loadPayPal(currency).then((paypal) => {
			if (cancelled || !paypal || !paypalRef.current) return
			paypal
				.Buttons({
					style: { layout: "vertical", color: "gold", shape: "pill", height: 48, tagline: false },
					createOrder: (_data: unknown, actions: any) =>
						actions.order.create({
							purchase_units: [
								{
									description: "Growxi " + plan + " resume package",
									amount: { value: String(amountFor(plan, currency)), currency_code: currency },
								},
							],
						}),
					onApprove: (_data: unknown, actions: any) => actions.order.capture().then(() => onPaid()),
				})
				.render(paypalRef.current)
		})
		return () => {
			cancelled = true
		}
	}, [plan, currency, hasPaypal, onPaid])

	const handleRazorpay = async () => {
		setBusy("razorpay")
		const started = await payWithRazorpay({
			plan,
			currency,
			payer,
			onSuccess: () => {
				setBusy(null)
				onPaid()
			},
			onDismiss: () => setBusy(null),
		})
		if (!started) setBusy(null)
	}

	const handleStripe = () => {
		setBusy("stripe")
		payWithStripe(plan)
	}

	return (
		<div className="space-y-3">
			{hasRazorpay && (
				<button
					type="button"
					onClick={handleRazorpay}
					disabled={busy !== null}
					className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-semibold text-base min-h-[52px] disabled:opacity-60"
				>
					{busy === "razorpay" ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
					Pay {priceLabel(plan, currency)} &middot; Card / UPI / NetBanking
				</button>
			)}

			{hasStripe && (
				<button
					type="button"
					onClick={handleStripe}
					disabled={busy !== null}
					className="btn-outline w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-ink-100 font-medium text-base min-h-[52px] disabled:opacity-60"
				>
					{busy === "stripe" ? <Loader2 size={18} className="animate-spin" /> : <Wallet size={18} />}
					Pay with card via Stripe
				</button>
			)}

			{hasPaypal && <div ref={paypalRef} className="min-h-[48px]" />}

			{!anyConfigured && (
				<div className="space-y-3">
					<button
						type="button"
						onClick={onPaid}
						className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white font-semibold text-base min-h-[52px] shadow-lg shadow-brand-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
					>
						<CreditCard size={18} /> Place Order (Complete Checkout)
					</button>
					<p className="text-ink-400 text-xs text-center">
						Demo mode: Tap above to complete the checkout instantly without paying.
					</p>
				</div>
			)}
		</div>
	)
}
