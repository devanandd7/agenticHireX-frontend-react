/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // include jsx/tsx if using React
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',   // Tailwind's blue-500
        accent: '#2563EB',    // Tailwind's blue-600
      },
    },
  },
  plugins: [],
};
