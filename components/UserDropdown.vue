<script setup lang="ts">
import { Icon } from '@iconify/vue'

const userStore = useUserStore()
const isLargeScreen = useMediaQuery('(min-width: 1280px)')

async function logout() {
	await $fetch('/api/logout', {
		method: 'POST',
	})
	reloadNuxtApp()
}

const initials = userStore.user?.username.split(' ')[0][0]
</script>

<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger
			class="size-10 cursor-pointer outline-primary focus-visible:outline rounded-full"
			aria-label="User menu">
			<AvatarRoot>
				<AvatarImage
					:src="userStore.user?.avatar!"
					:alt="userStore.user?.username"
					class="rounded-full" />
				<AvatarFallback
					class="size-10 inline-flex items-center justify-center truncate rounded-full bg-primary hover:bg-primary/80 transition-colors">
					{{ initials }}
				</AvatarFallback>
			</AvatarRoot>
			<span class="sr-only">User menu</span>
		</DropdownMenuTrigger>
		<DropdownMenuPortal>
			<DropdownMenuContent
				:side="isLargeScreen ? 'right' : 'top'"
				:sideOffset="14"
				class="border-border border-2 text-foreground p-1 rounded w-28">
				<DropdownMenuItem
					@click="logout"
					class="flex items-center gap-2 py-1 px-2 rounded hover:bg-border select-none outline-primary focus-visible:outline hover:outline-none transition-colors">
					<Icon icon="lucide:log-out" class="size-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>
