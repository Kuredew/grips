<script lang="ts">
	import HomeNavBar from '#components/modules/home/HomeNavBar.svelte';
	import { pageTitle } from '#lib/pageTitle.ts';
	import type { LayoutProps } from './$types';
	let { children }: LayoutProps = $props();

	let title = pageTitle('home');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<HomeNavBar />

<div class="font-[General_Sans]">
	{@render children()}
</div>
