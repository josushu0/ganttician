<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

const colorMode = useColorMode()
const isLargeScreen = useMediaQuery('(min-width: 1280px)')
</script>

<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger
			aria-label="Set color scheme"
			class="w-full aspect-square rounded flex justify-center items-center hover:bg-border transition-colors outline-primary focus-visible:outline">
			<Icon
				icon="lucide:sun"
				class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 size-5" />
			<Icon
				icon="lucide:moon"
				class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 size-5" />
		</DropdownMenuTrigger>
		<DropdownMenuPortal>
			<DropdownMenuContent
				align="end"
				:side="isLargeScreen ? 'right' : 'top'"
				:sideOffset="14"
				class="border-border border-2 text-foreground p-1 rounded w-28">
				<DropdownMenuRadioGroup v-model="colorMode.preference">
					<DropdownMenuRadioItem
						@click="colorMode.preference = 'light'"
						value="light"
						class="flex items-center gap-1 py-1 px-2 pl-6 rounded hover:bg-border relative select-none transition-colors outline-primary focus-visible:outline">
						<DropdownMenuItemIndicator
							class="absolute left-0 w-6 inline-flex justify-center items-center">
							<Icon icon="radix-icons:dot-filled" />
						</DropdownMenuItemIndicator>
						Light
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						@click="colorMode.preference = 'dark'"
						value="dark"
						class="flex items-center gap-1 py-1 px-2 pl-6 rounded hover:bg-border relative select-none transition-colors outline-primary focus-visible:outline">
						<DropdownMenuItemIndicator
							class="absolute left-0 w-6 inline-flex justify-center items-center">
							<Icon icon="radix-icons:dot-filled" />
						</DropdownMenuItemIndicator>
						Dark
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						@click="colorMode.preference = 'system'"
						value="system"
						class="flex items-center gap-1 py-1 px-2 pl-6 rounded hover:bg-border relative select-none transition-colors outline-primary focus-visible:outline">
						<DropdownMenuItemIndicator
							class="absolute left-0 w-6 inline-flex justify-center items-center">
							<Icon icon="radix-icons:dot-filled" />
						</DropdownMenuItemIndicator>
						System
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>
