import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';

import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base keeps the build mountable at any subpath (GitHub Pages
  // serves it from /figma/playground/).
  base: './',
  plugins: [react(), tailwindcss()],
});
