import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  root: 'src',
  envDir: path.resolve(__dirname, 'environment'),
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  build: {
    outDir: '../../dist/static',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
})
