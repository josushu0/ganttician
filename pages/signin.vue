<script lang="ts" setup>
definePageMeta({
	layout: 'auth',
})
</script>

<template>
	<div
		class="flex flex-col gap-4 w-full max-w-md text-text-light dark:text-text-dark">
		<Logo class="xl:hidden" />
		<h1 class="text-2xl font-bold">Welcome to Ganttician</h1>
		<span>Select an option to Sign in.</span>
		<a
			href="/signin/github"
			class="flex items-center justify-center gap-4 p-3 bg-slate-700 rounded text-text-dark font-bold">
			<Icon name="octicon:mark-github-16" color="white" class="size-7" />
			<span>Sign in with Github</span>
		</a>
	</div>
</template>
