import { Suspense, lazy } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { CursorGlow } from "@/components/ui/CursorGlow"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { SEO } from "@/components/SEO"

const Home = lazy(() => import("@/pages/Home"))
const OurResumes = lazy(() => import("@/pages/OurResumes"))
const AboutUs = lazy(() => import("@/pages/AboutUs"))
const Contact = lazy(() => import("@/pages/Contact"))
const Booking = lazy(() => import("@/pages/Booking"))
const NotFound = lazy(() => import("@/pages/NotFound"))

const STRUCTURED_DATA = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "GrowXi",
	description: "Expert resume building and ATS optimization service",
	telephone: "+919961980960",
	email: "info@growxi.com",
	areaServed: ["IN", "AE", "SA", "QA", "KW"],
	priceRange: "\u20B9999\u2013\u20B92499",
}

function PageFallback() {
	return (
		<div className="min-h-[60svh] flex items-center justify-center">
			<div className="w-8 h-8 rounded-full border-2 border-brand-500/30 border-t-brand-400 animate-spin" />
		</div>
	)
}

export default function App() {
	const location = useLocation()

	return (
		<>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>
			</Helmet>
			<CursorGlow />
			<Navbar />
			<ScrollToTop />
			<main>
				<Suspense fallback={<PageFallback />}>
					<AnimatePresence mode="wait">
						<PageWrapper key={location.pathname}>
							<Routes location={location}>
								<Route
									path="/"
									element={
										<>
											<SEO
												title="GrowXi — Resumes That Get You Hired | Expert ATS-Ready Rewrites"
												description="GrowXi rebuilds your resume from scratch — ATS-optimized, keyword-rich, recruiter-ready. Expert-built for GCC, Domestic & Europass formats. Pay securely via Stripe, PayPal or Razorpay."
												path="/"
											/>
											<Home />
										</>
									}
								/>
								<Route
									path="/our-resumes"
									element={
										<>
											<SEO
												title="Our Resumes — GCC, Domestic & Europass Samples | GrowXi"
												description="Explore ATS-optimized resume formats engineered for the Gulf, India, and Europe. Plus a free ATS score check on WhatsApp."
												path="/our-resumes"
											/>
											<OurResumes />
										</>
									}
								/>
								<Route
									path="/about-us"
									element={
										<>
											<SEO
												title="About GrowXi — The Team That Makes You Hireable"
												description="WhatsApp-first, expert-led, outcome-obsessed. Learn how GrowXi rebuilds resumes for professionals across India and the Gulf."
												path="/about-us"
											/>
											<AboutUs />
										</>
									}
								/>
								<Route
									path="/contact"
									element={
										<>
											<SEO
												title="Contact GrowXi — WhatsApp-First Support"
												description="Reach the GrowXi team on WhatsApp or email. Zero-delay support for resume building and orders."
												path="/contact"
											/>
											<Contact />
										</>
									}
								/>
								<Route
									path="/booking"
									element={
										<>
											<SEO
												title="Build Your Resume | GrowXi"
												description="Order your expert-built, ATS-ready resume. Pay securely via Stripe, PayPal, or Razorpay. Confirmed on WhatsApp within minutes."
												path="/booking"
											/>
											<Booking />
										</>
									}
								/>
								<Route path="*" element={<NotFound />} />
							</Routes>
						</PageWrapper>
					</AnimatePresence>
				</Suspense>
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	)
}
