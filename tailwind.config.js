/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0eb',
          100: '#cce1d7',
          200: '#99c3af',
          300: '#66a586',
          400: '#33875e',
          500: '#0A5F38', // Main primary color
          600: '#094c2d',
          700: '#073922',
          800: '#052616',
          900: '#02130b',
        },
        secondary: {
          50: '#e8f1eb',
          100: '#d1e3d6',
          200: '#a3c7ae',
          300: '#75ab85',
          400: '#488f5c',
          500: '#1A7431', // Main secondary color
          600: '#155d28',
          700: '#10461e',
          800: '#0a2e14',
          900: '#05170a',
        },
        accent: {
          50: '#fcf2e7',
          100: '#f9e5cf',
          200: '#f3cb9e',
          300: '#ecb06e',
          400: '#e6963d',
          500: '#e07c0d',
          600: '#b3630a',
          700: '#874a08',
          800: '#5a3205',
          900: '#2d1903',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#efefef',
          200: '#dfdfdf',
          300: '#cfcfcf',
          400: '#bfbfbf',
          500: '#afafaf',
          600: '#8c8c8c',
          700: '#696969',
          800: '#464646',
          900: '#232323',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-in',
        'pulse-light': 'pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};