/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dmserif: ['"DM Serif Text"', 'serif'],
        pressstart: ['"Press Start 2P"', 'system-ui'],
      },
      keyframes: {
        'hover-float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        // Keyframe for the left window: includes horizontal position
        'float-left': {
          '0%, 100%': { transform: 'translateX(-150%) translateY(0px)' },
          '50%': { transform: 'translateX(-150%) translateY(-15px)' },
        },
        // Keyframe for the right window: includes horizontal position
        'float-right': {
          '0%, 100%': { transform: 'translateX(50%) translateY(0px)' },
          '50%': { transform: 'translateX(50%) translateY(-15px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        }
      },
      animation: {
        'hover-float': 'hover-float 6s ease-in-out infinite',
        'hover-float-delay': 'hover-float 6s ease-in-out -3s infinite',
        // New animations that use the combined keyframes
        'float-left': 'float-left 8s ease-in-out infinite',
        'float-right': 'float-right 6s ease-in-out infinite',
        grain: 'grain 8s steps(10, end) infinite',
      },
    },
  },
  plugins: [],
}