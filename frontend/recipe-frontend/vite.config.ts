import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';

// Vite config
export default defineConfig({
  plugins: [
    vue(),
    process.env.NODE_ENV === 'development' && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Resolves '@' to './src'
    },
  },
});
