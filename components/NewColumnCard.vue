<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { Columns } from '~/db/schema/columns'
import type { Tasks } from '~/db/schema/tasks'

interface Data extends Columns {
	tasks: Tasks[]
}

const projectStore = useProjectStore()
const addCol = async () => {
	const data = await $fetch<Data>('/api/column', {
		method: 'post',
		body: {
			name: '',
			project: projectStore.project?.id,
		},
	})

	projectStore.projectData.push(data)
}
</script>

<template>
	<button
		@click="addCol"
		class="flex items-center gap-2 rounded bg-background border-2 border-border p-2 w-64 h-min min-w-64 hover:bg-border outline-primary focus-visible:outline transition-colors">
		<Icon icon="lucide:plus" class="size-5" />
		<span class="font-bold">Create new column</span>
	</button>
</template>
