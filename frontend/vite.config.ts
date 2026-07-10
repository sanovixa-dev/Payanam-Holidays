import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Equivalent to --host
    watch: {
      usePolling: true, // Forces file checking
    },
    hmr: {
      host: "localhost", // Ensures HMR connects back properly
    },
  },
});
