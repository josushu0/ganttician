<script setup lang="ts">
const useIdFunction = () => useId()
</script>

<template>
	<ConfigProvider :use-id="useIdFunction">
		<div class="text-foreground bg-background">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</ConfigProvider>
</template>
