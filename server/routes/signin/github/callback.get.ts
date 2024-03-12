import { OAuth2RequestError } from 'arctic'
import { and, eq } from 'drizzle-orm'
import { generateId } from 'lucia'
import { oauthAccount, users } from '~/db/schema/auth'
import { db } from '~/server/utils/db'
import { github } from '~/server/utils/oauth'

export default defineEventHandler(async (event) => {
	const query = getQuery(event)
	const code = query.code?.toString() ?? null
	const state = query.state?.toString() ?? null
	const storedState = getCookie(event, 'github_oauth_state') ?? null
	if (!code || !state || !storedState || state !== storedState) {
		throw createError({
			status: 400,
		})
	}

	try {
		const tokens = await github.validateAuthorizationCode(code)
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		})
		const githubUser: GitHubUser = await githubUserResponse.json()
		const existingUser = await db
			.select()
			.from(oauthAccount)
			.where(
				and(
					eq(oauthAccount.providerId, 'github'),
					eq(oauthAccount.providerUserId, githubUser.id),
				),
			)
			.get()

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {})
			appendHeader(
				event,
				'Set-Cookie',
				lucia.createSessionCookie(session.id).serialize(),
			)
			return sendRedirect(event, '/dashboard')
		}

		const userId = generateId(15)

		await db.insert(users).values({
			id: userId,
			username: githubUser.name,
			avatar: githubUser.avatar_url,
		})
		await db.insert(oauthAccount).values({
			providerId: 'github',
			providerUserId: githubUser.id,
			userId: userId,
		})

		const session = await lucia.createSession(userId, {})
		appendHeader(
			event,
			'Set-Cookie',
			lucia.createSessionCookie(session.id).serialize(),
		)
		return sendRedirect(event, '/dashboard')
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			throw createError({
				status: 400,
			})
		}
		throw createError({
			status: 500,
		})
	}
})

interface GitHubUser {
	id: string
	name: string
	avatar_url: string
}
