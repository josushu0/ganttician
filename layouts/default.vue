<script lang="ts" setup></script>

<template>
	<div
		class="w-screen h-dvh flex flex-col-reverse xl:flex-row bg-slate-100 dark:bg-slate-900">
		<Navbar />
		<slot />
	</div>
</template>
