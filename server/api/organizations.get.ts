import { eq } from 'drizzle-orm'
import { usersToOrganizations } from '~/db/schema/organization'

export default defineEventHandler<{ query: { userId: string } }>(
	async (event) => {
		if (event.context.user) {
			const { userId } = getQuery(event)
			const data = await db.query.usersToOrganizations.findMany({
				columns: {},
				where: eq(usersToOrganizations.userId, userId),
				with: {
					organizations: true,
				},
			})
			return data.flatMap((item) => {
				return item.organizations
			})
		}
		throw createError({
			statusCode: 401,
			statusMessage: 'Not authorized',
		})
	},
)
