<script lang="ts">
	import { defaultPage } from '#lib/defaultPage.ts';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

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

<div class="group w-full" data-home={isHome} data-mobile={isMobile}>
	<dir class="px-8">
		{@render children()}
	</dir>
</div>
