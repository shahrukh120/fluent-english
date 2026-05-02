/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1426',
          dark: '#1E2D50',
          royal: '#1A3A8F',
          mid: '#112A5C',
          deep: '#0A1832',
        },
        sky: {
          DEFAULT: '#2952C4',
          pale: '#4F7AE8',
        },
        gold: {
          DEFAULT: '#B8922A',
          mid: '#D4AA4A',
          light: '#F0CC78',
          cream: '#FDF6E3',
        },
        offwhite: '#F0F3FA',
        border: {
          light: '#E4E9F5',
        },
        ink: {
          DEFAULT: '#0B1426',
          mid: '#1E2D50',
          slate: '#3A4D7A',
          grey: '#6B7AB8',
          muted: '#9AAAC8',
        },
        forest: '#2A6E2A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
      letterSpacing: {
        nav: '0.08em',
        label: '0.22em',
        brand: '0.1em',
      },
    },
  },
  plugins: [],
};
