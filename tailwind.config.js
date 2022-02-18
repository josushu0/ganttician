const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
  plugins: [forms],
};
