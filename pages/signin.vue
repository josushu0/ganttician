<script lang="ts" setup>
definePageMeta({
	layout: 'auth',
	middleware: 'auth',
})
</script>

<template>
	<div class="flex flex-col gap-4 w-full max-w-md">
		<Logo class="xl:hidden" />
		<h1 class="text-2xl font-bold">Welcome to Ganttician</h1>
		<span>Select an option to Sign in.</span>
		<a
			href="/signin/github"
			class="flex items-center justify-center gap-4 p-3 bg-slate-700 rounded text-slate-50 font-bold">
			<UIcon name="i-simple-icons-github" class="size-7" />
			<span class="text-grays-50">Sign in with Github</span>
		</a>
	</div>
</template>
