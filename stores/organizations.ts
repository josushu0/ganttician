import type { Organization } from '~/db/schema/organization'

export const useOrganizationsStore = defineStore('organizations', {
	state: () => ({
		organizations: [] as Organization[],
		selectedOrganization: {} as Organization,
	}),
})
