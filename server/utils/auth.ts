import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "./db";
import { sessions, users } from "~/db/schema/auth";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !process.dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			name: attributes.name,
			email: attributes.email
		}
	}
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	name: string,
	email: string
}
