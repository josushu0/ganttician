<script setup lang="ts">
const organizations = [
	{ id: 1, name: 'Org 1' },
	{ id: 2, name: 'Org 2' },
	{ id: 3, name: 'Org 3' },
]
const selected = ref(organizations[0])
</script>

<template>
	<USelectMenu
		searchable
		searchable-placeholder="Find organization..."
		option-attribute="name"
		by="id"
		:search-attributes="['name']"
		v-model="selected"
		:options="organizations" />
</template>
