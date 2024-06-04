import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'verde-salvia': '#91ABA5',
        'melanzana': '#633761',
        'crema-pastello': '#FEE6C4',
      }
    },
  },
  plugins: [],
} satisfies Config