/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2769c7',
        secondary: '#0e2546',
        accent: '#81a7ef',
        darkbg: '#021d38',
        darkbg2: '#052c58',
      },
    },
  },
  plugins: [],
};
