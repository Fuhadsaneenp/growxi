import { clsx, type ClassValue } from "clsx"

/** Merge class names. */
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs)
}

export const WA_NUMBER = (import.meta.env.VITE_WA_NUMBER || "919961980960").replace(
	/[^0-9]/g,
	"",
)
export const SUPPORT_EMAIL = "info@growxi.com"
export const WA_DISPLAY = "+91 99619 80960"

/** WhatsApp deep-link builder. */
export function whatsappLink(
	message = "Hi Growxi! I want to build my resume. Can you help me get started?",
) {
	return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message)
}
