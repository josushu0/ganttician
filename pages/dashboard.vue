<script lang="ts" setup>
import type { Project } from '~/db/schema/projects'

definePageMeta({
	middleware: 'auth',
})

const orgStore = useOrganizationsStore()
let projects = ref([]) as Ref<Project[]>
let selectedProject = ref([]) as Ref<Project[]>

async function fetchProjects() {
	const data = await $fetch<Project[]>('/api/projects', {
		query: { orgId: orgStore.selectedOrganization },
	})
	projects.value = data ? data : []
}
</script>

<template>
	<div class="flex flex-col gap-4 w-full h-full py-2 px-4">
		<div class="flex gap-2">
			<OrgSelect @selected-org="fetchProjects" />
			<NewOrgButton />
		</div>
		<div class="flex gap-2 items-center flex-wrap">
			<h1 class="text-2xl font-bold">Projects</h1>
			<NewProjectButton />
			<ProjectSearch
				:projects="projects"
				@filter="(filter) => (selectedProject = filter)" />
		</div>
		<div
			class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 overflow-y-auto p-1">
			<Card
				class="col-span-1"
				v-if="projects && selectedProject.length === 0"
				v-for="project in projects"
				:to="'/project/' + project.id"
				:title="project.name"
				:description="project.description ? project.description : ''"
				:status="project.status"
				:key="project.id">
			</Card>
			<Card
				class="basis-1/3"
				v-if="selectedProject"
				v-for="project in selectedProject"
				:to="'/project/' + project.id"
				:title="project.name"
				:description="project.description ? project.description : ''"
				:status="project.status"
				:key="project.id">
			</Card>
			<div
				v-if="projects.length === 0"
				class="col-span-3 flex flex-col items-center gap-2 p-4 rounded border-border border-2 text-foreground">
				<h1 class="text-xl font-bold">No projects</h1>
				<p class="text-wrap truncate grow">
					Get started by creating a new project.
				</p>
				<NuxtLink
					to="/project/new"
					class="bg-primary p-2 rounded text-primary-foreground">
					New Project
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
