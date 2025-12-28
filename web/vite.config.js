import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const BACKEND_URL = env.VITE_BACKEND_URL

  return {
    server: {
      host: "0.0.0.0",
      headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
          },
      proxy: {
        '/api': {
          target: BACKEND_URL, 
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ''), 
        },
      },
    },
    plugins: [
      tailwindcss(),
      react()
    ],
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg']
    }
  }
})
