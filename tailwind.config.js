/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          900: '#030202',
        },
        'blue-accent': '#1A74E2',
      },
    },
    screens: {
      nav: { max: '540px' },
    },
  },
  plugins: [],
};
