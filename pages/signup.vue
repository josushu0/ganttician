<script lang="ts" setup>
definePageMeta({
	layout: "auth"
})
</script>

<template>
	<form action="" class="flex flex-col gap-4 w-full max-w-md text-text-light dark:text-text-dark">
		<Logo class="xl:hidden" />
		<h1 class="text-2xl font-bold">Create an account</h1>
		<span>Already have an account? <NuxtLink to="/signin" class="font-bold text-accent-light dark:text-accent-dark">Sign in</NuxtLink></span>
		<div class="flex flex-col gap-1">
			<label for="user" class="font-bold">Name</label>
			<input type="text" name="user" id="user" class="rounded-md p-2 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<div class="flex flex-col gap-1">
			<label for="email" class="font-bold">Email</label>
			<input type="email" name="email" id="email" class="rounded-md p-2 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="font-bold">Password</label>
			<input type="password" name="password" id="password" class="rounded-md p-2 border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="font-bold">Confirm Password</label>
			<input type="password" name="password" id="password" class="rounded-md p-2 border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:border-primary-light dark:focus:border-primary-dark outline-none">
		</div>
		<button class="rounded-md bg-primary-light dark:bg-primary-dark p-2 text-text-dark font-bold">Sign up</button>
		
	</form>
</template>

