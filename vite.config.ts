// vite.config.ts
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

const repoName = 'god-game';               // ← change to your repo name
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? `/${repoName}/` : '/',    // critical for GH Pages sub-path
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: { output: { manualChunks: { vendor: ['pixi.js', 'idb'] } } }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: '2D God Game',
        short_name: 'GodGame',
        description: 'Offline-first 2D god game PWA',
        theme_color: '#0b0f1a',
        background_color: '#0b0f1a',
        display: 'standalone',
        scope: '/',                         // scope stays root; base handles sub-path
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,wasm}'],
        cleanupOutdatedCaches: true,
        navigateFallback: null,             // we handle SPA fallback via 404.html
        runtimeCaching: [
          { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } } },
          { urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'gstatic-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } } }
        ]
      }
    })
  ]
});
