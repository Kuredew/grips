<script lang="ts">
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/700.css';
	import '@fontsource/ibm-plex-mono/400-italic.css';

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<style>
	:global(body) {
		color: white;
		background-color: black;
		font-family: 'IBM Plex Mono';
	}
</style>
