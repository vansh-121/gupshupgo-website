import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          // Normalize Windows path separators so the matches below work everywhere.
          const p = id.replace(/\\/g, "/");

          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(p)) {
            return "react-vendor";
          }
          if (p.includes("/node_modules/@tanstack/")) {
            return "query";
          }
          if (p.includes("/node_modules/@supabase/")) {
            return "supabase";
          }
          if (p.includes("/node_modules/@radix-ui/")) {
            return "ui";
          }
          return undefined;
        },
      },
    },
  },
}));
