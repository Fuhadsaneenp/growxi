# GrowXi.com — Premium Resume Consulting

A world-class, production-grade marketing site for **GrowXi**, a premium resume consulting service. Experts rebuild your resume from scratch — ATS-optimized, keyword-rich, and recruiter-ready — for professionals across India and the Gulf, delivered in 24–48 hours.

Built with **Vite + React + TypeScript**, animated with **Framer Motion + GSAP + Three.js + React Bits**, and styled with a custom **Tailwind CSS** design system.

---

## ✨ Features

- **Floating glass navbar** with scroll-aware blur, magnetic links, and a scroll-progress bar
- **Hero** with GSAP character-split headline, Three.js particle field, typewriter subheadline, and parallax orbs
- **Animated stats** (CountUp on scroll), **scroll-drawn process timeline**, and **parallax-tilt service cards**
- **Infinite testimonial rail** (GSAP, pauses on hover) and **country ticker belt**
- **Pricing** (Standard / Premium / Executive) wired to a Zustand store
- **Multi-step order form** with React Hook Form + Zod validation, confetti confirmation, and WhatsApp redirect
- **Worldwide checkout** — Stripe, PayPal & Razorpay (Cards / UPI / NetBanking), with INR/USD toggle and a WhatsApp order fallback
- **Free ATS score check** via a prefilled WhatsApp flow
- **React Bits-style scroll storytelling** (split/blur/gradient text, spotlight cards, magnetic buttons, aurora backdrops)
- **WhatsApp floating button**, custom cursor glow, page transitions, and full SEO via `react-helmet-async`
- Reduced-motion guards and keyboard-accessible, semantic markup throughout

## 🧱 Tech Stack

React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP (ScrollTrigger), Three.js / React Three Fiber, Lenis, React Router, React Hook Form, Zod, TanStack Query, Zustand, React Hot Toast, React Confetti, react-parallax-tilt, typewriter-effect, lucide-react.

---

## 🚀 Getting Started

> Requires **Node 18+** and npm. Dependencies are **not** bundled in this archive — install them first.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# then edit .env with your values (see below)

# 3. Start the dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_WA_NUMBER` | yes | WhatsApp number in international digits, e.g. `919961980960` |
| `VITE_GA_ID` | optional | Google Analytics 4 measurement ID |
| `VITE_DEFAULT_CURRENCY` | optional | Default checkout currency: `INR` or `USD` |
| `VITE_STRIPE_LINK_STANDARD` / `_PREMIUM` / `_EXECUTIVE` | optional | Stripe Payment Link per plan |
| `VITE_PAYPAL_CLIENT_ID` | optional | PayPal client ID (renders PayPal Buttons) |
| `VITE_RAZORPAY_KEY_ID` | optional | Razorpay public key id (Cards, UPI, NetBanking) |

Each payment provider is optional and independent — configure any combination. Unconfigured providers are hidden on checkout, and a WhatsApp order fallback is always available so customers in any country can order.

### ⚠️ Important: client-side payment keys

Any `VITE_`-prefixed variable is **embedded in the client bundle and publicly visible**. Only use values that are safe for the browser: Stripe Payment Links, the PayPal **client ID**, and the Razorpay **public key id**. Never expose secret keys (Stripe secret key, Razorpay key secret) in the frontend — those belong on a server. For verified, captured payments in production, process orders through your provider's server-side webhooks.

For production, route the request through a small server-side proxy (e.g. a Vercel/Netlify serverless function or Cloudflare Worker) that holds the key server-side and forwards requests to `https://api.anthropic.com`. Then point the widget at your proxy endpoint instead. Leaving the key blank keeps the safe mock behavior.

---

## 📁 Project Structure

```
src/
├── app/            # App router, providers (Lenis/Query/Toast/GSAP), Zustand store
├── components/
│   ├── layout/     # Navbar, Footer, PageWrapper, ScrollToTop
│   ├── reactbits/  # GradientText, SplitText, BlurText, ShinyText, AnimatedContent, SpotlightCard, Magnet, Aurora
│   ├── ui/         # Button, Card, TypewriterText, ParticleField, CursorGlow, PaymentMethods, ATSScoreSection, ...
│   └── sections/   # Hero, Stats, HowItWorks, Services, About, Testimonials, Pricing, FAQ, CTA, GlobalBelt
├── pages/          # Home, OurResumes, AboutUs, Contact, Booking, NotFound
├── hooks/          # useScrollProgress, useMagneticEffect, useParallax, useInView, useCountUp
├── lib/            # utils, animations (Framer variants), gsap helpers
└── styles/         # globals.css (Tailwind layers + design tokens)
```

## 🌍 Deployment

The build output is a static SPA in `dist/`. Deploy to any static host. Configure SPA fallback (rewrite all routes to `/index.html`) so client-side routing works.

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# Cloudflare Pages
wrangler pages deploy dist
```

## 📞 Contact

- WhatsApp: **+91 99619 80960**
- Email: **info@growxi.com**

---

_Built ground-up for GrowXi — expert-led, ATS-optimized resumes, delivered worldwide._
