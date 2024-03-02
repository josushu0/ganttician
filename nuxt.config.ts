// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
	tailwindcss: {
		config: {
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
	}
})
