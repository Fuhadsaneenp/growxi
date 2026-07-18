import { create } from "zustand"

export type ResumeFormat = "gcc" | "domestic" | "europass"
export type PlanId = "standard" | "premium" | "executive"

interface BookingState {
	selectedPlan: PlanId | null
	selectedFormat: ResumeFormat | null
	setPlan: (plan: PlanId) => void
	setFormat: (format: ResumeFormat) => void
	reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
	selectedPlan: null,
	selectedFormat: null,
	setPlan: (plan) => set({ selectedPlan: plan }),
	setFormat: (format) => set({ selectedFormat: format }),
	reset: () => set({ selectedPlan: null, selectedFormat: null }),
}))
