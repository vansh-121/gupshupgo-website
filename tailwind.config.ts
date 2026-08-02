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
					// `mid` is DeviceMockup-only: it measures 4.29:1 on layer-1.
					// Body copy on a surface band uses `ink-secondary` instead.
					mid: "var(--gsg-text-mid)",
					low: "var(--gsg-text-low)",
					// Named `ink-secondary` rather than `secondary` because
					// `text-secondary` is already taken by the shadcn colour group.
					secondary: "var(--text-secondary)",
					accent: "var(--text-accent)",
				},
				hairline: {
					DEFAULT: "var(--gsg-border)",
					divider: "var(--gsg-divider)",
					// Alpha steps (Req 4.1). Consumed through the `shadow-hairline-*`
					// utilities below; exposed as colours for ring/outline use only.
					"08": "var(--hairline-08)",
					12: "var(--hairline-12)",
					24: "var(--hairline-24)",
					56: "var(--hairline-56)",
					76: "var(--hairline-76)",
				},
				bubble: {
					received: "var(--gsg-received-bubble)",
				},
				status: {
					error: "var(--gsg-error)",
					success: "var(--gsg-success)",
					warning: "var(--gsg-warning)",
				},

				// Surface bands (Req 3.1). layer-0 is the base page background;
				// ascending index = more raised in BOTH themes.
				layer: {
					0: "var(--layer-0)",
					1: "var(--layer-1)",
					2: "var(--layer-2)",
					3: "var(--layer-3)",
					tint: "var(--layer-tint)",
				},

				// Semantic pill palette (Req 11): bg-pill-soft / text-pill-soft-fg.
				pill: {
					soft: "var(--pill-soft-bg)",
					"soft-fg": "var(--pill-soft-fg)",
					mid: "var(--pill-mid-bg)",
					"mid-fg": "var(--pill-mid-fg)",
					strong: "var(--pill-strong-bg)",
					"strong-fg": "var(--pill-strong-fg)",
				},
			},
			// Explicit breakpoints (Req 7.8). Declared under `extend` so Tailwind's
			// own sm/md/lg/xl/2xl stay intact for the sections that still use them.
			//
			// `bp480` and `bp1024` are the responsive tiers added so every layout
			// has a mobile → tablet → desktop step instead of jumping straight from
			// phone to desktop at bp810:
			//   bp480  — small phones (stacked mockups, reduced display type)
			//   bp810  — Breakpoint_Small (two-column sections, 48px headings)
			//   bp1024 — tablet-to-desktop nav switch (flat pill vs disclosure)
			//   bp1200 — wide desktop (12-col feature grid, fanned two-phone rows)
			screens: {
				bp480: "480px",
				bp810: "810px",
				bp1024: "1024px",
				bp1200: "1200px",
			},

			fontSize: {
				// ---- Type_Scale, 19 steps, one named utility per step (Req 6.1) ----
				// `text-8` … `text-68`, values in CSS pixels.
				8: "8px",
				9: "9px",
				10: "10px",
				11: "11px",
				12: "12px",
				13: "13px",
				14: "14px",
				16: "16px",
				19: "19px",
				21: "21px",
				23: "23px",
				24: "24px",
				25: "25px",
				33: "33px",
				39: "39px",
				42: "42px",
				48: "48px",
				57: "57px",
				68: "68px",

				// ---- Heading composites (Req 6.3–6.7, 6.11) ----
				// `-sm` is the below-Breakpoint_Small variant; sections pair them as
				// `text-h1-sm bp810:text-h1`.
				//
				// `-xs` is the small-phone variant, paired as
				// `text-h1-xs bp480:text-h1-sm bp810:text-h1`. It exists because the
				// `-sm` step is still display-scale type: 57px on a 320–360px screen
				// breaks the hero heading into six or seven lines and pushes the CTA
				// off the first screen. Each `-xs` step is one Type_Scale step below
				// its `-sm` sibling and keeps that sibling's line-height and
				// letter-spacing, so the ramp stays one continuous typographic system.
				h1: ["68px", { lineHeight: "1", letterSpacing: "-0.04em" }],
				"h1-sm": ["57px", { lineHeight: "1", letterSpacing: "-0.04em" }],
				"h1-xs": ["42px", { lineHeight: "1", letterSpacing: "-0.04em" }],
				h2: ["48px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
				"h2-sm": ["39px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
				"h2-xs": ["33px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],

				h3: ["39px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
				lead: ["23px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],

				// The pre-Nova keys `display`, `body-lg`, `body`, `body-sm` and
				// `caption` are gone: their 1.5–1.7 line-heights sit outside the
				// permitted set (Req 6.10) and nothing in src/ references them any
				// more. Use the ramp above — `text-16 leading-140` for body copy,
				// `text-14 leading-140`, `text-12 leading-130`, `text-lead` for a
				// section lead, `text-h1-sm bp810:text-h1` for the display step.
			},
			// Permitted line-heights (Req 6.10) as named utilities: `leading-100` …
			// `leading-140`. Tailwind's defaults are left in place so existing
			// `leading-*` usages keep compiling until their section migrates.
			// Standard_Transition easing as a named token (Req 14.5). Named rather
			// than written as `ease-[cubic-bezier(...)]`, which Tailwind reports as
			// an ambiguous arbitrary value.
			transitionTimingFunction: {
				standard: "cubic-bezier(0.44, 0, 0.56, 1)",
			},
			lineHeight: {
				100: "1",
				110: "1.1",
				120: "1.2",
				130: "1.3",
				140: "1.4",
			},
			spacing: {
				// ---- Gap_Scale, 21 steps (Req 7.7) ----
				// Keys carry an explicit `px` suffix so they cannot collide with
				// Tailwind's own numeric spacing scale, where `2` means 0.5rem.
				// Usage: `py-128px`, `px-36px`, `gap-20px`.
				"2px": "2px",
				"4px": "4px",
				"6px": "6px",
				"8px": "8px",
				"10px": "10px",
				"12px": "12px",
				"16px": "16px",
				"20px": "20px",
				"24px": "24px",
				"28px": "28px",
				"32px": "32px",
				"36px": "36px",
				"40px": "40px",
				"44px": "44px",
				"48px": "48px",
				"60px": "60px",
				"64px": "64px",
				"80px": "80px",
				"112px": "112px",
				"128px": "128px",
				"164px": "164px",

				// ---- Aliases keeping the shipped sections working ----
				// Each now points at a step of the ramp above. `section-lg` moves
				// 120px → 128px, the nearest step; the other two are unchanged.
				// Later slices replace `py-section` with `py-64px bp810:py-128px`
				// and `px-gutter` with `px-20px bp810:px-36px`.
				section: "80px",
				"section-lg": "128px",
				gutter: "24px",
			},
			borderRadius: {
				// The two permitted radii (Req 7.9)
				8: "8px",
				pill: "80px",
				// Retained so the shipped sections keep compiling.
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xl: "calc(var(--radius) * 1.5)",
			},
			boxShadow: {
				// ---- The two outer elevations (Req 5.1, 5.3, 5.4) ----
				elevation: "var(--elevation)",
				mockup: "var(--elevation-mockup)",

				// ---- Hairline boundaries (Req 4.2, 4.3): an inset shadow, never a
				// `border`. `-elevated` composes the inset hairline and the outer
				// elevation in ONE box-shadow declaration (Req 4.5), which is why
				// these are boxShadow keys rather than `ring` utilities — Tailwind's
				// ring utilities cannot express inset + outer in one declaration.
				// Use `hairline-56` where the boundary is a control's sole
				// affordance; it is the lightest step that clears 3:1 (Req 4.4). ----
				hairline: "inset 0 0 0 1px var(--hairline-12)",
				"hairline-08": "inset 0 0 0 1px var(--hairline-08)",
				"hairline-12": "inset 0 0 0 1px var(--hairline-12)",
				"hairline-24": "inset 0 0 0 1px var(--hairline-24)",
				"hairline-56": "inset 0 0 0 1px var(--hairline-56)",
				"hairline-76": "inset 0 0 0 1px var(--hairline-76)",
				"hairline-elevated": "inset 0 0 0 1px var(--hairline-12), var(--elevation)",
				"hairline-08-elevated": "inset 0 0 0 1px var(--hairline-08), var(--elevation)",
				"hairline-12-elevated": "inset 0 0 0 1px var(--hairline-12), var(--elevation)",
				"hairline-24-elevated": "inset 0 0 0 1px var(--hairline-24), var(--elevation)",
				"hairline-56-elevated": "inset 0 0 0 1px var(--hairline-56), var(--elevation)",
				"hairline-76-elevated": "inset 0 0 0 1px var(--hairline-76), var(--elevation)",

				// ---- Retained so the shipped sections keep compiling. Later slices
				// collapse every one of these onto `elevation` / `mockup`. ----
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
				// Display_Typeface first, Inter second, system fallbacks after
				// (Req 2.1, 2.8). Mirrors --font-sans in src/index.css.
				sans: [
					"Geist",
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
