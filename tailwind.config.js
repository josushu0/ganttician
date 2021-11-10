const forms = require('@tailwindcss/forms');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        108: '27rem',
        120: '30rem',
      },
      backgroundImage: {
        'wiggle-light': "url('./src/assets/wiggle_light.svg')",
        'wiggle-dark': "url('./src/assets/wiggle_dark.svg')",
      },
      colors: {
        gray: {
          750: '#2B3544',
          725: '#313B4B',
        },
      },
      margin: {
        4.5: '1.05rem',
      },
    },
    fontFamily: {
      body: ['Inter'],
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [forms],
};
