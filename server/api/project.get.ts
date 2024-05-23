import { eq } from 'drizzle-orm'
import { projects } from '~/db/schema/projects'

export default defineEventHandler<{ query: { id: string } }>(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const { id } = getQuery(event)
	const project = await db.query.projects.findFirst({
		where: eq(projects.id, id),
	})

	return project
})
