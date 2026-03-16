// vite/plugins.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export const vitePlugins = [
  tailwindcss(),
  react({
    babel: {
      plugins: [["babel-plugin-react-compiler"]],
    },
  }),
  imagetools(),
  ViteImageOptimizer({
    webp: {
      lossless: true,
    },
    avif: {
      lossless: true,
    },
  }),
];