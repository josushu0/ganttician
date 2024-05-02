<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { Project } from '~/db/schema/projects'

const props = defineProps<{
	projects: Project[]
}>()

const emit = defineEmits(['filter'])

const selectedProject = ref('')

watch(selectedProject, () => {
	if (selectedProject.value.length > 0) {
		const filteredProjects = props.projects.filter(
			(project) => project.name === selectedProject.value,
		)
		emit('filter', filteredProjects)
	} else {
		emit('filter', props.projects)
	}
})

function resetFilter() {
	selectedProject.value = ''
}
</script>

<template>
	<ComboboxRoot v-model="selectedProject">
		<ComboboxAnchor
			class="flex items-center justify-between p-2 rounded bg-background text-foreground border-2 border-border outline-primary focus-visible:outline">
			<ComboboxInput
				class="bg-transparent outline-none min-w-0"
				placeholder="Search project...">
			</ComboboxInput>
			<ComboboxTrigger
				class="size-6 inline-flex items-center justify-center shrink-0">
				<Icon icon="lucide:chevron-down" />
			</ComboboxTrigger>
		</ComboboxAnchor>
		<ComboboxContent
			align="start"
			position="popper"
			side="bottom"
			:side-offset="3"
			class="absolute z-10 border-border border-2 bg-background p-1 rounded project_combo">
			<ComboboxViewport>
				<ComboboxEmpty></ComboboxEmpty>
				<ComboboxGroup>
					<ComboboxItem
						v-for="(project, index) in props.projects"
						:key="index"
						:value="project.name"
						class="py-1 px-2 rounded text-foreground hover:bg-primary hover:text-primary-foreground select-none transition-colors data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground outline-none">
						<span>{{ project.name }}</span>
					</ComboboxItem>
				</ComboboxGroup>
			</ComboboxViewport>
		</ComboboxContent>
	</ComboboxRoot>
	<button
		v-if="selectedProject.length > 0"
		@click="resetFilter"
		class="p-2 inline-flex items-center justify-center bg-destructive text-destructive-foreground rounded">
		<Icon icon="lucide:x" class="size-6" />
	</button>
</template>

<style>
.project_combo {
	width: var(--radix-combobox-trigger-width);
}
</style>
