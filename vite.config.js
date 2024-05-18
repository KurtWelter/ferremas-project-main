import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {createProxyMiddleware} from "http-proxy-middleware";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Apunta a tu servidor Express
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
