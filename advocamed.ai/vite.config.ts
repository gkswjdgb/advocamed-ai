import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Standard ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Optimization: Group React core together
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          // Optimization: Group Google AI SDK separately (lazy loaded usually)
          if (id.includes('@google/genai')) {
            return 'genai-sdk';
          }
          // Optimization: Group heavy charts
          if (id.includes('recharts')) {
            return 'charts-vendor';
          }
        },
      },
    },
  },
});
