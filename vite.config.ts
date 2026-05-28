import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/fifa-world-cup/',
  plugins: [react(), tailwindcss()],
})
