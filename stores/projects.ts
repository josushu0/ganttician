import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import type { Project } from '~/db/schema/projects'

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [] as Project[] | null,
		selectedProject: null as Project | null,
	}),
	actions: {
		async fetchProjects() {
			const orgStore = useOrganizationsStore()
			const projects = await $fetch<Project[]>('/api/projects', {
				query: { org: orgStore.selectedOrganization?.id },
			})
			this.projects = projects
		},
		async createProject(info: newProjectInfo) {
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
			toast.success(`Project ${info.name} has been created`)
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
