import { eq } from 'drizzle-orm'
import { projects } from '~/db/schema/projects'

export default defineEventHandler<{ query: { org: string } }>(async (event) => {
	if (event.context.user) {
		const query = getQuery(event)
		const projectList = await db
			.selectDistinct()
			.from(projects)
			.where(eq(projects.organizationId, query.org))
			.all()

		return projectList
	}
	return []
})
