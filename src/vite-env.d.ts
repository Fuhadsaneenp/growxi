/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ANTHROPIC_API_KEY?: string
	readonly VITE_WA_NUMBER?: string
	readonly VITE_GA_ID?: string
	readonly VITE_DEFAULT_CURRENCY?: string
	readonly VITE_STRIPE_LINK_STANDARD?: string
	readonly VITE_STRIPE_LINK_PREMIUM?: string
	readonly VITE_STRIPE_LINK_EXECUTIVE?: string
	readonly VITE_PAYPAL_CLIENT_ID?: string
	readonly VITE_RAZORPAY_KEY_ID?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
