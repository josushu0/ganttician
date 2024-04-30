<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
</script>

<template>
	<NuxtLink
		to="/project/new"
		class="inline-flex items-center p-2 rounded bg-primary text-primary-foreground outline-primary outline-offset-2 focus-visible:outline">
		<Icon icon="lucide:plus" class="size-6" />
	</NuxtLink>
</template>
