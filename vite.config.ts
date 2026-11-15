import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: true,
    target: "es2022",
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});