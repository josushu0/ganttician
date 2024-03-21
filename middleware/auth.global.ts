import type { User } from 'lucia'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async () => {
	const userStore = useUserStore()
	const data: User | null = await useRequestFetch()('/api/user')
	if (data) {
		userStore.user = data
	}
})
