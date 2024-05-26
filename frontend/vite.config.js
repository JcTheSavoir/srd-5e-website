import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Proxy server for connecting frontend to backend
    server: {
    proxy: {
      //prefix /backend will let server know we are calling on the backend.  
      //It doesn't have to be defined as /backend, it could have been "/ninja" and it would work as well
      '/backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    }
  }
})
