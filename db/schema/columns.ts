import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { projects } from './projects'
import { relations } from 'drizzle-orm'
import { tasks } from './tasks'

export const columns = sqliteTable('columns', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	position: integer('position'),
	project: text('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
})

export const columnsRelations = relations(columns, ({ many }) => ({
	tasks: many(tasks),
}))

export type Columns = typeof columns.$inferSelect
