import { type Project } from '~/db/schema/projects'

export const useProjectStore = defineStore('project', {
	state: () => ({
		project: null as Project | null,
	}),
})
