<script>
import { Menu, Moon, Sun, X } from 'lucide-svelte'
import { onMount } from 'svelte'
import { currentColorScheme, toggleColorScheme } from '../utils/color'

let isOpen = $state(false)
let isDarkMode = $state(false)

const syncColorScheme = () => {
	isDarkMode = currentColorScheme() === 'dark'
}

const navLinks = [
	{ href: '/', label: '/home' },
	{ href: '/blog', label: '/blog' },
	{ href: '/work', label: '/work' },
	{ href: '/about', label: '/about' },
]

onMount(() => {
	syncColorScheme()

	const onStorage = (event) => {
		if (event.key === 'color-scheme' || event.key === 'color-schema') {
			syncColorScheme()
		}
	}

	window.addEventListener('storage', onStorage)

	return () => {
		window.removeEventListener('storage', onStorage)
	}
})
</script>

<!-- Desktop -->
<header class="desktop">
	<div class="pill">
		<span class="logo">hayatosc</span>
		<nav class="pill-nav">
			{#each navLinks as { href, label }}
				<a {href}>{label}</a>
			{/each}
		</nav>
		{#if isDarkMode}
			<Sun
				class="icon"
				size={16}
				aria-hidden="true"
				onclick={toggleColorScheme}
			/>
		{:else}
			<Moon
				class="icon"
				size={16}
				aria-hidden="true"
				onclick={toggleColorScheme}
			/>
		{/if}
	</div>
</header>

<!-- Mobile -->
<header class="mobile">
	<div class="mobile-bar">
		<span class="logo">hayatosc</span>
		<div class="controls">
			{#if isDarkMode}
				<Sun
					class="icon"
					size={16}
					aria-hidden="true"
					onclick={toggleColorScheme}
				/>
			{:else}
				<Moon
					class="icon"
					size={16}
					aria-hidden="true"
					onclick={toggleColorScheme}
				/>
			{/if}
			<button
				type="button"
				class="icon-btn"
				onclick={() => (isOpen = true)}
				aria-label="Open menu"
			>
				<Menu size={20} aria-hidden="true" />
			</button>
		</div>
	</div>
</header>

<!-- Mobile nav overlay -->
{#if isOpen}
	<div class="mobile-overlay">
		<div class="mobile-bar overlay-bar">
			<span class="logo">hayatosc</span>
			<button
				type="button"
				class="icon-btn"
				onclick={() => (isOpen = false)}
				aria-label="Close menu"
			>
				<X size={20} aria-hidden="true" />
			</button>
		</div>
		<nav class="overlay-nav">
			{#each navLinks as { href, label }}
				<a {href} onclick={() => (isOpen = false)}>{label}</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
/* ── Shared ── */
.logo {
	font-family: var(--font-doto), sans-serif;
	font-size: 16px;
	font-weight: normal;
	color: var(--color-fg);
	user-select: none;
}

:global(.icon) {
	color: var(--color-fg-secondary);
	flex-shrink: 0;
	display: block;
}

.icon-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	color: var(--color-fg);
}

/* ── Desktop ── */
.desktop {
	display: none;

	@media (min-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 80px;
		width: 100%;
		background: transparent;
		padding: 0;
		box-sizing: border-box;
	}
}

.pill {
	display: flex;
	align-items: center;
	gap: 32px;
	height: 48px;
	padding: 0 28px;
	border-radius: 100px;
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	background: var(--color-header-pill-bg);
	border: 1px solid var(--color-header-pill-border);

	.pill-nav {
		display: flex;
		align-items: center;
		gap: 32px;

		a {
			font-family: var(--font-space-mono), monospace;
			font-size: 11px;
			font-weight: normal;
			color: var(--color-fg-secondary);
			letter-spacing: 1px;
			text-decoration: none;
		}
	}
}

/* ── Mobile ── */
.mobile {
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (min-width: 768px) {
		display: none;
	}
}

.mobile-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
	padding: 0 20px;
	background: var(--color-bg);
	border-bottom: 1px solid var(--color-border);
	box-sizing: border-box;

	.controls {
		display: flex;
		align-items: center;
		gap: 16px;
	}
}

/* ── Mobile overlay ── */
.mobile-overlay {
	position: fixed;
	inset: 0;
	display: flex;
	flex-direction: column;
	background: var(--color-bg);
	z-index: 100;

	.overlay-bar {
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.overlay-nav {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 48px 32px;

		a {
			font-family: var(--font-space-mono), monospace;
			font-size: 36px;
			font-weight: normal;
			letter-spacing: -1px;
			color: var(--color-fg);
			text-decoration: none;
		}
	}
}
</style>
