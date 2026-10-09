<script lang="ts">
	import NavigationBar from '#components/bar/NavigationBar.svelte';
	import type { LayoutProps } from './$types';
	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Home | GRIPS</title>
</svelte:head>

<NavigationBar />

{@render children()}
