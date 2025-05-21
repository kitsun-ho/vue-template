import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(async ({ mode }) => {
  const config: UserConfig = {
    build: {
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // 打包時自動移除 console.log
          drop_debugger: mode === 'production', // 打包時自動移除 debugger
        },
      },
    },
    optimizeDeps: {
      force: mode !== 'production',
    },
    base: mode === 'preview' ? '/my-template-preview/' : '/',
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
            'axios': [
              ['default', 'axios'],
            ],
            'lodash-es': [
              'debounce',
              'cloneDeep',
              'isEmpty',
              'isEqual',
              'flatMap',
            ],
            'uuid': [
              ['v4', 'uuid'],
            ],
          },
        ],
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        directoryAsNamespace: true,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.nuxt[\\/]/,
          /[\\/]\.vscode[\\/]/,
        ],
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        resolvers: [NaiveUiResolver()],
      }),
      UnoCSS({
        theme: {
          breakpoints: {
            sm: '641px',
            md: '769px',
            lg: '1025px',
            xl: '1281px',
            xll: '1441px',
          },
        },
      }),
      viteMockServe({
        mockPath: 'src/services/mock',
        enable: true,
      }),
      viteCompression({
        disable: mode !== 'production',
        threshold: 100000,
      }),
    ],
    resolve: {
      alias: {

        // '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 若要使用代理，請取消註解，並將 target 改為你的 API 路徑，建議配和 .env 使用
    // server: {
    //   proxy: {
    //     '/xxx': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //     },
    //   },
    // },
  };

  return config;
});
