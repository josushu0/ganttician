import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { columns } from './columns'
import { relations } from 'drizzle-orm'

export const tasks = sqliteTable('tasks', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	position: integer('position').notNull(),
	description: text('description'),
	duration: integer('duration').default(1),
	measurement: integer('measurement', { mode: 'boolean' }).default(false),
	state: integer('state', { mode: 'boolean' }).default(false),
	column_id: text('column_id')
		.notNull()
		.references(() => columns.id, { onDelete: 'cascade' }),
})

export const tasksRelations = relations(tasks, ({ one }) => ({
	column: one(columns, {
		fields: [tasks.column_id],
		references: [columns.id],
	}),
}))

export type Tasks = typeof tasks.$inferSelect
