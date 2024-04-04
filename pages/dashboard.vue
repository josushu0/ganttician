<script lang="ts" setup>
import { Plus } from 'lucide-vue-next'

definePageMeta({
	middleware: 'auth',
})

const proStore = useProjectsStore()
const projects = computed(() => {
	if (proStore.selectedProject) {
		return Array(proStore.selectedProject)
	}
	return proStore.projects
})

const orgStore = useOrganizationsStore()
watchEffect(async () => {
	if (orgStore.selectedOrganization) {
		await proStore.fetchProjects()
	}
})

if (orgStore.selectedOrganization) {
	await proStore.fetchProjects()
}
</script>

<template>
	<div class="flex flex-col gap-4 w-full h-full py-2 px-4 overflow-y-auto">
		<div class="flex gap-2">
			<OrgSelect />
			<NewOrgButton />
		</div>
		<div class="flex gap-2 items-center">
			<h1 class="text-2xl font-bold">Projects</h1>
			<NewProjectButton />
			<ProjectSearch />
		</div>
		<div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-4 overflow-y-auto">
			<Card class="basis-1/3" v-for="project in projects" :key="project.id">
				<NuxtLink :to="'/project/' + project.id">
					<CardHeader>
						<CardTitle>{{ project.name }}</CardTitle>
					</CardHeader>
					<CardContent>
						{{ project.description }}
					</CardContent>
					<CardFooter>
						{{ project.id }}
					</CardFooter>
				</NuxtLink>
			</Card>
		</div>
		<Card v-if="projects?.length === 0" class="w-full">
			<CardHeader>
				<CardTitle class="text-center">No projects</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-center">Get started by creating a new project.</p>
			</CardContent>
			<CardFooter class="flex justify-center">
				<Button as-child>
					<NuxtLink to="/project/new" class="flex gap-1 items-center">
						<Plus class="size-4" />
						New project
					</NuxtLink>
				</Button>
			</CardFooter>
		</Card>
	</div>
</template>
