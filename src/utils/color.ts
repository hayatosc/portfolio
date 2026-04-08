type ColorScheme = 'light' | 'dark'

const COLOR_SCHEME_KEY = 'color-scheme'

const isColorScheme = (value: string | null): value is ColorScheme => {
	return value === 'light' || value === 'dark'
}

export const currentColorScheme = (): ColorScheme => {
	const storedValue = localStorage.getItem(COLOR_SCHEME_KEY)

	if (isColorScheme(storedValue)) {
		return storedValue
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

export const setColorScheme = (scheme: ColorScheme) => {
	localStorage.setItem(COLOR_SCHEME_KEY, scheme)
	const root = document.documentElement
	root.style.setProperty('color-scheme', scheme)
}

export const initColorScheme = () => {
	const current = currentColorScheme()
	setColorScheme(current)
}

export const toggleColorScheme = () => {
	const current = currentColorScheme()
	const next = current === 'light' ? 'dark' : 'light'
	setColorScheme(next)
}
