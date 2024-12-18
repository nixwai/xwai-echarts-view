import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  plugins: [vue(), WindiCSS()],
  base: './',
  resolve: {
    // 别名
    alias: { '@': resolve(__dirname, 'src') }
  }
});
