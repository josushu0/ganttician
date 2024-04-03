<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
	middleware: 'auth',
})

const projectStore = useProjectsStore()
const orgStore = useOrganizationsStore()
const loading = ref(false)

const formSchema = toTypedSchema(
	z.object({
		organizationId: z.string(),
		name: z.string({ required_error: 'The project name is required.' }),
		description: z.string().optional(),
		date: z.object({
			start: z.date({
				required_error: 'The start and end dates are required.',
			}),
			end: z.date({ required_error: 'The start and end dates are required.' }),
		}),
	}),
)

const form = useForm({
	validationSchema: formSchema,
	initialValues: {
		organizationId: '',
	},
})

const createProject = form.handleSubmit(async (values) => {
	loading.value = true
	values.organizationId = orgStore.selectedOrganization!.id
	projectStore.createProject(values)
})
</script>

<template>
	<div class="grid place-content-center w-full h-full">
		<form
			class="flex flex-col gap-4 rounded xl:border-2 xl:border-border p-6"
			@submit="createProject">
			<div class="space-y-4">
				<h1 class="font-bold text-xl">Create a new Project</h1>
				<Separator />
				<p>
					Your project will be contained within an organization. Every user in
					the organization will have access to this project.
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<Label>Organization</Label>
				<OrgSelect />
				<p class="text-sm text-muted-foreground">
					To which organization should the project belong?
				</p>
			</div>
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input type="text" v-bind="componentField" />
					</FormControl>
					<FormDescription> What's the name of the project? </FormDescription>
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
			<FormField v-slot="{ componentField, value }" name="date">
				<FormItem class="flex flex-col">
					<FormLabel>Time Range</FormLabel>
					<DateRangePicker :value="value" :componentField="componentField" />
					<FormDescription>
						Select a start and end date for the project.
					</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>
			<div class="flex gap-4"></div>
			<div class="flex justify-between">
				<Button variant="outline" as-child>
					<NuxtLink to="/dashboard">Cancel</NuxtLink>
				</Button>
				<Button type="submit" :disabled="loading" label="Create Project">
					<LoaderCircle v-if="loading" class="size-4 mr-2 animate-spin" />
					Create Project
				</Button>
			</div>
		</form>
	</div>
</template>
