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
		`${srcDir}/app.config.{js,ts}`,
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				accent: {
					50: '#f1f6fc',
					100: '#e5edfa',
					200: '#d1ddf4',
					300: '#b4c6ed',
					400: '#96a8e3',
					500: '#6e7fd4',
					600: '#626bc9',
					700: '#5259b0',
					800: '#444a8f',
					900: '#3d4472',
					950: '#232643',
				},
				secondary: {
					50: '#edfcf6',
					100: '#d4f7e7',
					200: '#adedd3',
					300: '#77deba',
					400: '#4dcba3',
					500: '#1dac84',
					600: '#108b6b',
					700: '#0d6f58',
					800: '#0d5847',
					900: '#0b493b',
					950: '#052922',
				},
			},
		},
	},
}
