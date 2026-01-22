import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5F33E1',
        secondary: '#6E6A7C',
        black: '#24252C',
      },
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
