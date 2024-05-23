<script setup lang="ts">
import KanbanCard from '~/components/KanbanCard.vue'
import KanbanColumn from '~/components/KanbanColumn.vue'
import type { Columns } from '~/db/schema/columns'
import type { Project } from '~/db/schema/projects'
import type { Tasks } from '~/db/schema/tasks'

interface Data extends Columns {
	tasks: Tasks[]
}

definePageMeta({
	middleware: 'auth',
})

const projectStore = useProjectStore()
const id = useRoute().params.id

if (!projectStore.project) {
	const { data } = await useFetch<Project>('/api/project', {
		method: 'get',
		query: { id: id },
	})

	projectStore.project = data.value ?? null
}

const { data } = await useFetch<Data[]>('/api/tasks', {
	method: 'get',
	query: { id: id },
})

const board = ref<HTMLElement | null>(null)

const dragOver = (e: DragEvent) => {
	e.preventDefault()
	const leftColumn = insertLeft(e.clientX)
	const currentColumn = document.querySelector('.dragging_col')
	if (!leftColumn) {
		board.value?.appendChild(currentColumn!)
	} else {
		board.value?.insertBefore(currentColumn!, leftColumn)
	}
}

const insertLeft = (mouseX: number) => {
	const columns = board.value?.querySelectorAll('.column:not(.dragging_col)')

	let closestTask = null
	let closestOffset = Number.NEGATIVE_INFINITY

	columns?.forEach((column) => {
		const { right } = column.getBoundingClientRect()

		const offset = mouseX - right

		if (offset < 0 && offset > closestOffset) {
			closestOffset = offset
			closestTask = column
		}
	})

	return closestTask
}
</script>

<template>
	<div class="w-full h-full">
		<div
			class="w-full text-xl sm:text-2xl font-bold text-center border-b-2 border-border p-2 sm:p-3">
			<h1>{{ projectStore.project?.name }}</h1>
		</div>
		<div
			ref="board"
			@dragover="dragOver"
			class="w-full flex gap-4 p-2 overflow-x-auto">
			<KanbanColumn v-for="column in data" :key="column.id" :column="column">
				<KanbanCard
					v-for="task in column.tasks.filter(
						(task) => task.column_id === column.id,
					)"
					:key="task.id"
					:task="task">
				</KanbanCard>
			</KanbanColumn>
		</div>
	</div>
</template>
