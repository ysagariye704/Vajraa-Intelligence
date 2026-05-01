import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true,
    allowedHosts: ['vajraflow.net', 'www.vajraflow.net']
  },
  server: {
    host: true
  }
});