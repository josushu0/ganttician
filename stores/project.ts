import type { Columns } from '~/db/schema/columns'
import { type Project } from '~/db/schema/projects'
import type { Tasks } from '~/db/schema/tasks'

export const useProjectStore = defineStore('project', {
	state: () => ({
		project: null as Project | null,
		projectData: [] as Data[],
	}),
})

interface Data extends Columns {
	tasks: Tasks[]
}
