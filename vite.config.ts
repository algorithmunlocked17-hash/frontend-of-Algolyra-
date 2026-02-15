
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/frontend-of-Algolyra-/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
