<script lang="ts" setup>
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
				<CardHeader>
					<CardTitle>{{ project.name }}</CardTitle>
				</CardHeader>
				<CardContent>
					{{ project.description }}
				</CardContent>
				<CardFooter>
					{{ project.id }}
				</CardFooter>
			</Card>
		</div>
	</div>
</template>
