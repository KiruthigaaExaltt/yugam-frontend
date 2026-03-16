import { defineConfig } from "vite";
import { vitePlugins } from "./vite/plugins";
import { optimizeDepsConfig } from "./vite/optimizeDeps";
import { manualChunks } from "./vite/chunkConfig";

// https://vite.dev/config/
export default defineConfig({
  plugins: vitePlugins,

  optimizeDeps: optimizeDepsConfig,

  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});