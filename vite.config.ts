import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // bind to all network interfaces so Heroku’s router can reach it
    host: '0.0.0.0',
    // use the port Heroku injects (or fall back to Vite’s default)
    port: 4173,
    // explicitly allow your Heroku app’s domain
    allowedHosts: [
      'webtech-doodle-fe-b11b6ccd4a73.herokuapp.com'
    ]
  }
})

