import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '10px',
  			xl: '2rem'
  		},
  		screens: {
  			lg: '1024px',
  			xl: '1200px',
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		screens: {
  			xs: '460px'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			'face-background': 'hsl(var(--face-background))',
  			foreground: 'hsl(var(--foreground))',
  			'face-foreground': 'hsl(var(--face-foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'face-card': {
  				DEFAULT: 'hsl(var(--face-card))',
  				foreground: 'hsl(var(--face-card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'face-popover': {
  				DEFAULT: 'hsl(var(--face-popover))',
  				foreground: 'hsl(var(--face-popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'face-primary': {
  				DEFAULT: 'hsl(var(--face-primary))',
  				foreground: 'hsl(var(--face-primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'face-secondary': {
  				DEFAULT: 'hsl(var(--face-secondary))',
  				foreground: 'hsl(var(--face-secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'face-muted': {
  				DEFAULT: 'hsl(var(--face-muted))',
  				foreground: 'hsl(var(--face-muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			active: {
  				DEFAULT: 'hsl(var(--active))',
  				foreground: 'hsl(var(--active-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	fontFamily: {
  		inter: ['var(--font-inter)'],
  		comfortaa: ['var(--font-comfortaa)']
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
