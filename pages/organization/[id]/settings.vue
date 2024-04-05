<script setup lang="ts">
import type { Organization } from '~/db/schema/organization'

definePageMeta({
	middleware: 'auth',
})

const { id } = useRoute().params
const orgStore = useOrganizationsStore()

const getOrganization = async (orgId: string | string[]) => {
	const data = await $fetch<Organization>('/api/organization', {
		query: { orgId: orgId },
	})
	return data
}

if (!orgStore.selectedOrganization) {
	const org = await getOrganization(id)
	orgStore.selectedOrganization = org
}
</script>

<template>
	<div class="md:grid md:place-content-center w-full h-full overflow-y-auto">
		<Tabs
			default-value="general"
			class="p-4 xl:p-0 md:max-w-screen-sm w-screen">
			<TabsList class="w-full">
				<TabsTrigger value="general" class="flex-1">General</TabsTrigger>
				<TabsTrigger value="members" class="flex-1">Members</TabsTrigger>
			</TabsList>
			<TabsContent value="general">
				<div class="rounded xl:border-2 xl:border-border p-0 xl:p-6">
					<OrgGeneralSettings />
					<DeleteOrg />
				</div>
			</TabsContent>
			<TabsContent value="members">
				<div class="rounded xl:border-2 xl:border-border p-0 xl:p-6">
					<h1 class="text-center font-bold text-2xl">In development...</h1>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</template>
