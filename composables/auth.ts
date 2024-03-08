import type { User } from 'lucia'

export const useUser = async () => {
	const user = useState<User | null>('user', () => null)
	const data: User | null = await $fetch('/api/user')
	user.value = data
	return user
}
