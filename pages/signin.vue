<script lang="ts" setup>
import { Github } from 'lucide-vue-next'

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
		<Button
			as-child
			class="bg-slate-700 hover:bg-slate-700 text-white font-bold">
			<a href="/signin/github">
				<Github class="me-2" />
				Sign in with Github
			</a>
		</Button>
	</div>
</template>
