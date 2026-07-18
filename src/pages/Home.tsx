import { HeroSection } from "@/components/sections/HeroSection"
import { GlobalBeltSection } from "@/components/sections/GlobalBeltSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { ATSScoreSection } from "@/components/ui/ATSScoreSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { CTASection } from "@/components/sections/CTASection"

export default function Home() {
	return (
		<>
			<HeroSection />
			<GlobalBeltSection />
			<StatsSection />
			<HowItWorksSection />
			<ServicesSection />
			<AboutSection />
			<TestimonialsSection />
			<ATSScoreSection />
			<PricingSection />
			<FAQSection />
			<CTASection />
		</>
	)
}
