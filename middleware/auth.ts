export default defineNuxtRouteMiddleware((to, _) => {
	const user = useUser()
	if (user.value && (to.path === '/signin' || to.path === '/')) {
		return navigateTo('/dashboard')
	} else if (to.path === '/dashboard' || to.path === '/') {
		return navigateTo('/signin')
	}
})
