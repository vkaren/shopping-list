import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@context", replacement: resolve(__dirname, "src/context") },
      { find: "@fonts", replacement: resolve(__dirname, "src/assets/fonts") },
      { find: "@icons", replacement: resolve(__dirname, "src/assets/icons") },
    ],
  },
});
