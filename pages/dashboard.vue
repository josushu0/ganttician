<script lang="ts" setup>
definePageMeta({
	middleware: 'auth',
})

const user = useUser()
console.log(user)
</script>

<template>
	<div>Page: dashboard</div>
</template>
