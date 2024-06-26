// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@nuxtjs/tailwindcss',
		'radix-vue/nuxt',
	],
	colorMode: {
		classSuffix: '',
	},
})