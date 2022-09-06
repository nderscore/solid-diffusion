import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const { STABLE_DIFFUSION_SERVER } = env;

  return {
    plugins: [solidPlugin(), viteSingleFile()],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },
    build: {
      assetsDir: '.',
      cssCodeSplit: false,
      target: 'esnext',
    },
    server: {
      port: 3000,
      proxy: {
        '/cancel': {
          target: STABLE_DIFFUSION_SERVER,
          changeOrigin: true,
        },
        '/config.js': {
          target: STABLE_DIFFUSION_SERVER,
          changeOrigin: true,
        },
        '/dream': {
          target: STABLE_DIFFUSION_SERVER,
          changeOrigin: true,
        },
        '/outputs': {
          target: STABLE_DIFFUSION_SERVER,
          changeOrigin: true,
        },
      },
    },
  };
});
