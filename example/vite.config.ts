import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.join(__dirname, '../node_modules/react'),
      'react-dom': path.join(__dirname, '../node_modules/react-dom'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
