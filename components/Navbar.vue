<script lang="ts" setup>
const route = useRoute()
const userDropdown = [
	[
		{
			label: 'Logout',
			icon: 'i-heroicons-arrow-left-start-on-rectangle',
			click: logout,
		},
	],
]

async function logout() {
	await $fetch('/api/logout', {
		method: 'POST',
	})
	reloadNuxtApp()
}
</script>

<template>
	<nav
		class="flex flex-col items-center justify-between p-2 border-r-2 border-r-slate-300 dark:border-r-slate-800">
		<div class="flex flex-col gap-2 items-center">
			<Logo class="size-8" />
			<UDivider size="xs" />
			<UTooltip
				text="Dashboard"
				:popper="{ placement: 'right', offsetDistance: 18 }">
				<ULink
					to="/dashboard"
					class="hover:bg-accent-500/20 hover:dark:bg-accent-600/20 rounded flex items-center justify-center size-8"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-squares-2x2" class="size-6" />
				</ULink>
			</UTooltip>
			<UTooltip
				v-if="route.path.startsWith('/project')"
				text="Gantt chart"
				:popper="{ placement: 'right', offsetDistance: 18 }">
				<ULink
					:to="'/project/' + route.params.id"
					class="hover:bg-accent-500/20 hover:dark:bg-accent-600/20 rounded flex items-center justify-center size-8"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-chart-bar" class="size-6 rotate-90" />
				</ULink>
			</UTooltip>
		</div>
		<div class="flex flex-col gap-2 items-center">
			<UTooltip
				:text="
					route.path.startsWith('/dashboard')
						? 'Organization settings'
						: 'Project settings'
				"
				:popper="{ placement: 'right', offsetDistance: 18 }">
				<ULink
					:to="
						route.path.startsWith('dashboard')
							? `/organization/organizationId/settings`
							: `/project/projectId/settings`
					"
					class="hover:bg-accent-500/20 hover:dark:bg-accent-600/20 rounded flex items-center justify-center size-8"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-cog-6-tooth" class="size-6" />
				</ULink>
			</UTooltip>
			<UDropdown
				:items="userDropdown"
				:popper="{ arrow: true, placement: 'right-end', offsetDistance: 18 }"
				class="hover:bg-accent-500/20 hover:dark:bg-accent-600/20">
				<UTooltip
					text="User"
					:popper="{ placement: 'right', offsetDistance: 18 }">
					<UButton
						icon="i-heroicons-user"
						color="primary"
						variant="solid"
						:ui="{ rounded: 'rounded-full' }" />
				</UTooltip>
			</UDropdown>
		</div>
	</nav>
</template>
