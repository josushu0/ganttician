<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

const loading = ref(false)
const values = reactive({
	name: '',
	description: '',
})
async function createOrg() {
	loading.value = true
	await $fetch('/api/organization', {
		method: 'POST',
		body: {
			...values,
		},
	})
	loading.value = false
	await navigateTo('/dashboard')
}
</script>

<template>
	<div class="md:grid md:place-content-center w-full h-full overflow-y-auto">
		<form
			class="flex flex-col gap-4 rounded xl:border-2 xl:border-border p-6"
			@submit.prevent="createOrg">
			<div class="space-y-4">
				<h1 class="font-bold text-xl">Create a new Organization</h1>
				<Separator />
				<p>
					This organization will contain all your projects. You can create
					multiple of these.
				</p>
			</div>
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
					Describe the purpose of your organization. (Optional)
				</p>
			</div>
			<div class="flex justify-between">
				<NuxtLink
					to="/dashboard"
					class="p-2 rounded bg-background border-2 border-border hover:bg-muted outline-primary focus-visible:outline">
					Cancel
				</NuxtLink>
				<button
					type="submit"
					:disabled="loading"
					class="flex items-center p-2 rounded bg-primary text-primary-foreground outline-primary outline-offset-2 focus-visible:outline">
					<Icon
						icon="lucide:loader-circle"
						v-if="loading"
						class="size-4 mr-2 animate-spin" />
					Create Organization
				</button>
			</div>
		</form>
	</div>
</template>
