import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// shadcn contract — values derived from the app palette in src/index.css
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},

				// App palette — semantic names (authoritative --gsg-* tokens)
				brand: {
					DEFAULT: "var(--gsg-primary)",
					dark: "var(--gsg-primary-dark)",
					light: "var(--gsg-primary-light)",
				},
				surface: {
					DEFAULT: "var(--gsg-surface)",
					alt: "var(--gsg-surface-alt)",
					chat: "var(--gsg-chat-background)",
				},
				ink: {
					high: "var(--gsg-text-high)",
					mid: "var(--gsg-text-mid)",
					low: "var(--gsg-text-low)",
				},
				hairline: {
					DEFAULT: "var(--gsg-border)",
					divider: "var(--gsg-divider)",
				},
				bubble: {
					received: "var(--gsg-received-bubble)",
				},
				status: {
					error: "var(--gsg-error)",
					success: "var(--gsg-success)",
					warning: "var(--gsg-warning)",
				},
			},
			fontSize: {
				display: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
				h1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
				h2: ["clamp(1.625rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
				h3: ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.015em" }],
				"body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0" }],
				body: ["1rem", { lineHeight: "1.65", letterSpacing: "0" }],
				"body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0" }],
				caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
			},
			spacing: {
				section: "5rem",
				"section-lg": "7.5rem",
				gutter: "1.5rem",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xl: "calc(var(--radius) * 1.5)",
				pill: "9999px",
			},
			boxShadow: {
				"2xs": "var(--shadow-2xs)",
				xs: "var(--shadow-xs)",
				sm: "var(--shadow-sm)",
				md: "var(--shadow-md)",
				lg: "var(--shadow-lg)",
				xl: "var(--shadow-xl)",
				"2xl": "var(--shadow-2xl)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(30px) scale(0.97)" },
					"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
			},
			fontFamily: {
				sans: [
					"Inter",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"sans-serif",
				],
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
