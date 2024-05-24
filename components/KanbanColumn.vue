<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { Columns } from '~/db/schema/columns'

const props = defineProps<{
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

const projectStore = useProjectStore()

const editColumn = async (value: string | undefined) => {
	if (value !== props.column.name) {
		await $fetch('/api/column', {
			method: 'post',
			body: {
				id: props.column.id,
				name: value,
				project: projectStore.project?.id,
			},
		})
	}
}
</script>

<template>
	<div
		ref="column"
		@dragover="dragOver"
		class="rounded bg-background border-2 border-border p-4 w-64 h-min space-y-2 min-w-64">
		<EditableRoot
			v-slot="{ isEditing }"
			@submit="editColumn"
			:default-value="$props.column.name"
			submit-mode="enter"
			placeholder="Click to edit..."
			class="flex items-center justify-stretch gap-2">
			<EditableArea class="grow h-8">
				<EditablePreview class="break-all font-bold" />
				<EditableInput
					class="w-full bg-muted rounded p-1 text-foreground border-0 focus-within:outline-none" />
			</EditableArea>
			<div v-if="isEditing" class="flex gap-1">
				<EditableSubmitTrigger asChild>
					<button
						class="p-1 hover:bg-border outline-primary focus-visible:outline transition-colors rounded">
						<Icon icon="lucide:check" class="size-5" />
					</button>
				</EditableSubmitTrigger>
				<EditableCancelTrigger asChild>
					<button
						class="p-1 hover:bg-border outline-primary focus-visible:outline transition-colors rounded">
						<Icon icon="lucide:x" class="size-5" />
					</button>
				</EditableCancelTrigger>
			</div>
		</EditableRoot>
		<slot />
	</div>
</template>
