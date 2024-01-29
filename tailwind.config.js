/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        sizePulse: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(0.5)'
          }
        },
        moveRightLeft: {
          '0%, 100%': {
            transform: 'translateX(0)'
          },
          '50%': {
            transform: 'translateX(100%)'
          }
        }
      },
      animation: {
        rotate: 'rotate 6s linear infinite',
        sizePulse: 'sizePulse 4s linear infinite',
        moveRightLeft: 'moveRightLeft 4s linear infinite'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      colors: {
        primary: '#FF6347',
        secondary: '#4CAF50',
        neutral: '#F5F5F5',
        accent: '#FFD700',
        purpleDark: '#231f40'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    }
  },
  plugins: [
    require('tw-elements/dist/plugin.cjs'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.animate-press': {
          transition: 'transform 0.1s ease'
        },
        '.animate-press:active': {
          transform: 'scale(0.95)'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
