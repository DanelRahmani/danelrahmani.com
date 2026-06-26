const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{tsx,jsx,ts,js}'],
  plugins: [require('@tailwindcss/typography')],
  variants: {
    typography: ['dark'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.5rem' }],
        sm: ['0.875rem', { lineHeight: '1.5rem' }],
        base: ['1rem', { lineHeight: '1.75rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        // Light mode tokens
        primary: '#4A0E0E',
        'primary-light': '#6B1515',
        'primary-dark': '#2D0808',
        creme: '#FDFBF6',
        'neutral-gray': '#6B7280',
        // Dark mode tokens
        'dark-bg': '#0F090E',
        'dark-accent': '#D43D55',
        'dark-accent-hover': '#E8566A',
        'dark-muted': '#9CA3AF',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': { color: theme('colors.blue.700') },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': { 'scroll-margin-top': spacing[32] },
            thead: { borderBottomColor: theme('colors.gray.200') },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: '#D43D55',
              '&:hover': { color: '#E8566A' },
              code: { color: '#D43D55' },
            },
            blockquote: {
              borderLeftColor: '#D43D55',
              color: theme('colors.gray.400'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32],
            },
            hr: { borderColor: 'rgba(212,61,85,0.2)' },
            ol: { li: { '&:before': { color: theme('colors.gray.500') } } },
            ul: { li: { '&:before': { backgroundColor: theme('colors.gray.500') } } },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600'),
            },
            tbody: { tr: { borderBottomColor: theme('colors.gray.700') } },
          },
        },
      }),
    },
  },
};
