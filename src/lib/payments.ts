// Global payment gateway configuration for Growxi.
// Supports Stripe (hosted Payment Links), PayPal (JS SDK Buttons) and Razorpay
// (Checkout). All providers are config-driven via Vite env vars so the static
// site can be deployed anywhere. Where a provider is not configured, the UI
// gracefully falls back to placing the order over WhatsApp.

export type PlanId = "standard" | "premium" | "executive"
export type Provider = "stripe" | "paypal" | "razorpay"
export type Currency = "INR" | "USD" | "AED" | "EUR" | "SAR" | "KWD" | "EGP" | "GBP" | "QAR" | "OMR" | "BHD"

export interface PlanPricing {
	id: PlanId
	name: string
	prices: Record<Currency, number>
	labels: Record<Currency, string>
}

export const PLAN_PRICING: Record<PlanId, PlanPricing> = {
	standard: {
		id: "standard",
		name: "Standard",
		prices: {
			INR: 999,
			USD: 12,
			AED: 45,
			EUR: 11,
			SAR: 45,
			KWD: 4,
			EGP: 599,
			GBP: 10,
			QAR: 45,
			OMR: 5,
			BHD: 5,
		},
		labels: {
			INR: "₹999",
			USD: "$12",
			AED: "45 AED",
			EUR: "€11",
			SAR: "45 SAR",
			KWD: "4 KWD",
			EGP: "599 EGP",
			GBP: "£10",
			QAR: "45 QAR",
			OMR: "5 OMR",
			BHD: "5 BHD",
		},
	},
	premium: {
		id: "premium",
		name: "Premium",
		prices: {
			INR: 1499,
			USD: 18,
			AED: 65,
			EUR: 17,
			SAR: 70,
			KWD: 6,
			EGP: 899,
			GBP: 15,
			QAR: 65,
			OMR: 7,
			BHD: 7,
		},
		labels: {
			INR: "₹1,499",
			USD: "$18",
			AED: "65 AED",
			EUR: "€17",
			SAR: "70 SAR",
			KWD: "6 KWD",
			EGP: "899 EGP",
			GBP: "£15",
			QAR: "65 QAR",
			OMR: "7 OMR",
			BHD: "7 BHD",
		},
	},
	executive: {
		id: "executive",
		name: "Executive",
		prices: {
			INR: 2499,
			USD: 30,
			AED: 110,
			EUR: 28,
			SAR: 110,
			KWD: 10,
			EGP: 1499,
			GBP: 25,
			QAR: 110,
			OMR: 12,
			BHD: 12,
		},
		labels: {
			INR: "₹2,499",
			USD: "$30",
			AED: "110 AED",
			EUR: "€28",
			SAR: "110 SAR",
			KWD: "10 KWD",
			EGP: "1,499 EGP",
			GBP: "£25",
			QAR: "110 QAR",
			OMR: "12 OMR",
			BHD: "12 BHD",
		},
	},
}

export const CURRENCY_DECIMALS: Record<Currency, number> = {
	INR: 2,
	USD: 2,
	AED: 2,
	EUR: 2,
	SAR: 2,
	KWD: 3,
	EGP: 2,
	GBP: 2,
	QAR: 2,
	OMR: 3,
	BHD: 3,
}

const env = import.meta.env

export const PAYMENT_CONFIG = {
	stripeLinks: {
		standard: env.VITE_STRIPE_LINK_STANDARD || "",
		premium: env.VITE_STRIPE_LINK_PREMIUM || "",
		executive: env.VITE_STRIPE_LINK_EXECUTIVE || "",
	} as Record<PlanId, string>,
	paypalClientId: (env.VITE_PAYPAL_CLIENT_ID as string) || "",
	razorpayKeyId: "", // (env.VITE_RAZORPAY_KEY_ID as string) || "rzp_live_TF01YPXMyo6FDR",
	defaultCurrency: ((env.VITE_DEFAULT_CURRENCY as string) || "INR") as Currency,
}

let isDiscountActive = false

export function setDiscountActive(active: boolean) {
	isDiscountActive = active
}

export function getDiscountActive() {
	return isDiscountActive
}

export function amountFor(plan: PlanId, currency: Currency): number {
	const baseAmount = PLAN_PRICING[plan].prices[currency] || PLAN_PRICING[plan].prices.INR
	if (plan === "standard" && isDiscountActive) {
		if (currency === "INR") return baseAmount - 900 // 99
		// Apply ~90% discount (divide by 10) and round to reasonable decimals
		const rounded = Math.round((baseAmount / 10) * 10) / 10
		return rounded > 0 ? rounded : 1
	}
	return baseAmount
}

export function priceLabel(plan: PlanId, currency: Currency): string {
	if (plan === "standard" && isDiscountActive) {
		const discountedAmount = amountFor(plan, currency)
		if (currency === "INR") return "₹" + discountedAmount
		if (currency === "USD") return "$" + discountedAmount
		if (currency === "EUR") return "€" + discountedAmount
		if (currency === "GBP") return "£" + discountedAmount
		return discountedAmount + " " + currency
	}
	return PLAN_PRICING[plan].labels[currency] || PLAN_PRICING[plan].labels.INR
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
		amount: amountFor(plan, currency) * Math.pow(10, CURRENCY_DECIMALS[currency] || 2),
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
