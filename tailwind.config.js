/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    50: '#f6f8f7',
                    100: '#e8f0ea',
                    200: '#d1e1d5',
                    300: '#a8c9b0',
                    400: '#7dab88',
                    500: '#6B8F71',  // Primary sage green
                    600: '#556F5A',  // Darker sage
                    700: '#445847',
                    800: '#37473a',
                    900: '#2e3a30',
                },
                cream: {
                    50: '#FFFFFF',
                    100: '#FBF9F4',  // Main cream background
                    200: '#F5F2EA',
                    300: '#EDE8DC',
                    400: '#E5DFCE',
                    500: '#DDD6C0',
                },
                charcoal: {
                    DEFAULT: '#2C2C2C',
                    light: '#6B6B6B',
                },
                yellow: {
                    500: '#6B4F3F',  // Accent yellow
                    600: '#F9F3E6',
                    700: '#E6B962',
                },

            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['Arial', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
                'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 12px 48px rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-up': 'fadeUp 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'slide-left': 'slideLeft 0.5s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideLeft: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
