import { eq } from 'drizzle-orm'
import { projects } from '~/db/schema/projects'

export default defineEventHandler<{ query: { orgId: string } }>(
	async (event) => {
		if (!event.context.user) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Not authorized',
			})
		}
		const { orgId } = getQuery(event)
		const projectList = await db.query.projects.findMany({
			where: eq(projects.organizationId, orgId),
		})

		return projectList
	},
)
