<script lang="ts" setup>
definePageMeta({
	middleware: 'auth',
})

const projects = ref([
	{ id: 1, name: 'Project 1', description: 'This is a project' },
	{ id: 2, name: 'Project 2', description: 'This is a project' },
	{ id: 3, name: 'Project 3', description: 'This is a project' },
	{ id: 4, name: 'Project 4', description: 'This is a project' },
	{ id: 5, name: 'Project 5', description: 'This is a project' },
	{ id: 6, name: 'Project 6', description: 'This is a project' },
	{ id: 7, name: 'Project 7', description: 'This is a project' },
	{ id: 8, name: 'Project 8', description: 'This is a project' },
	{ id: 9, name: 'Project 9', description: 'This is a project' },
	{ id: 10, name: 'Project 10', description: 'This is a project' },
	{ id: 11, name: 'Project 11', description: 'This is a project' },
	{ id: 12, name: 'Project 12', description: 'This is a project' },
	{ id: 13, name: 'Project 13', description: 'This is a project' },
	{ id: 14, name: 'Project 14', description: 'This is a project' },
	{ id: 15, name: 'Project 15', description: 'This is a project' },
])

const selectedProject = ref(null)
const filteredProject = computed(() => {
	if (selectedProject.value) {
		return new Array(selectedProject.value)
	}
	return projects.value
})
</script>

<template>
	<div class="flex flex-col gap-4 w-full h-full py-2 px-4 overflow-y-auto">
		<div class="flex gap-2">
			<OrgSelect class="w-40" />
			<NewOrgButton />
			<NewProjectButton />
		</div>
		<div class="flex gap-2 items-center">
			<h1 class="text-2xl font-bold">Projects</h1>
			<UInputMenu
				v-model="selectedProject"
				:options="projects"
				option-attribute="name"
				:search-attributes="['name']"
				by="id"
				placeholder="Search for a project" />
			<UButton
				@click="selectedProject = null"
				v-if="selectedProject"
				icon="i-heroicons-x-mark"
				variant="solid"
				color="rose" />
		</div>
		<div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-4 p-px overflow-y-auto">
			<UCard
				class="shrink basis-1/3"
				v-for="project in filteredProject"
				:key="project.id">
				<template #header>
					<h1>{{ project.name }}</h1>
				</template>
				<p>{{ project.description }}</p>
				<template #footer>
					<h1>{{ project.name }}</h1>
				</template>
			</UCard>
		</div>
	</div>
</template>
