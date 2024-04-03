<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
	middleware: 'auth',
})

const orgStore = useOrganizationsStore()
const loading = ref(false)

const formSchema = toTypedSchema(
	z.object({
		name: z.string({ required_error: 'The organization name is required.' }),
		description: z.string().optional(),
	}),
)

const form = useForm({
	validationSchema: formSchema,
})

const createOrg = form.handleSubmit(async (values) => {
	loading.value = true
	await orgStore.createOrganization(values)
})
</script>

<template>
	<div class="grid place-content-center w-full h-full">
		<form
			class="flex flex-col gap-4 rounded xl:border-2 xl:border-border p-6"
			@submit="createOrg">
			<div class="space-y-4">
				<h1 class="font-bold text-xl">Create a new Organization</h1>
				<Separator />
				<p>
					This organization will contain all your projects. You can create
					multiple of these.
				</p>
			</div>
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input type="text" v-bind="componentField" />
					</FormControl>
					<FormDescription>
						What's the name of your company or team?
					</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea v-bind="componentField" />
					</FormControl>
					<FormDescription>
						Describe the purpose of your organization. (Optional)
					</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>
			<div class="flex justify-between">
				<Button variant="outline" as-child>
					<NuxtLink to="/dashboard">Cancel</NuxtLink>
				</Button>
				<Button type="submit" :disabled="loading" label="Create Organization">
					<LoaderCircle v-if="loading" class="size-4 mr-2 animate-spin" />
					Create Organization
				</Button>
			</div>
		</form>
	</div>
</template>
