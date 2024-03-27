import { defineStore } from 'pinia'
import type { Project } from '~/db/schema/projects'

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [] as Project[] | null,
		selectedProject: null as Project | null,
	}),
	actions: {
		async fetchProjects() {
			const orgStore = useOrganizationsStore()
			const { data } = await useFetch<Project[]>('/api/project', {
				query: { org: orgStore.selectedOrganization?.id },
			})
			this.projects = data.value
		},
		async createProject(info: newProjectInfo) {
			console.log(info)

			await useFetch('/api/project', {
				method: 'POST',
				body: {
					name: info.name,
					description: info.description,
					organizationId: info.organizationId,
					start: info.date.start,
					end: info.date.end,
				},
			})
			await navigateTo('/dashboard')
		},
	},
})

interface newProjectInfo {
	name: string
	description?: string | undefined
	organizationId: string
	date: {
		start: Date
		end: Date
	}
}
