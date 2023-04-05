import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import utoolPlugin from "./utoolPlugin";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), utoolPlugin(), visualizer()],
  base: "./",
  server: {
    port: 3000,
  },
  define: {
    DEBUG: JSON.stringify(Boolean(Number(process.env.DEBUG))),
  },
});
