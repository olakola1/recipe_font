import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Загружаем env-переменные в зависимости от режима
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    css: {
      modules: {
        generateScopedName: '[local]_[hash:base64:5]',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@styles': path.resolve(__dirname, './src/styles')
      }
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_URL_DEV || 'http://localhost:5001',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //     secure: false // Для HTTPS бэкенда
      //   }
      // }
    },
    define: {
      'process.env': env, // Доступ к env-переменным в коде
    },
  };
});
