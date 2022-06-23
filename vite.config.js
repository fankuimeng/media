import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';

const path = (...path) => resolve(__dirname, ...path);

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: '0.0.0.0',
    port: 8002,
    https: false,
  },
});
