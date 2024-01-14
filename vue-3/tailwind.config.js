/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      colors: {
        primary: '#FF6347', // Tomato
        secondary: '#4CAF50', // Green
        neutral: '#F5F5F5', // Light Gray
        accent: '#FFD700' // Gold/Yellow
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    }
  },
  plugins: [require('tw-elements/dist/plugin.cjs')]
}
