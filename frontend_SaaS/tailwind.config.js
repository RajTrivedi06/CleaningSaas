const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "// 👈  tell Tailwind where to look",
    "./node_modules/@heroui/theme/dist/components/(calendar|button|ripple|spinner).js"
  ],
  theme: { extend: {} },
  plugins: [heroui()],
};
