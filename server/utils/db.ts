import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as org from '@/db/schema/organization'
import * as pro from '@/db/schema/projects'
import * as aut from '@/db/schema/auth'

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN,
})
export const db = drizzle(client, { schema: { ...org, ...pro, ...aut } })
