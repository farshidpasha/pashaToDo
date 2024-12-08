/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/*.html'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(98,0,234)',
        secondary: 'rgb(121,38,237)',
        'red-status': 'rgb(220,53,69)',
        'yellow-status': 'rgb(255,193,7)',
        'green-status': 'rgb(46,125,50)',
        'blue-status': 'rgb(13,110,253)',
        'light-gray-status': 'rgb(235,235,235)',
        'gray-status': 'rgb(108,117,125)',
      },
    },
  },
  plugins: [],
};
