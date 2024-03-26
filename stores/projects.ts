import { defineStore } from 'pinia'
import type { Project } from '~/db/schema/projects'

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [
			{ id: '1', name: 'Project 1', description: 'This is a project' },
			{ id: '2', name: 'Project 2', description: 'This is a project' },
			{ id: '3', name: 'Project 3', description: 'This is a project' },
			{ id: '4', name: 'Project 4', description: 'This is a project' },
			{ id: '5', name: 'Project 5', description: 'This is a project' },
			{ id: '6', name: 'Project 6', description: 'This is a project' },
			{ id: '7', name: 'Project 7', description: 'This is a project' },
			{ id: '8', name: 'Project 8', description: 'This is a project' },
			{ id: '9', name: 'Project 9', description: 'This is a project' },
			{ id: '10', name: 'Project 10', description: 'This is a project' },
			{ id: '11', name: 'Project 11', description: 'This is a project' },
			{ id: '12', name: 'Project 12', description: 'This is a project' },
			{ id: '13', name: 'Project 13', description: 'This is a project' },
			{ id: '14', name: 'Project 14', description: 'This is a project' },
			{ id: '15', name: 'Project 15', description: 'This is a project' },
		],
		selectedProject: null as Project | null,
	}),
})
