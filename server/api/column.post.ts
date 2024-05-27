import { Columns, columns } from '~/db/schema/columns'

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const { id, name = '', project, position }: Columns = await readBody(event)

	const uuid = crypto.randomUUID()
	const data = await db
		.insert(columns)
		.values({ id: id ? id : uuid, name, project })
		.onConflictDoUpdate({
			target: columns.id,
			set: { name },
		})
		.returning()

	return {
		...data[0],
		tasks: [],
	}
})
