import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Asegúrate de que 'src' apunte a la carpeta correcta
    },
  },
  server: {
    proxy: {
      '/forums': 'http://localhost:3000'
    }
  }
});
