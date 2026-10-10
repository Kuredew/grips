<script lang="ts">
	import HomeNavBar from '#components/modules/home/HomeNavBar.svelte';
	import type { LayoutProps } from './$types';
	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Home | GRIPS</title>
</svelte:head>

<HomeNavBar />

<div class="font-[General_Sans]">
	{@render children()}
</div>
