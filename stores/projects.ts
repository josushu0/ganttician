import { defineStore } from 'pinia'
import type { Project } from '~/db/schema/projects'

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		selectedProject: null as Project | null,
	}),
})
