<script setup lang="ts">
const createOrg = async () => {
	loading.value = true
	await $fetch('/api/organization', {
		method: 'POST',
		body: {
			name: state.name,
			description: state.description,
		},
	})
	await navigateTo('/dashboard')
}

const loading = ref(false)
const state = reactive({
	name: '',
	description: '',
})
</script>

<template>
	<div class="grid place-content-center w-full h-full">
		<UForm
			class="flex flex-col gap-4 rounded border-2 border-slate-300 dark:border-slate-800 p-6"
			:state="state"
			@submit="createOrg">
			<div class="space-y-4">
				<h1 class="font-bold text-xl">Create a new Organization</h1>
				<UDivider size="sm" />
				<p>
					This organization will contain all your projects. You can create
					multiple of these.
				</p>
			</div>
			<UFormGroup
				label="Name"
				name="name"
				required
				size="lg"
				description="What's the name of your company or team?">
				<UInput v-model="state.name" />
			</UFormGroup>
			<UFormGroup
				label="Description"
				name="description"
				size="lg"
				description="Describe the purpose of your organization. (Optional)">
				<UTextarea v-model="state.description" />
			</UFormGroup>
			<div class="flex justify-between">
				<UButton label="Cancel" variant="solid" color="gray" to="/dashboard" />
				<UButton type="submit" :loading="loading" label="Create Organization" />
			</div>
		</UForm>
	</div>
</template>
