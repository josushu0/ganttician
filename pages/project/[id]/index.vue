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
</script>

<template>
	<div class="w-full h-full">
		<div
			class="w-full text-xl sm:text-2xl font-bold text-center border-b-2 border-border p-2 sm:p-3">
			<h1>{{ projectStore.project?.name }}</h1>
		</div>
		<div ref="board" class="w-full flex gap-4 p-2 overflow-x-auto">
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
