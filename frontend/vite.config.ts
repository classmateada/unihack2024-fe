import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying requests from /api to the external API endpoint
      "/api": {
        target: "https://api.play.ht/api/v2/tts/stream",
        changeOrigin: true, // Necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite the /api endpoint to the target's root
      },
    },
  },
});
