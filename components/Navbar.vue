<script lang="ts" setup>
import { GanttChart, LayoutGrid, Settings } from 'lucide-vue-next'

const isLargeScreen = useMediaQuery('(min-width: 1280px)')
const route = useRoute()
const orgStore = useOrganizationsStore()
</script>

<template>
	<nav
		class="flex xl:flex-col items-center justify-between p-2 border-t-2 xl:border-t-0 xl:border-r-2 border-t-border xl:border-r-border">
		<div class="flex xl:flex-col gap-2 items-center">
			<Logo class="size-10 hidden xl:block" />
			<Separator v-if="isLargeScreen" />
			<NavLink
				:condition="true"
				popover="Dashboard"
				to="/dashboard"
				label="Go to dashboard">
				<LayoutGrid />
			</NavLink>
			<NavLink
				:condition="
					route.path.startsWith('/project/') && route.path !== '/project/new'
				"
				popover="Gantt Chart"
				:to="'/project/' + route.params.id"
				label="Go to Gantt Chart">
				<GanttChart />
			</NavLink>
			<NavLink
				:condition="
					route.path.startsWith('/project/') && route.path !== '/project/new'
				"
				popover="Project settings"
				:to="'/project/' + route.params.id + '/settings'"
				label="Go to Project Settings">
				<Settings />
			</NavLink>
			<NavLink
				:condition="route.path.startsWith('/dashboard')"
				popover="Organization settings"
				:to="'/organization/' + orgStore.selectedOrganization?.id + '/settings'"
				label="Go to Organization Settings">
				<Settings />
			</NavLink>
		</div>
		<div class="flex xl:flex-col gap-2 items-center">
			<DarkModeButton />
			<UserDropdown />
		</div>
	</nav>
</template>
