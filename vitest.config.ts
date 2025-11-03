import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const projectRootDir = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    alias: {
      'react-latex-modern': `${projectRootDir}src/index.ts`,
    },
    reporters: 'default',
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});
