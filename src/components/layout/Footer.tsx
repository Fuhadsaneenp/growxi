import { Link } from "react-router-dom"
import { MessageCircle, Mail, MapPin } from "lucide-react"
import { whatsappLink, SUPPORT_EMAIL } from "@/lib/utils"

const LINKS = {
	Company: [
		{ label: "About Us", href: "/about-us" },
		{ label: "Our Resumes", href: "/our-resumes" },
		{ label: "Contact", href: "/contact" },
	],
	Services: [
		{ label: "GCC / Gulf Resume", href: "/our-resumes" },
		{ label: "Domestic Resume", href: "/our-resumes" },
		{ label: "Europass CV", href: "/our-resumes" },
		{ label: "Book Now", href: "/booking" },
	],
}

export function Footer() {
	return (
		<footer className="relative border-t border-black/[0.06] bg-ink-950 pt-16 pb-8">
			<div className="max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-10">
					<div className="col-span-2 md:col-span-1">
						<Link to="/" className="inline-flex items-center mb-4" aria-label="Growxi home">
							<img
								src="/logo.png"
								alt="Growxi — Your Career Growth Partner"
								className="h-9 w-auto"
							/>
						</Link>
						<p className="text-ink-400 text-sm leading-relaxed">
							Resumes rebuilt by experts. ATS-optimized for the Gulf, India, and Europe.
						</p>
					</div>

					{Object.entries(LINKS).map(([heading, items]) => (
						<div key={heading}>
							<h4 className="text-ink-50 font-semibold mb-4 text-sm">{heading}</h4>
							<ul className="space-y-2">
								{items.map((item) => (
									<li key={item.label}>
										<Link
											to={item.href}
											className="text-ink-400 hover:text-brand-700 text-sm transition-colors"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					<div>
						<h4 className="text-ink-50 font-semibold mb-4 text-sm">Get in touch</h4>
						<ul className="space-y-3">
							<li>
								<a
									href={whatsappLink()}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-ink-400 hover:text-accent-600 text-sm transition-colors"
								>
									<MessageCircle size={15} /> WhatsApp
								</a>
							</li>
							<li>
								<a
									href={"mailto:" + SUPPORT_EMAIL}
									className="flex items-center gap-2 text-ink-400 hover:text-brand-700 text-sm transition-colors"
								>
									<Mail size={15} /> {SUPPORT_EMAIL}
								</a>
							</li>
							<li className="flex items-center gap-2 text-ink-400 text-sm">
								<MapPin size={15} /> India &amp; Gulf
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
					<p className="text-ink-500 text-xs">
						&copy; {new Date().getFullYear()} Growxi. All rights reserved.
					</p>
					<p className="text-ink-500 text-xs">Your Career Growth Partner.</p>
				</div>
			</div>
		</footer>
	)
}
