import { projects } from '~/db/schema/projects'

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const projectId = crypto.randomUUID()
	const { name, description, organizationId, start, end } =
		await readBody(event)

	await db.insert(projects).values({
		name,
		description,
		id: projectId,
		start: new Date(start),
		end: new Date(end),
		organizationId,
	})
})
