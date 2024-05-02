import { eq } from 'drizzle-orm'
import { organizations } from '~/db/schema/organization'

export default defineEventHandler<{ query: { orgId: string; admin: string } }>(
	async (event) => {
		if (!event.context.user) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Not authorized',
			})
		}
		const { orgId, admin } = getQuery(event)
		if (event.context.user.id === admin) {
			await db.delete(organizations).where(eq(organizations.id, orgId))
		}
	},
)
