<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { toast } from 'vue-sonner'

const props = defineProps<{
	admin: string
}>()

const route = useRoute()
const userStore = useUserStore()
const loading = ref(false)

async function deleteOrg() {
	loading.value = true
	await $fetch('/api/organization', {
		method: 'DELETE',
		query: { orgId: route.params.id, admin: props.admin },
	})
	loading.value = false
	toast.success(`Deleted organization successfully`)
	await navigateTo('/dashboard')
}
</script>

<template>
	<div v-if="props.admin === userStore.user?.id" class="flex flex-col gap-4">
		<h1 class="text-destructive font-bold">Delete Organization</h1>
		<p class="text-muted-foreground text-sm">
			Once you delete the organization, all projects associated with it will
			also be deleted, there is no going back. Please be certain before
			proceeding.
		</p>
		<button
			:disabled="loading"
			@click="deleteOrg"
			class="self-end flex items-center py-2 px-6 rounded bg-destructive text-destructive-foreground-foreground outline-destructive outline-offset-2 focus-visible:outline">
			<Icon
				icon="lucide:loader-circle"
				v-if="loading"
				class="size-4 mr-2 animate-spin" />
			Delete Organization
		</button>
	</div>
</template>
