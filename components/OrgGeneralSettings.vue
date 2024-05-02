<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { toast } from 'vue-sonner'
import type { Organization } from '~/db/schema/organization'

const props = defineProps<{
	data: Organization
}>()

const loading = ref(false)

const values = reactive({
	...props.data,
})

async function saveGeneral() {
	loading.value = true
	await $fetch('/api/organization', {
		method: 'POST',
		body: {
			...values,
		},
	})
	toast.success(`Saved settings.`)
	loading.value = false
}
</script>

<template>
	<form class="flex flex-col gap-4" @submit.prevent="saveGeneral">
		<h1 class="font-bold">General Settings</h1>
		<div>
			<Label class="space-y-1">
				<span>Name</span>
				<input
					type="text"
					aria-describedby="nameHint"
					required
					v-model="values.name"
					class="w-full p-2 border-2 border-border bg-background rounded text-foreground outline-primary focus-visible:outline" />
			</Label>
			<p id="nameHint" class="text-sm text-muted-foreground">
				What's the name of your company or team?
			</p>
		</div>
		<div>
			<Label class="space-y-1">
				<span>Description</span>
				<textarea
					aria-describedby="descHint"
					v-model="values.description"
					class="w-full p-2 border-2 border-border bg-background rounded text-foreground outline-primary focus-visible:outline"></textarea>
			</Label>
			<p id="descHint" class="text-sm text-muted-foreground">
				Describe the purpose of your organization.
			</p>
		</div>
		<button
			type="submit"
			:disabled="loading"
			class="self-end flex items-center py-2 px-6 rounded bg-primary text-primary-foreground outline-primary outline-offset-2 focus-visible:outline">
			<Icon
				icon="lucide:loader-circle"
				v-if="loading"
				class="size-4 mr-2 animate-spin" />
			Save
		</button>
	</form>
</template>
