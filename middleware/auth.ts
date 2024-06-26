export default defineNuxtRouteMiddleware((to, _) => {
	const userStore = useUserStore()
	if (userStore.user && (to.path === '/signin' || to.path === '/')) {
		return navigateTo('/dashboard')
	} else if (!userStore.user && to.path !== '/signin') {
		return navigateTo('/signin')
	}
})
