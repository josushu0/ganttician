import type { User } from 'lucia'

export default defineNuxtRouteMiddleware(async () => {
	const user = useUser()
	const data: User | null = await useRequestFetch()('/api/user')
	if (data) {
		user.value = data
	}
})
