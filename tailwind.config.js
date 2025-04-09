/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#90cafc',
          400: '#5aacf9',
          500: '#3d8ef5',
          600: '#2570e9',
          700: '#1d5bd4',
          800: '#1e4bac',
          900: '#1e4087',
        },
        accent: {
          light: '#fff1e6',
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
        luxury: {
          gold: '#d4af37',
          silver: '#c0c0c0',
          cream: '#fffdd0',
          navy: '#000080',
          burgundy: '#800020',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
}
