import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { fileURLToPath } from "url";

const adminRoot = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(adminRoot, "..");
const srcPath = resolve(projectRoot, "src");

export default defineConfig({
  root: adminRoot,
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcPath,
      "@src": srcPath,
    },
  },
  server: {
    // Nota: Esta app usa localStorage próprio (origem diferente do site).
    // Para ver farmácias/entregadores criados no site, use o admin no mesmo site: http://localhost:5173/admin
    port: 5174,
    open: true,
    hmr: {
      overlay: false,
    },
    fs: {
      allow: [projectRoot],
    },
  },
  build: {
    outDir: resolve(projectRoot, "dist-admin"),
    emptyOutDir: true,
  },
});
