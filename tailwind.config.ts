import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			surface: 'hsl(var(--surface))',
  			'surface-border': 'hsl(var(--surface-border))',
  			indigo: 'hsl(var(--indigo))',
  			'indigo-deep': 'hsl(var(--indigo-deep))',
  			teal: 'hsl(var(--teal))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px) scale(0.97)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0) scale(1)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0) rotate(0deg)'
  				},
  				'33%': {
  					transform: 'translateY(-8px) rotate(0.5deg)'
  				},
  				'66%': {
  					transform: 'translateY(-14px) rotate(-0.5deg)'
  				}
  			},
  			'dash-flow': {
  				'0%': {
  					strokeDashoffset: '20'
  				},
  				'100%': {
  					strokeDashoffset: '0'
  				}
  			},
  			'stagger-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(12px) scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0) scale(1)'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					opacity: '0.4'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			},
  			'glow-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px hsl(263 70% 50.4% / 0.1), 0 0 60px hsl(263 70% 50.4% / 0.05)'
  				},
  				'50%': {
  					boxShadow: '0 0 30px hsl(263 70% 50.4% / 0.2), 0 0 80px hsl(263 70% 50.4% / 0.1)'
  				}
  			},
  			'slide-up-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			float: 'float 8s ease-in-out infinite',
  			'dash-flow': 'dash-flow 1.5s linear infinite',
  			'stagger-in': 'stagger-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
  			'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
  			'slide-up-fade': 'slide-up-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
  		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			serif: [
  				'Lora',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Space Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
