import { eq } from 'drizzle-orm'
import { columns } from '~/db/schema/columns'

export default defineEventHandler<{ query: { id: string } }>(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const { id } = getQuery(event)

	await db.delete(columns).where(eq(columns.id, id))
})
