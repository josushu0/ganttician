<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
})

const { id } = useRoute().params
const orgStore = useOrganizationsStore()
if (!orgStore.selectedOrganization) {
	const org = await orgStore.getOrganization(id)
	orgStore.selectedOrganization = org.value
}
</script>

<template>
	<div class="grid place-content-center w-full h-full">
		<Tabs default-value="general" class="p-4 xl:p-0 max-w-screen-sm w-screen">
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
