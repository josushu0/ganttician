<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps<{
	column: string
}>()

const loading = ref(false)
const open = ref(false)

const projectStore = useProjectStore()

const deleteCol = async () => {
	loading.value = true
	await $fetch('/api/column', {
		method: 'delete',
		query: {
			id: props.column,
		},
	})
	const index = projectStore.projectData.findIndex(
		(item) => item.id === props.column,
	)
	projectStore.projectData.splice(index, 1)
	open.value = false
}
</script>

<template>
	<DialogRoot v-model:open="open">
		<DialogTrigger
			class="flex items-center gap-2 py-1 px-2 rounded hover:bg-destructive select-none outline-primary focus-visible:outline hover:outline-none transition-colors">
			<Icon icon="lucide:trash" class="size-4" />
			Delete column
		</DialogTrigger>
		<DialogPortal>
			<DialogOverlay class="bg-black/40 fixed inset-0" />
			<DialogContent
				class="space-y-4 bg-background border-2 border-border rounded max-w-lg p-4 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] text-foreground">
				<DialogTitle class="text-xl"> Delete this Column? </DialogTitle>
				<DialogDescription>
					Are you sure you want to delete this column and all cards contained in
					it? This action is not reversable.
				</DialogDescription>
				<div class="flex items-center justify-end gap-2">
					<DialogClose as-child>
						<button
							class="py-2 px-4 rounded border-border border-2 outline-primary outline-offset-2 focus-visible:outline">
							Cancel
						</button>
					</DialogClose>
					<button
						@click="deleteCol"
						:disabled="loading"
						class="flex items-center gap-2 py-2 px-4 rounded bg-destructive text-destructive-foreground border-destructive border-2 outline-primary outline-offset-2 focus-visible:outline">
						<Icon
							icon="lucide:loader-circle"
							v-if="loading"
							class="size-4 mr-2 animate-spin" />
						Delete
					</button>
				</div>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>
