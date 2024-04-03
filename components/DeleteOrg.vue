<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

const deleteLoading = ref(false)
const orgStore = useOrganizationsStore()
const userStore = useUserStore()
</script>

<template>
	<div
		v-if="orgStore.selectedOrganization?.admin === userStore.user?.id"
		class="flex flex-col gap-4">
		<h1 class="text-destructive font-bold">Delete Organization</h1>
		<p class="text-muted-foreground text-sm">
			Once you delete the organization, all projects associated with it will
			also be deleted, there is no going back. Please be certain before
			proceeding.
		</p>
		<Button
			class="self-end"
			variant="destructive"
			:disabled="deleteLoading"
			@click="">
			<LoaderCircle v-if="deleteLoading" class="size-4 mr-2 animate-spin" />
			Delete Organization
		</Button>
	</div>
</template>
