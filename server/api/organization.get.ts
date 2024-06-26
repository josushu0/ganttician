import { eq } from 'drizzle-orm'
import { organizations } from '~/db/schema/organization'

export default defineEventHandler<{ query: { orgId: string } }>(
	async (event) => {
		if (!event.context.user) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Not authorized',
			})
		}
		const { orgId } = getQuery(event)
		const org = await db.query.organizations.findFirst({
			where: eq(organizations.id, orgId),
		})
		return org
	},
)
