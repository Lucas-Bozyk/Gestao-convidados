import { env as systemEnv } from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const siteUrl = env.VITE_SITE_URL || systemEnv.VERCEL_PROJECT_PRODUCTION_URL || systemEnv.VERCEL_URL
  const imageUrl = siteUrl
    ? new URL('/previaSEO.png', /^https?:\/\//.test(siteUrl) ? siteUrl : `https://${siteUrl}`).href
    : '/previaSEO.png'

  return {
    plugins: [react(), {
      name: 'social-preview-image',
      transformIndexHtml(html) {
        return html.replaceAll('__SOCIAL_PREVIEW_IMAGE__', imageUrl)
      },
    }],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5155',
          changeOrigin: true,
        }
      }
    }
  }
})
