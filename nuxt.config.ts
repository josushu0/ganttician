// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt'],
	ui: {
		icons: ['simple-icons'],
	},
})

