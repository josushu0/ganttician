<script lang="ts" setup>
import { Toaster } from 'vue-sonner'

const isDark = useDark()
</script>

<template>
	<div class="w-screen h-dvh flex flex-col-reverse xl:flex-row">
		<Navbar />
		<slot />
		<Toaster
			position="top-center"
			:expand="true"
			close-button
			:theme="isDark ? 'dark' : 'light'" />
	</div>
</template>
