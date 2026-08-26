/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--border)',
        primary: { DEFAULT: 'var(--primary)', two: 'var(--primary2)' }
      },
      boxShadow: { soft: 'var(--shadow)' },
      borderRadius: { xl2: '1rem' }
    }
  },
  plugins: []
}
