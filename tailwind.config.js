/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--color-background)',
          subtle: 'var(--color-background-subtle)',
          elevated: 'var(--color-background-elevated)'
        },
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          strong: 'var(--color-surface-strong)'
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          contrast: 'var(--color-primary-contrast)',
          soft: 'var(--color-primary-soft)',
          strong: 'var(--color-primary-strong)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          contrast: 'var(--color-accent-contrast)',
          soft: 'var(--color-accent-soft)'
        },
        gradient: {
          start: 'var(--color-gradient-start)',
          middle: 'var(--color-gradient-middle)',
          end: 'var(--color-gradient-end)'
        },
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)'
        },
        success: {
          DEFAULT: 'var(--color-success)',
          soft: 'var(--color-success-soft)'
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          soft: 'var(--color-warning-soft)'
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'body-sm': ['0.9375rem', { lineHeight: '1.5' }],
        'body-md': ['1.0625rem', { lineHeight: '1.6' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.65' }],
        'heading-xs': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.015em' }],
        'heading-md': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'heading-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }]
      }
    },
  },
  plugins: [],
};
