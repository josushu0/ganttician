import type { User } from 'lucia'

export const useUserStore = defineStore('user', {
	state: () => ({ user: null as User | null }),
	actions: {
		async logout() {
			await useFetch('/api/logout', {
				method: 'POST',
			})
			reloadNuxtApp()
		},
	},
})
