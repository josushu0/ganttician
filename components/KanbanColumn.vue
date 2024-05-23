<script setup lang="ts">
import type { Columns } from '~/db/schema/columns'

defineProps<{
	column: Columns
}>()

const column = ref<HTMLElement | null>(null)

const dragOver = (e: DragEvent) => {
	e.preventDefault()
	const currentTask = document.querySelector('.is_dragging')
	if (currentTask) {
		column.value?.appendChild(currentTask)
	}
}
</script>

<template>
	<div
		ref="column"
		@dragover="dragOver"
		class="rounded bg-background border-2 border-border p-4 w-64 h-min space-y-2 min-w-64">
		<h1 class="text-xl font-bold">{{ $props.column.name }}</h1>
		<slot />
	</div>
</template>
