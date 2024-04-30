<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const route = useRoute()
const orgStore = useOrganizationsStore()

const isInProject =
	route.path.startsWith('/project/') && route.path !== '/project/new'
const isInDashboard =
	route.path.startsWith('/dashboard') && orgStore.selectedOrganization
</script>

<template>
	<nav
		class="flex xl:flex-col items-center justify-between p-2 border-t-2 xl:border-t-0 xl:border-r-2 border-t-border xl:border-r-border">
		<div class="flex xl:flex-col gap-2 items-center h-full xl:w-full xl:h-fit">
			<Logo class="size-10 hidden xl:block" />
			<Separator
				orientation="horizontal"
				class="h-0.5 w-full bg-border hidden xl:block" />
			<NavLink popover="Dashboard" to="/dashboard">
				<Icon icon="lucide:layout-grid" class="size-5" />
			</NavLink>
			<NavLink
				v-if="isInProject"
				popover="Gantt Chart"
				:to="'/project/' + route.params.id">
				<Icon icon="lucide:gantt-chart" class="size-5" />
			</NavLink>
			<NavLink
				v-if="isInProject"
				popover="Project settings"
				:to="'/project/' + route.params.id + '/settings'">
				<Icon icon="lucide:settings" class="size-5" />
			</NavLink>
			<NavLink
				v-if="isInDashboard"
				popover="Organization settings"
				:to="'/organization/' + orgStore.selectedOrganization + '/settings'">
				<Icon icon="lucide:settings" class="size-5" />
			</NavLink>
		</div>
		<div class="flex xl:flex-col gap-2 items-center h-full xl:w-full xl:h-fit">
			<ThemeSelector />
			<UserDropdown />
		</div>
	</nav>
</template>
