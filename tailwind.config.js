module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'dp': "url('./assets/default.png')"
       }),
      colors: {
        brand: {
          light: '#FAD7CC',
          DEFAULT: '#FA501A'
        },
        success: {
          DEFAULT: '#5cb85c'
        },
        danger: {
          DEFAULT: '#d9534f'
        }
      },
      fontFamily: {
        'primery': 'Roboto, sans-serif',
        'logo': 'Yesteryear, cursive'
      },
      textColor: {
        'brand': '#FA501A'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus', 'hover'],
      borderColor: ['active'],
      backgroundColor: ['active'],
      rotate: ['hover'],
      fontSize: ['hover', 'focus'],
    },
  },
  plugins: [],
}
