<script setup lang="ts">
import type { Organization } from '~/db/schema/organization'

const route = useRoute()

const { data, pending } = await useFetch<Organization>('/api/organization', {
	method: 'get',
	query: { orgId: route.params.id },
})
</script>

<template>
	<div class="md:grid md:place-content-center w-full h-full">
		<TabsRoot
			default-value="settings"
			class="flex flex-col md:border-2 md:border-border rounded py-2 w-full md:w-[36rem]">
			<TabsList
				aria-label="Manage your organization"
				class="flex justify-evenly relative shrink-0 border-b-2 border-border">
				<TabsIndicator
					class="absolute left-0 bottom-0 h-0.5 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-all">
					<div class="bg-primary w-full h-full"></div>
				</TabsIndicator>
				<TabsTrigger
					value="settings"
					class="text-center px-6 py-2 rounded select-none outline-primary focus-visible:outline">
					Organization
				</TabsTrigger>
				<TabsTrigger
					value="members"
					class="text-center px-6 py-2 rounded select-none outline-primary focus-visible:outline">
					Members
				</TabsTrigger>
			</TabsList>
			<TabsContent value="settings" class="p-6 w-full">
				<OrgGeneralSettings v-if="!pending && data" :data="data" />
				<DeleteOrg v-if="!pending && data" :admin="data.admin" />
			</TabsContent>
			<TabsContent value="members" class="p-6 w-full">
				<h1 class="text-center font-bold text-2xl">In development...</h1>
			</TabsContent>
		</TabsRoot>
	</div>
</template>
