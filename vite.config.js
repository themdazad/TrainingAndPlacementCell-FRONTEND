import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Define '@' as an alias for 'src/'
    },
  },
});
