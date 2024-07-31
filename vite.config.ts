import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:
    process.env.NODE_ENV === "production"
      ? "/Calculateur-calories-express/"
      : "/",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variables.scss";`,
      },
    },
  },
});
