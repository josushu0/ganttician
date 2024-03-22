<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
</script>

<template>
	<Button as-child>
		<NuxtLink to="/project/new" class="flex items-center gap-2">
			New Project
			<Plus class="size-4" />
		</NuxtLink>
	</Button>
</template>
