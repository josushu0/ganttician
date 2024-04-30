import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './auth'
import { relations } from 'drizzle-orm'

export const organizations = sqliteTable('organizations', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	admin: text('admin')
		.notNull()
		.references(() => users.id),
})

export const organizationsRelations = relations(organizations, ({ many }) => ({
	usersToOrganizations: many(usersToOrganizations),
}))

export const usersToOrganizations = sqliteTable(
	'users_to_organizations',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		organizationId: text('organization_id')
			.notNull()
			.references(() => organizations.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.organizationId] }),
	}),
)

export const usersToOrganizationsRelations = relations(
	usersToOrganizations,
	({ one }) => ({
		organizations: one(organizations, {
			fields: [usersToOrganizations.organizationId],
			references: [organizations.id],
		}),
	}),
)

export type Organization = typeof organizations.$inferSelect
