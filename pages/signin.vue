<script lang="ts" setup>
definePageMeta({
	layout: 'auth'
})
</script>

<template>
	<form action="" class="flex flex-col gap-4 w-full max-w-md text-text-light dark:text-text-dark">
		<Logo class="xl:hidden" />
		<h1 class="text-2xl font-bold">Sign in to your account</h1>
		<span>Not a member? <NuxtLink to="/signup" class="font-bold text-accent-light dark:text-accent-dark">Sign up</NuxtLink></span>
		<div class="flex flex-col gap-1">
			<label for="email" class="font-bold">Email</label>
			<input type="email" name="email" id="email" class="rounded-md p-2 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="font-bold">Password</label>
			<input type="password" name="password" id="password" class="rounded-md p-2 border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<button class="rounded-md bg-primary-light dark:bg-primary-dark p-2 text-text-dark font-bold">Sign in</button>
		
	</form>
</template>

