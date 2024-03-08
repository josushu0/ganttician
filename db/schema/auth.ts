import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
})

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	avatar: text('avatar'),
})

export const oauthAccount = sqliteTable(
	'oauth_account',
	{
		providerId: text('provider_id').notNull(),
		providerUserId: text('provider_user_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
		}
	},
)
