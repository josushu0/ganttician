<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

definePageMeta({
	middleware: 'auth',
})

const loading = ref(false)
const orgStore = useOrganizationsStore()
const values = reactive({
	name: '',
	description: '',
	start: new Date(),
	end: new Date(),
})

async function createProject() {
	loading.value = true
	await $fetch('/api/project', {
		method: 'POST',
		body: {
			...values,
			organizationId: orgStore.selectedOrganization,
		},
	})
	loading.value = false
	await navigateTo('/dashboard')
}

function setRange(start: Date, end: Date) {
	values.start = start
	values.end = end
}
</script>

<template>
	<div class="md:grid md:place-content-center w-full h-full overflow-y-auto">
		<form
			class="flex flex-col gap-4 rounded xl:border-2 xl:border-border p-6"
			@submit.prevent="createProject">
			<div class="space-y-4">
				<h1 class="font-bold text-xl">Create a new Project</h1>
				<Separator />
				<p>
					Your project will be contained within an organization. Every user in
					the organization will have access to this project.
				</p>
			</div>
			<div>
				<Label class="space-y-1">
					<span>Organization</span>
					<OrgSelect aria-describedby="orgHint" />
				</Label>
				<p id="orgHint" class="text-sm text-muted-foreground">
					To which organization should the project belong?
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
						v-model="values.description"
						aria-describedby="descHint"
						class="w-full p-2 border-2 border-border bg-background rounded text-foreground outline-primary focus-visible:outline"></textarea>
				</Label>
				<p id="descHint" class="text-sm text-muted-foreground">
					Describe the purpose of your organization. (Optional)
				</p>
			</div>
			<div>
				<Label class="space-y-1">
					<span>Time Range</span>
					<TimePicker
						aria-describedby="timeHint"
						@set-range="(start, end) => setRange(start, end)" />
				</Label>
				<p id="timeHint" class="text-sm text-muted-foreground">
					Select a time range for the project.
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
					Create Project
				</button>
			</div>
		</form>
	</div>
</template>
