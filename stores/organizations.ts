import type { Organization } from '~/db/schema/organization'

export const useOrganizationsStore = defineStore('organizations', {
	state: () => ({
		organizations: [] as Organization[] | null,
		selectedOrganization: null as Organization | null,
	}),
	actions: {
		async fetchOrganizations() {
			const { data } = await useFetch<Organization[]>('/api/organizations')
			this.organizations = data.value
			this.selectedOrganization = this.organizations
				? this.organizations[0]
				: null
			if (!this.selectedOrganization) {
				await navigateTo('/organization/new')
			}
		},
		async createOrganization(info: newOrgInfo) {
			await useFetch('/api/organization', {
				method: 'POST',
				body: {
					name: info.name,
					description: info.description,
				},
			})
			await navigateTo('/dashboard')
		},
		async getOrganization(orgId: string | string[]) {
			const { data } = await useFetch<Organization>('/api/organization', {
				query: { orgId: orgId },
			})
			return data
		},
	},
})

interface newOrgInfo {
	name: string
	description?: string | undefined
}
