import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';

import unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
});
