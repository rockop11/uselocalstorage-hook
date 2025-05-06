import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, ('src/index.ts')),
			name: 'lib-uselocalstorage',
			formats: ['es', 'umd']
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	},
	plugins: [react(), dts({
		insertTypesEntry: true,
		tsconfigPath: './tsconfig.app.json'
	})],
})