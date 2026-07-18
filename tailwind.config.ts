import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Primary brand — GrowXi purple
				brand: {
					50: "#F7EEFC",
					100: "#ECD9F6",
					200: "#D9B6EC",
					300: "#8A39B0",
					400: "#9B4FC0",
					500: "#7A2E9D", // PRIMARY
					600: "#67268A",
					700: "#531F6C",
					800: "#3E1751",
					900: "#2A0F38",
					950: "#1A0824",
				},
				// Accent — GrowXi coral
				accent: {
					300: "#FBB89E",
					400: "#EF7C50",
					500: "#F26A41", // ACCENT
					600: "#E0532A",
					700: "#BC4320",
				},
				// Gold — premium tier
				gold: {
					300: "#FCD34D",
					400: "#FBBF24",
					500: "#F59E0B",
					600: "#D97706",
				},
				// Neutrals — warm light canvas (50 = darkest text, 950 = cream bg)
				ink: {
					50: "#251A1F",
					100: "#312329",
					200: "#43323A",
					300: "#5E4E55",
					400: "#857580",
					500: "#A89AA0",
					600: "#C6BAC0",
					700: "#DED4D8",
					800: "#EFE7E3",
					900: "#FCF7F2",
					950: "#FAF4EC",
				},
			},
			fontFamily: {
				display: ["'Plus Jakarta Sans'", "sans-serif"],
				body: ["'Inter'", "sans-serif"],
				mono: ["'JetBrains Mono'", "monospace"],
			},
			fontSize: {
				"2xs": ["0.625rem", "0.875rem"],
				// Fluid display sizes: scale smoothly from phone -> desktop via clamp()
				"display-2xl": ["clamp(2.5rem, 8.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
				"display-xl": ["clamp(2.25rem, 7vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
				"display-lg": ["clamp(1.875rem, 6vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
				"display-md": ["clamp(1.625rem, 5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
				"display-sm": ["clamp(1.375rem, 4.2vw, 1.875rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
			},
			animation: {
				"fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
				"fade-in": "fadeIn 0.5s ease forwards",
				"slide-right": "slideRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
				"scale-in": "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
				shimmer: "shimmer 2s linear infinite",
				"pulse-glow": "pulseGlow 2s ease-in-out infinite",
				float: "float 6s ease-in-out infinite",
				ticker: "ticker 20s linear infinite",
				"gradient-x": "gradientX 4s ease infinite",
				"spin-slow": "spin 8s linear infinite",
				"bounce-soft": "bounceSoft 2s ease-in-out infinite",
				typewriter: "typewriter 3.5s steps(40) forwards",
				"cursor-blink": "cursorBlink 0.8s step-end infinite",
			},
			keyframes: {
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
				slideRight: {
					"0%": { opacity: "0", transform: "translateX(-30px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.8)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "200% center" },
					"100%": { backgroundPosition: "-200% center" },
				},
				pulseGlow: {
					"0%,100%": { boxShadow: "0 0 20px rgba(122,46,157,0.3)" },
					"50%": { boxShadow: "0 0 50px rgba(122,46,157,0.7)" },
				},
				float: {
					"0%,100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-12px)" },
				},
				ticker: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				gradientX: {
					"0%,100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				bounceSoft: {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-6px)" },
				},
				typewriter: { from: { width: "0" }, to: { width: "100%" } },
				cursorBlink: {
					"0%,100%": { borderColor: "transparent" },
					"50%": { borderColor: "currentColor" },
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"mesh-brand":
					"radial-gradient(at 40% 20%, hsla(280,55%,45%,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(18,88%,60%,0.10) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,60%,70%,0.08) 0px, transparent 50%)",
				"grid-lines":
					"linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
				"shimmer-brand":
					"linear-gradient(105deg, transparent 40%, rgba(242,106,65,0.25) 50%, transparent 60%)",
			},
			backgroundSize: {
				"200%": "200% 200%",
				grid: "40px 40px",
			},
			boxShadow: {
				"brand-sm": "0 2px 8px rgba(122,46,157,0.15), 0 1px 3px rgba(122,46,157,0.1)",
				"brand-md": "0 8px 24px rgba(122,46,157,0.2), 0 2px 8px rgba(122,46,157,0.12)",
				"brand-lg": "0 16px 48px rgba(122,46,157,0.22), 0 4px 16px rgba(122,46,157,0.14)",
				"brand-xl": "0 32px 80px rgba(122,46,157,0.25), 0 8px 32px rgba(122,46,157,0.16)",
				"glow-accent": "0 0 30px rgba(242,106,65,0.4)",
				"glow-gold": "0 0 30px rgba(245,158,11,0.4)",
				"card-dark":
					"0 10px 30px rgba(122,46,157,0.08), 0 2px 8px rgba(0,0,0,0.05)",
				glass: "0 8px 32px rgba(122,46,157,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
			},
			backdropBlur: {
				xs: "2px",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
			transitionTimingFunction: {
				spring: "cubic-bezier(0.34,1.56,0.64,1)",
				smooth: "cubic-bezier(0.16,1,0.3,1)",
				bounce: "cubic-bezier(0.68,-0.55,0.27,1.55)",
			},
		},
	},
	plugins: [typography],
}

export default config
