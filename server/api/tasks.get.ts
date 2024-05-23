import { eq } from 'drizzle-orm'
import { columns } from '~/db/schema/columns'
import { tasks } from '~/db/schema/tasks'

export default defineEventHandler<{ query: { id: string } }>(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const { id } = getQuery(event)
	const data = await db.query.columns.findMany({
		where: eq(columns.project, id),
		orderBy: (columns, { desc }) => [desc(columns.position)],
		with: {
			tasks: {
				orderBy: (tasks, { asc }) => [asc(tasks.position)],
			},
		},
	})

	return data
})
