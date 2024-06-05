import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Proxy server for connecting frontend to backend
  server: {
    proxy: {
      //prefix /backend will let server know we are calling on the backend.  
      //It doesn't have to be defined as /backend, it could have been "/ninja" and it would work. Just add whatever you 
      //name it to the front of your fetch/axios calls to the backend.  So instead of doing "fetch ('/notes')", you would do
      // "fetch ('/backend/notes')"
      '/database': {
        //This is the server that your backend is running on
        target: 'http://0.0.0.0:3000',
        changeOrigin: true,
        // This is what removes the /database from your url's.  Basically whatever you named the proxy, you'll put that between
        // these brackets
        rewrite: (path) => path.replace(/^\/database/, '')
      }
    }
  }
})

