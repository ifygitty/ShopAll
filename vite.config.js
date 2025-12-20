// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { salesiveConfigPlugin } from 'salesive-dev-tools';

// const __filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), salesiveConfigPlugin()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { salesiveConfigPlugin } from "salesive-dev-tools";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss(), salesiveConfigPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
