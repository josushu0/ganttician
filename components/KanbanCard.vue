<script setup lang="ts">
import type { Tasks } from '~/db/schema/tasks'

defineProps<{
	task: Tasks
}>()

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
		draggable="true"
		@dragstart="dragStart"
		@dragend="dragEnd"
		class="bg-muted rounded border-2 border-border p-2 select-none task cursor-pointer"
		:class="dragging && 'dragging_task'">
		{{ $props.task.name }}
	</div>
</template>

<style scoped>
.dragging_task {
	background-color: hsl(var(--primary));
	color: hsl(var(--primary-foreground));
	border-color: hsl(var(--primary));
}
</style>
