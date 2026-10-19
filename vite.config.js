import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In development, send API calls, uploads and the dashboard to the Node backend (npm run server)
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
      '/uploads': 'http://localhost:8787',
      '/admin': 'http://localhost:8787',
    },
  },
})
