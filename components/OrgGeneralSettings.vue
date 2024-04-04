<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const generalLoading = ref(false)
const orgStore = useOrganizationsStore()
const userStore = useUserStore()
const disable = orgStore.selectedOrganization?.admin !== userStore.user?.id

const formSchema = toTypedSchema(
	z.object({
		name: z.string({ required_error: 'The organization name is required.' }),
		description: z.string().optional(),
	}),
)

const generalForm = useForm({
	validationSchema: formSchema,
	initialValues: {
		name: orgStore.selectedOrganization?.name,
		description: orgStore.selectedOrganization?.description ?? '',
	},
})

const saveGeneral = generalForm.handleSubmit(async (values) => {
	generalLoading.value = true
	await orgStore.updateOrganization({
		id: orgStore.selectedOrganization?.id,
		...values,
	})
	generalLoading.value = false
})
</script>

<template>
	<form class="flex flex-col gap-4" @submit="saveGeneral">
		<h1 class="font-bold">General Settings</h1>
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormLabel>Name</FormLabel>
				<FormControl>
					<Input type="text" v-bind="componentField" :disabled="disable" />
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
					<Textarea v-bind="componentField" :disabled="disable" />
				</FormControl>
				<FormDescription>
					Describe the purpose of your organization. (Optional)
				</FormDescription>
				<FormMessage />
			</FormItem>
		</FormField>
		<Button class="self-end" type="submit" :disabled="generalLoading">
			<LoaderCircle v-if="generalLoading" class="size-4 mr-2 animate-spin" />
			Save
		</Button>
	</form>
</template>
