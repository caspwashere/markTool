import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: Infinity, // Ensures everything is inlined
    rollupOptions: {
      output: {
        inlineDynamicImports: true,   // Required for singlefile
        manualChunks: undefined       // Prevents the conflict error
      }
    }
  }
});
