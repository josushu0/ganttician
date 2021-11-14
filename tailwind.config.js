const forms = require('@tailwindcss/forms');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'wiggle-light': "url('./src/assets/wiggle_light.svg')",
        'wiggle-dark': "url('./src/assets/wiggle_dark.svg')",
      },
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [forms],
};
