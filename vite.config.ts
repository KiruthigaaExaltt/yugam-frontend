import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    imagetools(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
      avif: {
        lossless: true,
      },
    }),
  ],

  // ⬇️ ADD THIS BLOCK
  optimizeDeps: {
    include: ["primereact/editor", "quill"],
  },
})
