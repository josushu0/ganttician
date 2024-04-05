<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { Organization } from '~/db/schema/organization'

const { orgs } = defineProps<{
	orgs: Organization[]
}>()

const orgStore = useOrganizationsStore()
orgStore.organizations = orgs
orgStore.selectedOrganization = orgStore.organizations[0]

const open = ref(false)
const selectOrg = (value: Organization) => {
	orgStore.selectedOrganization = value
	open.value = false
}
</script>

<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="justify-between">
				{{ orgStore.selectedOrganization?.name || 'Select an Organization...' }}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="p-0" align="start">
			<Command>
				<CommandInput placeholder="Search Organization" />
				<CommandEmpty>No Organization found.</CommandEmpty>
				<CommandList>
					<CommandGroup>
						<CommandItem
							v-for="organization in orgs"
							:key="organization.id"
							:value="organization.name"
							@select="selectOrg(organization)">
							{{ organization.name }}
							<Check
								:class="
									cn(
										'ml-auto h-4 w-4',
										orgStore.selectedOrganization.id === organization.id
											? 'opacity-100'
											: 'opacity-0',
									)
								" />
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>
