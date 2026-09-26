<script lang="ts">
	import './layout.css';

	import favicon from '$lib/assets/favicon.svg';
	import QueueWindow from '../components/queue/QueueWindow.svelte';
	import Bar from '../components/bar/Bar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/satoshi/css/satoshi.css" />
	<title>grips</title>
</svelte:head>

<QueueWindow />
{@render children()}

<Bar />

<style>
	:global(html) {
		overflow-x: hidden;
	}

	:global(body) {
		color: var(--color-white);
		background-color: black;
		font-family: 'ibm plex mono';
	}
</style>
