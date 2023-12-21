import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'vue-router': ['createRouter', 'createWebHistory', 'createWebHashHistory']
          },
          'pinia',
          { axios: [['default', 'axios']] }
        ],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['gravity-ui', 'mdi', 'ep', 'ion', 'twemoji', 'mingcute']
          })
        ]
      }),
      Icons({
        // experimental
        autoInstall: true
      })
    ]
  }
})
