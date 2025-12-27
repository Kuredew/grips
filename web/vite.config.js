import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        },
  },
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg']
  }
})
