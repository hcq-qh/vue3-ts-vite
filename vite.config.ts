import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ eslintOptions: { cache: false } }), vueJsx()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
