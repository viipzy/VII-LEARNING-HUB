import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // This specifically fixes the Firebase Google Popup COOP error
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    }
  }
})