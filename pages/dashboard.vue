<script lang="ts" setup>
import { Plus } from 'lucide-vue-next'
import type { Organization } from '~/db/schema/organization'
import type { Project } from '~/db/schema/projects'

definePageMeta({
	middleware: 'auth',
})

const proStore = useProjectsStore()

const { data: orgs } = await useFetch<Organization[]>('/api/organizations')
const projects = ref<Project[]>([])
if (orgs.value?.length === 0) {
	await navigateTo('/organization/new')
} else {
	projects.value = await $fetch<Project[]>('/api/projects', {
		query: { org: orgs.value![0].id },
	})
}

const projectsFilter = computed(() => {
	if (proStore.selectedProject) {
		return [proStore.selectedProject]
	} else if (projects.value) {
		return projects.value
	}
	return []
})
</script>

<template>
	<div class="flex flex-col gap-4 w-full h-full py-2 px-4 overflow-y-auto">
		<div class="flex gap-2">
			<OrgSelect :orgs="orgs ? orgs : []" />
			<NewOrgButton />
		</div>
		<div class="flex gap-2 items-center">
			<h1 class="text-2xl font-bold">Projects</h1>
			<NewProjectButton />
			<ProjectSearch :projects="projects ? projects : []" />
		</div>
		<div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-4 overflow-y-auto">
			<Card
				class="basis-1/3"
				v-if="!proStore.selectedProject"
				v-for="project in projectsFilter"
				:key="project.id">
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
			<Card class="basis-1/3" v-if="proStore.selectedProject">
				<NuxtLink :to="'/project/' + proStore.selectedProject.id">
					<CardHeader>
						<CardTitle>{{ proStore.selectedProject.name }}</CardTitle>
					</CardHeader>
					<CardContent>
						{{ proStore.selectedProject.description }}
					</CardContent>
					<CardFooter>
						{{ proStore.selectedProject.id }}
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
