<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps<{
	to: string
	title: string
	description: string
	status: boolean
}>()
</script>

<template>
	<NuxtLink
		:to="props.to"
		class="flex flex-col gap-2 p-4 rounded border-border border-2 relative group text-foreground outline-primary focus-visible:outline">
		<h1 class="text-xl font-bold">{{ $props.title }}</h1>
		<Icon
			icon="lucide:chevron-right"
			class="absolute right-4 top-6 size-6 text-background transition-all group-hover:text-foreground group-hover:top-4" />
		<Separator orientation="horizontal" class="h-0.5 w-full bg-border" />
		<p class="text-wrap truncate grow">{{ $props.description }}</p>
		<Separator orientation="horizontal" class="h-0.5 w-full bg-border" />
		<div
			class="self-end inline-flex items-center py-1 px-2.5 rounded-full text-sm font-bold"
			:class="
				$props.status
					? 'bg-primary text-primary-foreground'
					: 'bg-destructive text-destructive-foreground'
			">
			<span>{{ $props.status ? 'Active' : 'Inactive' }}</span>
		</div>
	</NuxtLink>
</template>
