/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mogi: {
          blue: '#1a237e',
          accentBlue: '#2563eb',
          lightBlue: '#dbeafe',
          green: '#22c55e',
          lightGreen: '#dcfce7',
          darkGreen: '#15803d',
          dark: '#0f172a',
          cardBg: '#f8fafc',
          badgeBlue: '#1e3a8a',
          warning: '#ea580c',
          warningLight: '#ffedd5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
