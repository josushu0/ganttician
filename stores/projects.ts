import { defineStore } from 'pinia'
import type { Project } from '~/db/schema/projects'

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [] as Project[],
		selectedProject: null as Project | null,
	}),
})
