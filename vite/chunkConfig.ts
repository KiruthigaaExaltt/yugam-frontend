// vite/chunkConfig.ts
import type { GetManualChunk } from "rollup";

export const manualChunks: GetManualChunk = (id) => {
  if (id.includes("node_modules")) {
    if (
      id.includes("node_modules/react/") ||
      id.includes("node_modules/react-dom/") ||
      id.includes("node_modules/scheduler/") ||
      id.includes("node_modules/react-is/")
    ) {
      return "react-vendor";
    }

    if (id.includes("node_modules/primereact/") || id.includes("node_modules/quill/")) {
      return "ui-vendor";
    }

    if (id.includes("node_modules/firebase/") || id.includes("node_modules/@firebase/")) {
      return "firebase-vendor";
    }

    return "vendor";
  }
};