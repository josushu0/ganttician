import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './auth'

export const organizations = sqliteTable('organizations', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	admin: text('admin')
		.notNull()
		.references(() => users.id),
})

export const usersToOrganizations = sqliteTable('users_to_organizations', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organizations.id),
})

export type Organization = typeof organizations.$inferSelect
