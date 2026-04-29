import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Vajraa-Intelligence/',
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['vajraa-frontend.onrender.com'],
    proxy: {
      '/api': {
        target: 'https://vajraa-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  preview: {
    host: true,
    allowedHosts: ['vajraa-frontend.onrender.com'],
  },
});