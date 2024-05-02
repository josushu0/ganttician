<script lang="ts" setup>
import { Icon } from '@iconify/vue'
definePageMeta({
	layout: 'auth',
	middleware: 'auth',
})
</script>

<template>
	<div class="flex flex-col gap-4 w-full max-w-md">
		<Logo class="xl:hidden size-12" />
		<h1 class="text-2xl font-bold">Welcome to Ganttician</h1>
		<span>Select an option to Sign in.</span>
		<a
			class="flex gap-3 justify-center items-center bg-slate-700 hover:bg-slate-700 text-white font-bold p-3 rounded outline-primary focus-visible:outline"
			href="/signin/github">
			<Icon icon="radix-icons:github-logo" class="size-6" />
			Sign in with Github
		</a>
	</div>
</template>
