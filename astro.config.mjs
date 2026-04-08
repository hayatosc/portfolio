import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import { d1, r2, sandbox } from '@emdash-cms/cloudflare'
import { defineConfig, fontProviders } from 'astro/config'
import emdash from 'emdash/astro'

export default defineConfig({
	output: 'server',
	adapter: cloudflare({
		imageService: {
			build: 'compile',
			runtime: 'cloudflare-binding',
		},
	}),
	image: {
		layout: 'constrained',
		responsiveStyles: true,
	},
	integrations: [
		react(),
		svelte(),
		emdash({
			database: d1({ binding: 'DB', session: 'auto' }),
			storage: r2({ binding: 'MEDIA' }),
			sandboxRunner: sandbox(),
		}),
	],
	fonts: [
		{
			name: 'Doto',
			provider: fontProviders.google(),
			cssVariable: '--font-doto',
			weights: [400, 700],
			subsets: ['latin'],
		},
		{
			name: 'Space Mono',
			provider: fontProviders.google(),
			cssVariable: '--font-space-mono',
			weights: [400, 700],
			subsets: ['latin'],
		},
		{
			name: 'Noto Sans JP',
			provider: fontProviders.google(),
			cssVariable: '--font-noto-sans-jp',
			weights: [400, 700],
			subsets: ['latin', 'japanese'],
		},
	],
	devToolbar: { enabled: false },
})
