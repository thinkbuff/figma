import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite-plus';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
});
