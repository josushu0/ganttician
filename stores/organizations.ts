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
	},
})
