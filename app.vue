<script setup lang="ts">
const useIdFunction = () => useId()
</script>

<template>
	<div class="text-foreground bg-background">
		<NuxtLayout>
			<ConfigProvider :use-id="useIdFunction">
				<NuxtPage />
			</ConfigProvider>
		</NuxtLayout>
	</div>
</template>
