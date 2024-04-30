<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SelectContent, SelectItemText } from 'radix-vue'
import type { Organization } from '~/db/schema/organization'

const emit = defineEmits(['selectedOrg'])

const userStore = useUserStore()
const { data, pending } = await useFetch<Organization[]>('/api/organizations', {
	query: { userId: userStore.user?.id },
})

const orgStore = useOrganizationsStore()
orgStore.selectedOrganization = data.value ? data.value[0].id : ''

onMounted(() => {
	emit('selectedOrg')
})

watch(orgStore, () => {
	emit('selectedOrg')
})
</script>

<template>
	<SelectRoot v-model="orgStore.selectedOrganization">
		<SelectTrigger
			aria-label="Select an organization"
			class="flex items-center justify-between gap-2 p-2 max-w-52 w-full rounded bg-background border-2 border-border outline-primary focus-visible:outline">
			<SelectValue placeholder="Select an organization" class="truncate" />
			<Icon icon="lucide:chevron-down" class="size-5 shrink-0" />
		</SelectTrigger>
		<SelectPortal>
			<SelectContent
				position="popper"
				side="bottom"
				:side-offset="3"
				class="bg-background border-2 border-border p-1 rounded content">
				<SelectScrollUpButton
					class="flex items-center justify-center cursor-default">
					<Icon icon="lucide:chevron-up" />
				</SelectScrollUpButton>
				<SelectViewport>
					<SelectLabel class="text-foreground px-2 font-bold">
						Select Organization
					</SelectLabel>
					<SelectSeparator class="h-px bg-border m-2"> </SelectSeparator>
					<SelectGroup v-if="!pending">
						<SelectItem
							v-for="(org, index) in data"
							:key="index"
							:value="org.id"
							class="flex items-center py-1 px-2 rounded text-foreground hover:bg-primary hover:text-primary-foreground relative select-none transition-colors focus-visible:bg-primary focus-visible:text-primary-foreground outline-none">
							<SelectItemIndicator
								class="absolute left-0 w-6 inline-flex justify-center items-center">
								<Icon icon="lucide:check" />
							</SelectItemIndicator>
							<SelectItemText class="pl-4">
								{{ org.name }}
							</SelectItemText>
						</SelectItem>
					</SelectGroup>
				</SelectViewport>
			</SelectContent>
		</SelectPortal>
	</SelectRoot>
</template>

<style>
.content {
	width: var(--radix-select-trigger-width);
}
</style>
