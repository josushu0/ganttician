import type { User } from 'lucia'

export const useUserStore = defineStore('user', {
	state: () => ({ user: null as User | null }),
	actions: {
		async logout() {
			await $fetch('/api/logout', {
				method: 'POST',
			})
			reloadNuxtApp()
		},
	},
})
