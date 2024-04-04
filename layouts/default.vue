<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
	<div class="w-screen h-dvh flex flex-col-reverse xl:flex-row">
		<Navbar />
		<slot />
		<Toaster />
	</div>
</template>
