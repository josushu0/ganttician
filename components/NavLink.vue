<script setup lang="ts">
const isLargeScreen = useMediaQuery('(min-width: 1280px)')
const props = defineProps<{
	condition: boolean
	to: string
	popover: string
}>()
</script>

<template>
	<TooltipProvider v-if="props.condition">
		<Tooltip>
			<TooltipTrigger as-child>
				<Button size="icon" variant="ghost">
					<NuxtLink :to="props.to">
						<slot />
					</NuxtLink>
				</Button>
			</TooltipTrigger>
			<TooltipContent :side="isLargeScreen ? 'right' : 'top'" :sideOffset="14">
				{{ props.popover }}
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>
