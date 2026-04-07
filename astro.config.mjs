import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import { d1, r2, sandbox } from '@emdash-cms/cloudflare'
import { defineConfig, fontProviders } from 'astro/config'
import emdash from 'emdash/astro'

export default defineConfig({
	output: 'server',
	adapter: cloudflare(),
	image: {
		layout: 'constrained',
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: 'DB', session: 'auto' }),
			storage: r2({ binding: 'MEDIA' }),
			sandboxRunner: sandbox(),
		}),
	],
	fonts: [
		{
			family: 'Doto',
			provider: fontProviders.google(),
			cssVariable: '--font-doto',
			weights: [400, 700],
			subsets: ['latin'],
		},
		{
			family: 'Space Mono',
			provider: fontProviders.google(),
			cssVariable: '--font-space-mono',
			weights: [400, 700],
			subsets: ['latin'],
		},
		{
			family: 'Noto Sans JP',
			provider: fontProviders.google(),
			cssVariable: '--font-noto-sans-jp',
			weights: [400, 700],
			subsets: ['latin', 'japanese'],
		},
	],
	devToolbar: { enabled: false },
})
