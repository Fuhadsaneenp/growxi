// Global payment gateway configuration for Growxi.
// Supports Stripe (hosted Payment Links), PayPal (JS SDK Buttons) and Razorpay
// (Checkout). All providers are config-driven via Vite env vars so the static
// site can be deployed anywhere. Where a provider is not configured, the UI
// gracefully falls back to placing the order over WhatsApp.

export type PlanId = "standard" | "premium" | "executive"
export type Provider = "stripe" | "paypal" | "razorpay"
export type Currency = "INR" | "USD"

export interface PlanPricing {
	id: PlanId
	name: string
	inr: number
	usd: number
	labelINR: string
	labelUSD: string
}

export const PLAN_PRICING: Record<PlanId, PlanPricing> = {
	standard: { id: "standard", name: "Standard", inr: 999, usd: 12, labelINR: "\u20B9999", labelUSD: "$12" },
	premium: { id: "premium", name: "Premium", inr: 1499, usd: 18, labelINR: "\u20B91,499", labelUSD: "$18" },
	executive: { id: "executive", name: "Executive", inr: 2499, usd: 30, labelINR: "\u20B92,499", labelUSD: "$30" },
}

const env = import.meta.env

export const PAYMENT_CONFIG = {
	stripeLinks: {
		standard: env.VITE_STRIPE_LINK_STANDARD || "",
		premium: env.VITE_STRIPE_LINK_PREMIUM || "",
		executive: env.VITE_STRIPE_LINK_EXECUTIVE || "",
	} as Record<PlanId, string>,
	paypalClientId: (env.VITE_PAYPAL_CLIENT_ID as string) || "",
	razorpayKeyId: (env.VITE_RAZORPAY_KEY_ID as string) || "",
	defaultCurrency: ((env.VITE_DEFAULT_CURRENCY as string) || "INR") as Currency,
}

export function amountFor(plan: PlanId, currency: Currency): number {
	const p = PLAN_PRICING[plan]
	return currency === "INR" ? p.inr : p.usd
}

export function priceLabel(plan: PlanId, currency: Currency): string {
	const p = PLAN_PRICING[plan]
	return currency === "INR" ? p.labelINR : p.labelUSD
}

/** Dynamically inject a third-party script once. Resolves false on failure. */
export function loadScript(src: string, id?: string): Promise<boolean> {
	return new Promise((resolve) => {
		if (typeof document === "undefined") {
			resolve(false)
			return
		}
		if (id && document.getElementById(id)) {
			resolve(true)
			return
		}
		const s = document.createElement("script")
		s.src = src
		if (id) s.id = id
		s.async = true
		s.onload = () => resolve(true)
		s.onerror = () => resolve(false)
		document.body.appendChild(s)
	})
}

export interface PayerInfo {
	name?: string
	email?: string
	phone?: string
}

/** Stripe: redirect to a hosted Payment Link configured per plan. */
export function payWithStripe(plan: PlanId): boolean {
	const link = PAYMENT_CONFIG.stripeLinks[plan]
	if (!link) return false
	window.location.href = link
	return true
}

/** Razorpay: open Checkout for the given plan/currency. */
export async function payWithRazorpay(args: {
	plan: PlanId
	currency: Currency
	payer: PayerInfo
	onSuccess: () => void
	onDismiss?: () => void
}): Promise<boolean> {
	const { plan, currency, payer, onSuccess, onDismiss } = args
	if (!PAYMENT_CONFIG.razorpayKeyId) return false
	const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js", "razorpay-sdk")
	if (!ok) return false
	const Razorpay = (window as any).Razorpay
	if (!Razorpay) return false
	const options = {
		key: PAYMENT_CONFIG.razorpayKeyId,
		amount: amountFor(plan, currency) * 100,
		currency,
		name: "Growxi",
		description: PLAN_PRICING[plan].name + " Resume Package",
		image: "/favicon.png",
		prefill: { name: payer.name || "", email: payer.email || "", contact: payer.phone || "" },
		theme: { color: "#7A2E9D" },
		handler: () => onSuccess(),
		modal: { ondismiss: () => onDismiss && onDismiss() },
	}
	const rzp = new Razorpay(options)
	rzp.open()
	return true
}

/** PayPal: load the JS SDK for the chosen currency. */
export async function loadPayPal(currency: Currency): Promise<any | null> {
	if (!PAYMENT_CONFIG.paypalClientId) return null
	const src =
		"https://www.paypal.com/sdk/js?client-id=" +
		encodeURIComponent(PAYMENT_CONFIG.paypalClientId) +
		"&currency=" +
		currency +
		"&components=buttons"
	const ok = await loadScript(src, "paypal-sdk-" + currency)
	if (!ok) return null
	return (window as any).paypal || null
}
