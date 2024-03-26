<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'

const userStore = useUserStore()
const isLargeScreen = useMediaQuery('(min-width: 1280px)')
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button size="icon" variant="ghost">
				<Avatar>
					<AvatarImage
						:src="userStore.user?.avatar!"
						:alt="userStore.user?.username" />
					<AvatarFallback :text="userStore.user?.username" class="truncate" />
				</Avatar>
				<span class="sr-only">User menu</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent
			:side="isLargeScreen ? 'right' : 'top'"
			:sideOffset="14"
			class="w-fit h-fit p-2">
			<DropdownMenuItem @click="userStore.logout" variant="ghost">
				<LogOut class="size-4 me-2" />
				Logout
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
