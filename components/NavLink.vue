<script setup lang="ts">
const isLargeScreen = useMediaQuery('(min-width: 1280px)')
const props = defineProps<{
	to: string
	popover: string
}>()
</script>

<template>
	<TooltipProvider>
		<TooltipRoot>
			<TooltipTrigger
				as-child
				class="h-full xl:h-auto xl:w-full aspect-square rounded flex justify-center items-center hover:bg-border transition-colors outline-primary focus-visible:outline">
				<NuxtLink :to="props.to">
					<slot />
				</NuxtLink>
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					:side="isLargeScreen ? 'right' : 'top'"
					:side-offset="14"
					align="center"
					class="border-2 border-border select-none rounded py-1 px-2 text-foreground bg-background">
					{{ props.popover }}
				</TooltipContent>
			</TooltipPortal>
		</TooltipRoot>
	</TooltipProvider>
</template>
