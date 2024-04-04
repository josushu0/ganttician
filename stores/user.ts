import type { User } from 'lucia'

export const useUserStore = defineStore('user', {
	state: () => ({ user: null as User | null }),
})
