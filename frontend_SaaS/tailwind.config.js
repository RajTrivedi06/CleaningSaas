/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈  tell Tailwind where to look
  ],
  theme: { extend: {} },
  plugins: [],
};
