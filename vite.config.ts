import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// Plugin to generate press releases data at build time
function pressReleasesPlugin() {
  return {
    name: 'press-releases-generator',
    buildStart() {
      // Import and run the generator
      import('./scripts/generate-press-releases.js').then(({ generatePressReleases }) => {
        generatePressReleases()
      }).catch(err => {
        console.error('Failed to generate press releases:', err)
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pressReleasesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
})
