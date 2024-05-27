<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

defineProps<{
	column: string
}>()
</script>

<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger
			aria-label="Column options"
			class="p-1 hover:bg-border outline-primary focus-visible:outline transition-colors rounded">
			<Icon icon="lucide:ellipsis-vertical" class="size-5" />
		</DropdownMenuTrigger>
		<DropdownMenuPortal>
			<DropdownMenuContent
				side="bottom"
				:sideOffset="6"
				align="start"
				class="bg-background border-border border-2 text-foreground p-1 rounded">
				<DropdownMenuItem asChild>
					<DeleteColConfirm :column="$props.column" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>
