export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.18)',
      },
      colors: {
        brand: {
          900: '#04111f',
          800: '#0c1f36',
          700: '#133151',
          600: '#1d4b71',
          500: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};
