import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { organizations } from './organization'

export const projects = sqliteTable('projects', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	start: integer('start', { mode: 'timestamp' }).notNull(),
	end: integer('end', { mode: 'timestamp' }).notNull(),
	status: integer('status', { mode: 'boolean' }).default(true).notNull(),
})

export type Project = typeof projects.$inferSelect
