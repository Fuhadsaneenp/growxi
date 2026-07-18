import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/utils"

const accentBg = { background: "linear-gradient(135deg, #25D366, #10B981)" }

export function WhatsAppButton() {
	return (
		<motion.a
			href={whatsappLink()}
			target="_blank"
			rel="noopener noreferrer"
			initial={ { scale: 0, opacity: 0 } }
			animate={ { scale: 1, opacity: 1 } }
			transition={ { delay: 1, type: "spring", stiffness: 260, damping: 18 } }
			whileHover={ { scale: 1.1 } }
			whileTap={ { scale: 0.92 } }
			className="fixed right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-glow-accent safe-bottom"
			style={accentBg}
			aria-label="Chat on WhatsApp"
		>
			<motion.span
				aria-hidden
				animate={ { scale: [1, 1.6], opacity: [0.5, 0] } }
				transition={ { duration: 2, repeat: Infinity, ease: "easeOut" } }
				className="absolute inset-0 rounded-full"
				style={accentBg}
			/>
			<MessageCircle size={26} className="text-white relative z-10" fill="white" />
		</motion.a>
	)
}
