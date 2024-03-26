import type { Organization } from '~/db/schema/organization'

export const useOrganizationsStore = defineStore('organizations', {
	state: () => ({
		organizations: [] as Organization[],
		selectedOrganization: {} as Organization,
	}),
	actions: {
		async fetchOrganizations() {
			const data = await $fetch<Organization[]>('/api/organization')
			this.organizations = data
			this.selectedOrganization = data[0]
		},
		async createOrganization(info: newOrgInfo) {
			await $fetch('/api/organization', {
				method: 'POST',
				body: {
					name: info.name,
					description: info.description,
				},
			})
			await navigateTo('/dashboard')
		},
	},
})

interface newOrgInfo {
	name: string
	description?: string | undefined
}
