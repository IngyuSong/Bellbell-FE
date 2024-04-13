import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Babel 적용 제외할 경로 설정
      plugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-transform-remove-console'] : [], // 프로덕션 환경에서만 콘솔 제거
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
