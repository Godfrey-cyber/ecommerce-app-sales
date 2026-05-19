import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: "true",
        proxy: {
            '/v1/api': 'http://api:8080'
        }
    }
})
