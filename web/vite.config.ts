import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
    plugins: [vue()],
    resolve: {
        alias: {
            '@/': '/src/'
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
            '/ws': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                ws: true
            }
        }
    }
};

export default config;