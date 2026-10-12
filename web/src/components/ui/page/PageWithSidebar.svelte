<script lang="ts">
	import { defaultPage } from '#lib/defaultPage.ts';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import ContainerRoot from '../container/ContainerRoot.svelte';
	import ContainerContent from '../container/ContainerContent.svelte';

	let { children, path }: { children: Snippet; path: string } = $props();

	let subPath = $derived(page.url.pathname.split('/').pop());

	let screenWidth = $state(0);
	let isMobile = $derived(screenWidth <= 768);
	let isHome = $derived(subPath == path);

	$effect(() => {
		if (subPath && !isMobile && isHome) {
			goto(defaultPage(subPath));
		}
	});
</script>

<svelte:window bind:innerWidth={screenWidth} />

<ContainerRoot>
	<ContainerContent>
		<div class="group w-full" data-home={isHome} data-mobile={isMobile}>
			<dir class="flex gap-8 px-4 md:px-8">
				{@render children()}
			</dir>
		</div>
	</ContainerContent>
</ContainerRoot>
