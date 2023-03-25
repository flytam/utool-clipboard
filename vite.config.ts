import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import utoolPlugin from "./utoolPlugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), utoolPlugin()],
  base: "./",
  server: {
    port: 3000,
  },
});
