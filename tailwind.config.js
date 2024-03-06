/** @type {import('tailwindcss').Config} */

const srcDir = './'

export default {
	content: [
		`${srcDir}/components/**/*.{vue,js,ts}`,
		`${srcDir}/layouts/**/*.vue`,
		`${srcDir}/pages/**/*.vue`,
		`${srcDir}/composables/**/*.{js,ts}`,
		`${srcDir}/plugins/**/*.{js,ts}`,
		`${srcDir}/utils/**/*.{js,ts}`,
		`${srcDir}/App.{js,ts,vue}`,
		`${srcDir}/app.{js,ts,vue}`,
		`${srcDir}/Error.{js,ts,vue}`,
		`${srcDir}/error.{js,ts,vue}`,
		`${srcDir}/app.config.{js,ts}`
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'text-light': '#05140f',
				'text-dark': '#ebfaf5',
				'neutral-light': '#f7fdfb',
				'neutral-dark': '#020806',
				'primary-light': '#6e7fd4',
				'primary-dark': '#2b3c91',
				'secondary-light': '#8cadde',
				'secondary-dark': '#214273',
				'accent-light': '#4dcba3',
				'accent-dark': '#34b28a'
			}
		}
	}
}
