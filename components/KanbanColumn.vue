<script setup lang="ts">
import type { Columns } from '~/db/schema/columns'

defineProps<{
	column: Columns
}>()

const column = ref<HTMLElement | null>(null)

const dragOver = (e: DragEvent) => {
	e.preventDefault()
	const bottomTask = insertAbove(e.clientY)
	const currentTask = document.querySelector('.dragging_task')
	if (!bottomTask) {
		column.value?.appendChild(currentTask!)
	} else {
		column.value?.insertBefore(currentTask!, bottomTask)
	}
}

const insertAbove = (mouseY: number) => {
	const tasks = column.value?.querySelectorAll('.task:not(.dragging_task)')

	let closestTask = null
	let closestOffset = Number.NEGATIVE_INFINITY

	tasks?.forEach((task) => {
		const { top } = task.getBoundingClientRect()

		const offset = mouseY - top

		if (offset < 0 && offset > closestOffset) {
			closestOffset = offset
			closestTask = task
		}
	})

	return closestTask
}

const dragging = ref(false)
const dragStart = () => {
	dragging.value = true
}

const dragEnd = () => {
	dragging.value = false
}
</script>

<template>
	<div
		ref="column"
		draggable="true"
		@dragover="dragOver"
		@dragstart="dragStart"
		@dragend="dragEnd"
		class="rounded bg-background border-2 border-border p-4 w-64 h-min space-y-2 min-w-64 select-none column"
		:class="dragging && 'dragging_col'">
		<h1 class="text-xl font-bold">{{ $props.column.name }}</h1>
		<slot />
	</div>
</template>
