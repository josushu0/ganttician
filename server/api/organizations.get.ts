import { eq } from 'drizzle-orm'
import type { User } from 'lucia'
import { organizations, usersToOrganizations } from '~/db/schema/organization'

export default defineEventHandler(async (event) => {
	if (event.context.user) {
		const user: User = event.context.user
		const join = await db
			.selectDistinct()
			.from(usersToOrganizations)
			.innerJoin(
				organizations,
				eq(usersToOrganizations.organizationId, organizations.id),
			)
			.where(eq(usersToOrganizations.userId, user.id))
			.all()

		const orgs = join.map((org) => {
			return org.organizations
		})

		return orgs
	}
	return []
})
