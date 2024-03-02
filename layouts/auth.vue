<template>
	<div class="w-screen h-dvh grid xl:grid-cols-2 bg-neutral-light dark:bg-neutral-dark">
		<section class="flex flex-col gap-6 justify-center items-center p-6">
			<slot />
		</section>
		<section class="hidden xl:flex flex-col items-center justify-center gap-10 bg-secondary-light dark:bg-secondary-dark">
			<LogoComplete />
			<picture class="w-9/12">
				<source srcset="~/assets/img/illustration-dark.svg" media="(prefers-color-scheme: dark)" />
				<img src="~/assets/img/illustration-light.svg" class="w-full">
			</picture>
		</section>
	</div>
</template>

