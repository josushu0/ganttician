import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'
import { db } from './db'
import { sessions, users } from '~/db/schema/auth'

const adapter = new DrizzleSQLiteAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !process.dev,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			avatar: attributes.avatar,
		}
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	username: string
	avatar: string
}
