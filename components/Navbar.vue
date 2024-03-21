<script lang="ts" setup>
import { useUserStore } from '~/stores/user'

const isLargeScreen = useMediaQuery('(min-width: 1280px)')
const userStore = useUserStore()
const route = useRoute()
const userDropdown = [
	[
		{
			label: 'Logout',
			icon: 'i-heroicons-arrow-left-start-on-rectangle',
			click: userStore.logout,
		},
	],
]
</script>

<template>
	<nav
		class="flex xl:flex-col items-center justify-between p-2 border-t-2 xl:border-r-2 border-t-slate-300 xl:border-r-slate-300 dark:border-t-slate-800 xl:dark:border-r-slate-800">
		<div class="flex xl:flex-col gap-2 items-center">
			<Logo class="size-8 hidden xl:block" />
			<UDivider class="hidden xl:flex" size="xs" />
			<UTooltip
				text="Dashboard"
				:popper="{
					placement: isLargeScreen ? 'right' : 'top',
					offsetDistance: 18,
				}">
				<UButton
					square
					variant="ghost"
					to="/dashboard"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-squares-2x2" class="size-6" />
				</UButton>
			</UTooltip>
			<UTooltip
				v-if="route.path.startsWith('/project')"
				text="Gantt chart"
				:popper="{
					placement: isLargeScreen ? 'right' : 'top',
					offsetDistance: 18,
				}">
				<UButton
					square
					variant="ghost"
					:to="'/project/' + route.params.id"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-chart-bar" class="size-6 rotate-90" />
				</UButton>
			</UTooltip>
		</div>
		<div class="flex xl:flex-col gap-2 items-center">
			<UTooltip
				:text="
					route.path.startsWith('/dashboard')
						? 'Organization settings'
						: 'Project settings'
				"
				:popper="{
					placement: isLargeScreen ? 'right' : 'top',
					offsetDistance: 18,
				}">
				<UButton
					square
					variant="ghost"
					:to="
						route.path.startsWith('dashboard')
							? `/organization/organizationId/settings`
							: `/project/projectId/settings`
					"
					active-class="text-accent-500 dark:text-accent-600 bg-accent-500/30 dark:bg-accent-600/30">
					<UIcon name="i-heroicons-cog-6-tooth" class="size-6" />
				</UButton>
			</UTooltip>
			<UDropdown
				:items="userDropdown"
				:popper="{
					arrow: true,
					placement: isLargeScreen ? 'right-end' : 'top-end',
					offsetDistance: 18,
				}"
				class="hover:bg-accent-500/20 hover:dark:bg-accent-600/20">
				<UTooltip
					text="User"
					:popper="{
						placement: isLargeScreen ? 'right' : 'top',
						offsetDistance: 18,
					}">
					<UButton variant="ghost" square>
						<UAvatar
							:src="userStore.user?.avatar"
							size="xs"
							:alt="userStore.user?.username" />
					</UButton>
				</UTooltip>
			</UDropdown>
		</div>
	</nav>
</template>
