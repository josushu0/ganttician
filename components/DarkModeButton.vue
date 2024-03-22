<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()
const isLargeScreen = useMediaQuery('(min-width: 1280px)')
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger as-child>
						<Button variant="ghost" size="icon">
							<Sun
								class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon
								class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span class="sr-only">Toggle theme</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent
						:side="isLargeScreen ? 'right' : 'top'"
						:sideOffset="14">
						Toggle theme
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</DropdownMenuTrigger>
		<DropdownMenuContent
			align="end"
			:side="isLargeScreen ? 'right' : 'top'"
			:sideOffset="14">
			<DropdownMenuRadioGroup v-model="colorMode.preference">
				<DropdownMenuRadioItem
					@click="colorMode.preference = 'light'"
					value="light">
					Light
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem
					@click="colorMode.preference = 'dark'"
					value="dark">
					Dark
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem
					@click="colorMode.preference = 'system'"
					value="system">
					System
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
