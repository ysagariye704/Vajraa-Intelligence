import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic"
    })
  ],
  server: {
    host: true
  },
  preview: {
    host: true,
    allowedHosts: ["vajraflow.net", "www.vajraflow.net"]
  }
});