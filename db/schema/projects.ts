import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const projects = sqliteTable('projects', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
})

export type Project = typeof projects.$inferSelect
