<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
</script>

<template>
	<Button as-child size="icon">
		<NuxtLink to="/project/new">
			<Plus class="size-6" />
		</NuxtLink>
	</Button>
</template>
