/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F4',
        paperDark: '#F2EEE5',
        ink: '#0E0E0C',
        inkSoft: '#3D3B36',
        inkMuted: '#6B6862',
        inkFaint: '#A8A49C',
        rule: '#E5DFD3',
        ruleSoft: '#EEE9DD',
        terra: '#C8533A',
        terraDark: '#A53E29',
        terraSoft: '#E8B5A6',
        sage: '#5A7355',
        sageSoft: '#C3D1BD',
        amber: '#B8860B',
        amberSoft: '#E8D49A',
        rust: '#8B2C20',
        rustSoft: '#D9A9A0',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'mega': ['clamp(4rem, 22vw, 8rem)', { lineHeight: '0.85', letterSpacing: '-0.04em', fontWeight: '300' }],
        'hero': ['clamp(2.5rem, 12vw, 4.5rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display': ['clamp(1.75rem, 7vw, 2.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
