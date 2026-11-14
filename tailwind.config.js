/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#082614',
          900: '#0B351C',
          800: '#123F24',
          700: '#164B2B',
          600: '#1E5C35',
          500: '#2A7040',
        },
        leaf: {
          50: '#F6F7EF',
          100: '#EAF4E4',
          200: '#D9EACD',
          300: '#B9D6A7',
          400: '#8FBB72',
          500: '#78A85A',
          600: '#5D8C42',
        },
        wa: {
          DEFAULT: '#0F7B3D',
          dark: '#0A6331',
          light: '#128B46',
        },
        brandblue: '#15518C',
        ink: '#171C18',
        muted: '#566158',
        line: '#E2E8DF',
        sand: '#D8B66A',
      },
      fontFamily: {
        display: ['Manrope Variable', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter Variable', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1240px',
        },
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 18px 45px -30px rgba(11, 53, 28, 0.35)',
        lift: '0 24px 60px -32px rgba(11, 53, 28, 0.45)',
        header: '0 1px 0 rgba(11, 53, 28, 0.06), 0 10px 30px -24px rgba(11, 53, 28, 0.35)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
