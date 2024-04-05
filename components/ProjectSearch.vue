<script setup lang="ts">
import { ChevronsUpDown, X } from 'lucide-vue-next'
import type { Project } from '~/db/schema/projects'

const { projects } = defineProps<{
	projects: Project[]
}>()
const open = ref(false)
const proStore = useProjectsStore()
proStore.projects = projects

const SelectProject = (project: Project) => {
	proStore.selectedProject = project
	open.value = false
}
</script>

<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="justify-between">
				{{ proStore.selectedProject?.name || 'Search Project...' }}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="p-0" align="start">
			<Command>
				<CommandInput placeholder="Search Project" />
				<CommandEmpty>No Projects found.</CommandEmpty>
				<CommandList>
					<CommandGroup>
						<CommandItem
							v-for="project in proStore.projects"
							:key="project.id"
							:value="project.name"
							@select="SelectProject(project)">
							{{ project.name }}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
	<Button
		size="icon"
		variant="destructive"
		v-if="proStore.selectedProject"
		@click="proStore.selectedProject = null">
		<X class="size-6" />
	</Button>
</template>
