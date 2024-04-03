import type { User } from 'lucia'
import { organizations, usersToOrganizations } from '~/db/schema/organization'

export default defineEventHandler(async (event) => {
	if (event.context.user) {
		const user: User = event.context.user
		const organizationId = crypto.randomUUID()
		const { name, description } = await readBody(event)
		await db
			.insert(organizations)
			.values({ name, description, id: organizationId, admin: user.id })
		await db
			.insert(usersToOrganizations)
			.values({ userId: user.id, organizationId })
	}
})
