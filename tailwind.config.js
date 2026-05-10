// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- ESTA LÍNEA ES VITAL. Le dice a Tailwind dónde buscar las clases.
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        leybrak: {
          blue: '#2563EB',
          dark: '#0A0A0A',
          darkCard: '#1A1A1A',
          light: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}