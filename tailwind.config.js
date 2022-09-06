/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('tailwind-scrollbar')],
};
