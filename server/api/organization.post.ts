import type { User } from 'lucia'
import { organizations, usersToOrganizations } from '~/db/schema/organization'

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	}
	const user: User = event.context.user
	const organizationId = crypto.randomUUID()
	const { name, description, id } = await readBody(event)
	await db
		.insert(organizations)
		.values({
			name,
			description,
			id: id ? id : organizationId,
			admin: user.id,
		})
		.onConflictDoUpdate({
			target: organizations.id,
			set: { name, description },
		})
	if (!id) {
		await db
			.insert(usersToOrganizations)
			.values({ userId: user.id, organizationId })
	}
})
