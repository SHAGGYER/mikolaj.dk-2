import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "fonts",
        replacement: path.resolve(__dirname, "fonts"),
      },
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "services",
        replacement: path.resolve(__dirname, "src/services"),
      },
      {
        find: "contexts",
        replacement: path.resolve(__dirname, "src/contexts"),
      },
      {
        find: "models",
        replacement: path.resolve(__dirname, "src/models"),
      },
    ],
  },
});
