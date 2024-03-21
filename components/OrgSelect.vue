<script setup lang="ts">
const orgStore = useOrganizationsStore()
await orgStore.fetchOrganizations()
</script>

<template>
	<USelectMenu
		searchable
		searchable-placeholder="Find organization..."
		option-attribute="name"
		by="id"
		:search-attributes="['name']"
		v-model="orgStore.selectedOrganization"
		:options="orgStore.organizations" />
</template>
