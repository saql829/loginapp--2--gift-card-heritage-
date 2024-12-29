// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Ensure this includes your jsx files
  ],
  theme: {
    extend: {
      colors: {
        gold: '#B88A3D', // Gold color from the logo
        darkGray: '#2F2F2F', // Dark background for contrast
      },
      animation: {
        'slide-in-out': 'slideInOut 6s ease-in-out infinite',
      },
      keyframes: {
        slideInOut: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '30%': { transform: 'translateX(0)', opacity: '1' },
          '70%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
